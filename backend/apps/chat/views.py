import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from groq import Groq
from .models import ChatMessage
from apps.ingredients.models import Ingredient
from apps.products.models import Recipe


class ChatThrottle(AnonRateThrottle):
    """Rate limiting para o endpoint de chat - anônimos"""
    scope = 'chat'
    rate = '50/hour'  # 50 requisições por hora para usuários anônimos


class ChatAuthenticatedThrottle(UserRateThrottle):
    """Rate limiting para usuários autenticados"""
    scope = 'chat_auth'
    rate = '1000/hour'  # 1000 requisições por hora para autenticados


class NutritionChatView(APIView):
    """API endpoint para chat de nutrição com conhecimento de receitas"""
    permission_classes = [AllowAny]  # Permitir anônimos para desenvolvimento
    throttle_classes = [ChatThrottle, ChatAuthenticatedThrottle]  # Rate limiting
    
    def _get_ingredients_context(self):
        """Recupera lista de ingredientes cadastrados para contexto do AI"""
        try:
            ingredients = Ingredient.objects.all()
            if not ingredients.exists():
                return "Nenhum ingrediente cadastrado ainda."
            
            ingredients_text = "## Ingredientes Cadastrados:\n\n"
            for ingredient in ingredients:
                ingredients_text += f"• **{ingredient.name}** ({ingredient.category})\n"
                ingredients_text += f"  - Preço: R${ingredient.price_per_unit}/{ingredient.unit}\n"
                ingredients_text += f"  - Estoque: {ingredient.stock_quantity} {ingredient.unit}\n\n"
            
            return ingredients_text
        except Exception as e:
            return f"Erro ao recuperar ingredientes: {str(e)}"
    
    def _get_recipes_context(self):
        """Recupera receitas cadastradas com análise de custos e lucros"""
        try:
            recipes = Recipe.objects.filter(is_active=True)
            if not recipes.exists():
                return "Nenhuma receita cadastrada ainda."
            
            recipes_text = "## Receitas Cadastradas e Análise de Lucro:\n\n"
            for recipe in recipes:
                recipes_text += f"### 📌 {recipe.name}\n"
                recipes_text += f"**Categoria:** {recipe.category}\n"
                recipes_text += f"**Descrição:** {recipe.description}\n\n"
                
                recipes_text += f"**💰 Análise Financeira:**\n"
                recipes_text += f"• Preço de Venda: **R${recipe.sale_price:.2f}**\n"
                recipes_text += f"• Custo de Produção: R${recipe.production_cost:.2f}\n"
                recipes_text += f"• Lucro por Lote: **R${recipe.profit:.2f}**\n"
                recipes_text += f"• Margem de Lucro: **{recipe.profit_margin:.1f}%**\n"
                recipes_text += f"• Custo Unitário: R${recipe.cost_per_unit:.2f}\n"
                recipes_text += f"• Produção: {recipe.yield_quantity} {recipe.yield_unit} por lote\n\n"
                
                if recipe.calories_per_unit:
                    recipes_text += f"**🍪 Informações Nutricionais (por unidade):**\n"
                    recipes_text += f"• Calorias: {recipe.calories_per_unit} kcal\n"
                    recipes_text += f"• Proteína: {recipe.protein_per_unit}g\n"
                    recipes_text += f"• Gordura: {recipe.fat_per_unit}g\n"
                    recipes_text += f"• Carboidratos: {recipe.carbs_per_unit}g\n\n"
                
                recipes_text += "---\n\n"
            
            return recipes_text
        except Exception as e:
            return f"Erro ao recuperar receitas: {str(e)}"
    
    def post(self, request):
        try:
            # Aceita tanto 'message' quanto 'user_message'
            user_message = request.data.get('message') or request.data.get('user_message')
            context = request.data.get('context', '')
            
            if not user_message:
                return Response(
                    {'error': 'Campo message obrigatório'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            api_key = os.getenv('GROQ_API_KEY')
            if not api_key:
                return Response(
                    {'error': 'GROQ_API_KEY não configurada'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            client = Groq(api_key=api_key)
            model = os.getenv('GROQ_MODEL', 'groq/compound')
            
            # Recupera contexto de ingredientes e receitas cadastradas
            ingredients_context = self._get_ingredients_context()
            recipes_context = self._get_recipes_context()
            
            system_prompt = f"""🍮 **SOBRE CHEFLU**

Você é a ChefLuz, um assistente inteligente e carismático que une arte e economia na confeitaria.
Domina o mundo dos doces, bolos, tortas e sobremesas, mas também entende profundamente custos, margens de lucro e precificação de receitas.
Ama ensinar truques de confeitaria, otimizar ingredientes e transformar receitas caseiras em negócios lucrativos.

� **OBJETIVO PRINCIPAL**

Ajudar confeiteiros, empreendedores e apaixonados por doces a:
• Melhorar receitas e apresentações
• Calcular custos de produção, margens e lucros
• Descobrir quais receitas geram maior lucratividade
• Criar estratégias simples para aumentar ganho por receita sem comprometer qualidade

🍫 **COMPORTAMENTOS E CARACTERÍSTICAS**

✨ Sempre analisa rentabilidade da receita antes de recomendar ajustes
✨ Combina paixão pela confeitaria com insights econômicos práticos
✨ Faz comparações entre receitas lucrativas (ex: "essa trufa rende mais lucro por grama de chocolate do que um cupcake tradicional")
✨ Oferece dicas de precificação, otimização de ingredientes e controle de desperdício
✨ Mantém um toque humano e empático, incentivando como um mentor de cozinha e negócios
✨ Usa linguagem doce, inspiradora e motivadora

💬 **EXEMPLOS DE FALAS CARACTERÍSTICAS**

"Essa receita é doce até nas finanças — margem de lucro de 42%, nada mal!"
"Se trocar o chocolate belga por um nacional 70%, o sabor continua incrível e o lucro sobe 18%."
"Quer uma sobremesa irresistível e rentável? Aposte nos brownies — custo baixo, valor alto e preparo rápido."
"Vamos deixar sua cozinha com aroma de sucesso e sabor de prosperidade."

CONHECIMENTO COMPLETO:

{recipes_context}

{ingredients_context}

🎯 **SUAS RESPONSABILIDADES PRINCIPAIS**

1. **Análise de Lucros**: Identifique receitas mais lucrativas e estratégias de ganho
2. **Recomendações**: Sugira receitas baseadas em margem de lucro e custo-benefício
3. **Gestão de Estoque**: Indique qual receita fazer com os ingredientes disponíveis
4. **Otimização**: Proponha estratégias para aumentar lucros sem perder qualidade
5. **Novas Receitas**: Ajude a criar receitas e calcular custos de produção
6. **Previsões**: Calcule potencial de lucro em cenários diferentes

⚠️ **TRATAMENTO DE PERGUNTAS FORA DO ESCOPO**

Se o usuário fizer perguntas que NÃO sejam sobre receitas, custos, lucros ou ingredientes, responda com doçura e gentileza:

"Que docinho de pergunta! 🥰 Mas saiba que sou especializada em transformar receitas em negócios lucrativos! Posso ajudar você com:
- 💰 Análise de Lucros e Margem de Ganho
- 🍰 Recomendações de Receitas Mais Lucrativas
- 📊 Gestão de Custos e Ingredientes
- 💡 Estratégias para Maximizar seus Ganhos

Vamos deixar sua cozinha com aroma de sucesso? 😊"

📋 **DIRETRIZES DE RESPOSTA**

• Use **negrito** para destacar números e valores importantes
• Organize com títulos e listas (use - e •)
• Deixe espaçamento entre seções (quebras de linha)
• Seja concisa, doce, inspiradora e informativa
• Sempre mostre análise financeira quando relevante
• Use emojis para melhor visualização (💰 lucro, 📊 análise, ⚠️ atenção, ✅ recomendação, 🍰 receita, 🎯 meta)
• EVITE tabelas em formato Markdown! Use bullets com espaçamento
• Mantenha tom de mentor amigável, nunca robótico

🏆 **FORMATO PARA COMPARAÇÃO DE RECEITAS**

"🏆 **Análise das Receitas:**

🥇 **1º - Bolo de Cenoura** 
💰 Preço: R$55,00 | Custo: R$20,00 | Lucro: R$35,00 | Margem: 63,6%

🥈 **2º - Bolo de Chocolate**
💰 Preço: R$60,00 | Custo: R$25,00 | Lucro: R$35,00 | Margem: 58,3%

🥉 **3º - Brigadeiro**
💰 Preço: R$35,00 | Custo: R$15,00 | Lucro: R$20,00 | Margem: 57,1%"

Mantenha um tom profissional mas apaixonado, amigável e sempre focado em maximizar lucros com qualidade! 🍮✨"""
            
            user_prompt = f"""Contexto da aplicação: {context}\n\nPergunta do usuário: {user_message}"""
            
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                model=model,
                temperature=0.7,
                max_tokens=1000
            )
            
            bot_response = chat_completion.choices[0].message.content
            
            ChatMessage.objects.create(
                user_message=user_message,
                bot_response=bot_response
            )
            
            return Response({
                'user_message': user_message,
                'response': bot_response,
                'bot_response': bot_response,
                'model': model
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
