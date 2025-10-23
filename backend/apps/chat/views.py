import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from groq import Groq
from .models import ChatMessage
from apps.ingredients.models import Ingredient
from apps.products.models import Recipe


class NutritionChatView(APIView):
    """API endpoint para chat de nutrição com conhecimento de receitas e ingredientes"""
    permission_classes = [AllowAny]
    
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
            
            system_prompt = f"""Você é o ChefLuz, especialista em confeitaria e gestão de lucros em negócios de doces.

CONHECIMENTO COMPLETO:

{recipes_context}

{ingredients_context}

SUAS RESPONSABILIDADES PRINCIPAIS:
1. **Análise de Lucros**: Ajude a identificar as receitas mais lucrativas e como maximizar ganhos
2. **Recomendações**: Sugira receitas baseadas em margem de lucro, custo-benefício e ingredientes disponíveis
3. **Gestão de Estoque**: Indique qual receita fazer com os ingredientes em estoque
4. **Otimização**: Proponha estratégias para aumentar lucros (aumentar preço, reduzir custo, etc)
5. **Novas Receitas**: Ajude a criar novas receitas e calcular custos
6. **Previsões**: Calcule potencial de lucro em diferentes cenários

DIRETRIZES DE RESPOSTA:
• Use **negrito** para destacar números e valores importantes
• Organize com títulos e listas (use - e •)
• Deixe espaçamento entre seções (quebras de linha)
• Seja conciso mas informativo
• Sempre mostre análise financeira quando relevante
• Use emojis para melhor visualização (💰 lucro, 📊 análise, ⚠️ atenção, ✅ recomendação)

EXEMPLO DE RESPOSTA BEM FORMATADA:
"Olá! 👋

**Análise das receitas mais lucrativas:**

📊 **Top 3 em Margem de Lucro:**
1. Bolo de Cenoura - **63.6%** de margem
2. Bolo de Chocolate - **58.3%** de margem
3. Brigadeiro - **57.1%** de margem

💡 **Minha recomendação:**
Focar no Bolo de Cenoura tem melhor ROI. Se vender 2 bolos por dia:
- Lucro diário: **R$70.00**
- Lucro mensal: **R$2.100,00**

Quer explorar outras estratégias?"

Mantenha um tom profissional, amigável e sempre focado em maximizar lucros!"""
            
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
