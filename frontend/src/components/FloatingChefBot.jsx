import React, { useState, useEffect, useRef } from 'react';
import './FloatingChefBot.css';
import luzdoce from '../assets/luzdoce2.jpeg';

// Função para limpar e formatar Markdown simples
const formatMarkdown = (text) => {
  if (!text) return '';
  
  // Remover linhas separadoras (---, ***, ___)
  text = text.replace(/^[-*_]{3,}$/gm, '');
  
  // Remover títulos Markdown (#### ou #####, etc)
  text = text.replace(/^#{1,6}\s*/gm, '');
  
  // Converter **texto** para <strong>texto</strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Converter *texto* para <em>texto</em> (itálico)
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Remover linhas vazias extras (mais de 2 quebras de linha seguidas)
  text = text.replace(/\n\n\n+/g, '\n\n');
  
  return text;
};

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

    try {
      // Fazer requisição ao backend (API Groq)
      const response = await fetch('http://localhost:8000/api/chat/nutrition/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: inputValue,
          context: 'Você é um assistente culinário experiente. Responda perguntas sobre receitas, ingredientes, técnicas culinárias e nutrição de forma amigável e prática.'
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao conectar com o servidor');
      }

      const data = await response.json();
      
      const botResponse = {
        id: messages.length + 2,
        text: formatMarkdown(data.response) || 'Desculpe, não consegui processar sua pergunta. Tente novamente!',
        sender: 'bot',
        timestamp: new Date(),
        isMarkdown: true
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Erro:', error);
      const botResponse = {
        id: messages.length + 2,
        text: `❌ Erro ao conectar: ${error.message}. Tente novamente mais tarde!`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
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
        <img src={luzdoce} alt="ChefLuz" className="bot-icon-image" />
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
            <img src={luzdoce} alt="ChefLuz" className="bot-avatar-image" />
            <div className="header-info">
              <h3>ChefLuz</h3>
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
                {message.isMarkdown ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: message.text }}
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  />
                ) : (
                  <p>{message.text}</p>
                )}
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
              <div className="message-bubble loading-bubble">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="loading-text">ChefLuz está pensando...</div>
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
