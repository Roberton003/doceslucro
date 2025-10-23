import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from groq import Groq
from .models import ChatMessage


class NutritionChatView(APIView):
    """API endpoint para chat de nutrição"""
    permission_classes = [AllowAny]
    
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
            
            system_prompt = """Você é especialista em nutrição e culinária.
            Ajude com informações nutricionais de forma concisa."""
            
            user_prompt = f"""Contexto: {context}\nPergunta: {user_message}"""
            
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
