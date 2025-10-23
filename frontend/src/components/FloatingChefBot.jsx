import React, { useState, useEffect, useRef } from 'react';
import './FloatingChefBot.css';

const FloatingChefBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá, chef! 👋 Sou o seu assistente culinário. Como posso ajudar?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Esconder saudação após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simular resposta da IA (depois conectar com backend)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 800);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('receita') || lowerMessage.includes('como fazer')) {
      return '🍳 Que legal! Posso te ajudar com receitas deliciosas! Qual tipo de prato você está afim de fazer? Doce, salgado, entrada, prato principal?';
    }
    if (lowerMessage.includes('caloria') || lowerMessage.includes('nutrição')) {
      return '📊 Ótimo! Posso calcular as calorias e informações nutricionais das receitas. Qual receita você quer analisar?';
    }
    if (lowerMessage.includes('ingrediente')) {
      return '🥕 Perfeito! Tenho informações sobre diversos ingredientes. Qual ingrediente você quer conhecer melhor?';
    }
    if (lowerMessage.includes('técnica') || lowerMessage.includes('como cozinhar')) {
      return '👨‍🍳 Adorei! Posso ensinar técnicas culinária incríveis! Qual tipo de técnica te interessa?';
    }
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('valeu')) {
      return '😊 De nada, chef! Estou sempre aqui pra ajudar! Tem mais alguma coisa?';
    }
    return '🍽️ Entendi! Deixa eu pensar... Pode me dar mais detalhes? Estou aqui pra ajudar com receitas, ingredientes, técnicas e cálculos nutricionais!';
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <div className={`chef-bot-button ${isOpen ? 'active' : ''}`} onClick={handleToggle}>
        <div className="bot-icon">🍳</div>
        <div className={`pulse-ring ${isOpen ? 'hidden' : ''}`}></div>
      </div>

      {/* Saudação Flutuante */}
      {!isOpen && showGreeting && (
        <div className="greeting-bubble">
          <span>Posso te ajudar? 👋</span>
          <div className="arrow"></div>
        </div>
      )}

      {/* Janela de Chat */}
      <div className={`chef-bot-window ${isOpen ? 'open' : ''}`}>
        {/* Cabeçalho */}
        <div className="chat-header">
          <div className="header-content">
            <div className="bot-avatar">🍳</div>
            <div className="header-info">
              <h3>ChefBot</h3>
              <p>Assistente Culinário</p>
            </div>
          </div>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        {/* Corpo do Chat */}
        <div className="chat-body">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="timestamp">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message bot-message">
              <div className="message-bubble loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Rodapé com Input */}
        <form className="chat-footer" onSubmit={handleSendMessage}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Faça sua pergunta..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="chat-input"
          />
          <button type="submit" disabled={isLoading} className="send-btn">
            🍽️
          </button>
        </form>
      </div>

      {/* Overlay */}
      {isOpen && <div className="chat-overlay" onClick={handleClose}></div>}
    </>
  );
};

export default FloatingChefBot;
