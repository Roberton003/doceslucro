import { useState, useRef, useEffect } from 'react';
import '../styles/NutritionChat.css';

export default function NutritionChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Sou seu assistente de nutrição. Como posso ajudar?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/nutrition/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          context: 'Receita de doces gourmet'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.bot_response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: '❌ Erro: ' + (data.error || 'Erro desconhecido') }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Erro ao conectar: ' + error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nutrition-chat">
      <div className="chat-header">
        <h3>🥗 Assistente de Nutrição</h3>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message message-${msg.role}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && <div className="message message-assistant"><span className="loading">Digitando...</span></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Faça uma pergunta sobre nutrição..."
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  );
}
