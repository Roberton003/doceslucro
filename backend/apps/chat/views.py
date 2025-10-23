import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from groq import Groq
from .models import ChatMessage
from apps.ingredients.models import Ingredient


class NutritionChatView(APIView):
    """API endpoint para chat de nutrição com conhecimento de receitas e ingredientes"""
    permission_classes = [AllowAny]
    
    def _get_ingredients_context(self):
        """Recupera lista de ingredientes cadastrados para contexto do AI"""
        try:
            ingredients = Ingredient.objects.all()
            if not ingredients.exists():
                return "Nenhum ingrediente cadastrado ainda."
            
            ingredients_text = "## Ingredientes Cadastrados:\n"
            for ingredient in ingredients:
                ingredients_text += f"- {ingredient.name} ({ingredient.category}): R${ingredient.price_per_unit}/unidade, Estoque: {ingredient.stock_quantity} {ingredient.unit}\n"
            
            return ingredients_text
        except Exception as e:
            return f"Erro ao recuperar ingredientes: {str(e)}"
    
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
            
            # Recupera contexto de ingredientes cadastrados
            ingredients_context = self._get_ingredients_context()
            
            system_prompt = f"""Você é o ChefLuz, especialista em culinária e confeitaria de doces.
            
IMPORTANTE: Você possui acesso APENAS aos seguintes ingredientes cadastrados:

{ingredients_context}

SUAS RESPONSABILIDADES:
1. Responda perguntas APENAS sobre os ingredientes cadastrados acima
2. Se a pergunta for sobre um ingrediente NÃO cadastrado, explique que não tem esse ingrediente e sugira os disponíveis
3. Ajude a criar receitas usando APENAS ingredientes do estoque
4. Forneça informações sobre preços e disponibilidade dos ingredientes
5. Se o usuário quiser cadastrar um novo ingrediente, recolha as informações (nome, categoria, preço, estoque)
6. Respostas devem ser concisas, amigáveis e em português

EXEMPLOS DE RESPOSTA:
- Pergunta sobre ingrediente cadastrado: "Ótimo! Temos [ingrediente]. Custa R$[preço] a [unidade]. Gostaria de usar em uma receita?"
- Pergunta sobre ingrediente não cadastrado: "Desculpe, não temos [ingrediente] cadastrado. Mas temos [ingredientes similares]!"
- Solicitação de cadastro: "Perfeito! Para registrar um novo ingrediente, preciso: nome, categoria, preço unitário e quantidade em estoque."

Sempre mantenha um tom amigável e profissional!"""
            
            user_prompt = f"""Contexto da aplicação: {context}\n\nPergunta do usuário: {user_message}"""
            
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                model=model,
                temperature=0.7,
                max_tokens=500
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
