from rest_framework import serializersfrom rest_framework import serializers

from .models import ChatMessagefrom .models import ChatMessage





class ChatMessageSerializer(serializers.ModelSerializer):class ChatMessageSerializer(serializers.ModelSerializer):

    class Meta:    class Meta:

        model = ChatMessage        model = ChatMessage

        fields = ['id', 'user_message', 'bot_response', 'created_at']        fields = ['id', 'user_message', 'bot_response', 'created_at']

        read_only_fields = ['id', 'bot_response', 'created_at']        read_only_fields = ['id', 'bot_response', 'created_at']

