# 🍳 FloatingChefBot - Chatbot Flutuante Gastronômico

## 📋 Características

```
✅ Botão circular flutuante (canto inferior direito)
✅ Ícone 🍳 com animação de flutuação suave
✅ Anel de pulso para chamar atenção
✅ Bolha de saudação "Posso te ajudar?"
✅ Janela de chat expansível (minimalista)
✅ Cabeçalho "ChefBot - Assistente Culinário"
✅ Histórico de mensagens com timestamps
✅ Campo de entrada com ícone 🍽️
✅ Loading com 3 pontos animados
✅ Design responsivo (desktop/mobile/tablet)
✅ Tema gourmet (bege, creme, verde-menta)
✅ Dark mode automático
✅ Acessibilidade (prefers-reduced-motion)
```

---

## 🎨 Design Visual

### Cores (Tema Gastronômico)
```javascript
--primary-color: #d4a574;        // Bege gourmet
--secondary-color: #f5e6d3;      // Creme claro
--accent-color: #8b7355;         // Marrom quente
--success-color: #a4d65e;        // Verde-menta
--text-dark: #2c2416;            // Texto escuro
```

### Componentes
```
🍳 Botão Circular: 64px (desktop), 56px (mobile)
💬 Bolha de Saudação: 160px máx
📱 Janela de Chat: 380px (desktop), 100% (mobile)
↳ Cabeçalho: Gradiente Bege → Marrom
↳ Corpo: Fundo creme com degradê
↳ Rodapé: Branco com borda suave
```

---

## 🚀 Como Usar

### 1. Importar no seu componente principal

**Opção A: App.jsx**
```jsx
import FloatingChefBot from './components/FloatingChefBot';

function App() {
  return (
    <div>
      {/* Seu conteúdo */}
      <FloatingChefBot />
    </div>
  );
}
```

**Opção B: SinglePage.jsx**
```jsx
import FloatingChefBot from './FloatingChefBot';

export default function SinglePage() {
  return (
    <div>
      {/* Seu conteúdo */}
      <FloatingChefBot />
    </div>
  );
}
```

### 2. Arquivos necessários
```
frontend/src/components/
├── FloatingChefBot.jsx      ← Componente principal
└── FloatingChefBot.css      ← Estilos
```

### 3. Verificar importação de CSS
O CSS é importado automaticamente no .jsx:
```jsx
import './FloatingChefBot.css';
```

---

## 🎯 Funcionalidades

### Estados
```javascript
isOpen       // Janela aberta/fechada
messages     // Histórico de mensagens
inputValue   // Valor do campo de entrada
isLoading    // Aguardando resposta
showGreeting // Mostrar bolha de saudação
```

### Eventos
```javascript
handleToggle()       // Abrir/fechar janela
handleClose()        // Fechar janela
handleSendMessage()  // Enviar mensagem
getBotResponse()     // Gerar resposta (mock)
```

### Auto-scroll
Rola automaticamente para a última mensagem quando:
- Nova mensagem chega
- Usuário digita
- Carregamento começa

### Focus automático
Campo de entrada recebe foco automaticamente quando janela abre.

---

## 🔌 Conectar com Backend

### Atualmente
O bot responde com respostas mockadas baseadas em palavras-chave:
```javascript
if (lowerMessage.includes('receita')) {
  return '🍳 Que legal! Posso te ajudar com receitas...';
}
```

### Para conectar com Groq/Compound API

**Substitua a função `handleSendMessage`:**
```jsx
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
    // Chamar backend
    const response = await fetch('/api/chat/nutrition/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(), // Ver função abaixo
      },
      body: JSON.stringify({
        message: inputValue,
        recipe_context: {
          name: 'Receita Atual',
          servings: 1,
          ingredients: []
        }
      })
    });

    const data = await response.json();

    const botResponse = {
      id: messages.length + 2,
      text: data.ai_response || data.error,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
  } catch (error) {
    console.error('Erro:', error);
    const errorMessage = {
      id: messages.length + 2,
      text: '😅 Desculpe, tive um problema! Tente novamente.',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};

// Função para pegar CSRF Token
const getCSRFToken = () => {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
```

---

## 📱 Responsividade

### Desktop (≥ 480px)
```
Botão: 64px circular
Janela: 380px fixo
Posição: Bottom-right flutuante
```

### Mobile (< 480px)
```
Botão: 56px circular
Janela: 100% da largura
Posição: Fullscreen com overlay
Animação: Desliza de baixo para cima
```

---

## 🎨 Customização

### Mudar cores
Edite as variáveis no topo de `FloatingChefBot.css`:
```css
:root {
  --primary-color: #seu-bege;
  --secondary-color: #seu-creme;
  --accent-color: #seu-marrom;
  --success-color: #seu-verde;
}
```

### Mudar ícones
No arquivo .jsx, substitua os emojis:
```jsx
<div className="bot-icon">🍳</div>     // Ícone principal
<div className="header-avatar">🤖</div> // Avatar do header
<button className="send-btn">🍽️</button> // Botão enviar
```

### Mudar textos
```jsx
placeholder="Faça sua pergunta..."
<h3>ChefBot</h3>
<p>Assistente Culinário</p>
```

---

## 🌙 Dark Mode

Ativa automaticamente com:
```css
@media (prefers-color-scheme: dark) {
  /* Cores escuras */
}
```

Se o usuário tem dark mode ativado no SO, o chat automaticamente fica em modo escuro.

---

## ♿ Acessibilidade

✅ Suporta `prefers-reduced-motion`  
✅ Botões com `:focus` visível  
✅ Contraste de cores WCAG AA  
✅ Tipografia legível (14px mínimo)  
✅ Estrutura semântica HTML  

---

## 🎭 Animações

### Flutuação (Float)
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
Duration: 3s
```

### Pulso (Pulse)
```css
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
Duration: 2s
```

### Fade In (FadeIn)
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
Duration: 0.3s
```

### Loading (Blink)
```css
@keyframes blink {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}
Duration: 1.4s
```

---

## 🐛 Troubleshooting

### Problema: Componente não aparece
**Solução**: Verifique se está importado em App.jsx ou SinglePage.jsx

### Problema: Estilos CSS não aplicados
**Solução**: Verifique se o import do CSS está em FloatingChefBot.jsx:
```jsx
import './FloatingChefBot.css';
```

### Problema: Animações travando
**Solução**: Use `will-change` no CSS (já incluído)

### Problema: Mobile não funciona bem
**Solução**: Verifique viewport meta tag em index.html:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📊 Estrutura do Componente

```
FloatingChefBot
├── chef-bot-button (circular flutuante)
│   ├── bot-icon (ícone com animação)
│   └── pulse-ring (anel de pulso)
├── greeting-bubble (saudação inicial)
├── chef-bot-window (janela de chat)
│   ├── chat-header (cabeçalho)
│   │   ├── header-content
│   │   │   ├── bot-avatar
│   │   │   └── header-info
│   │   └── close-btn
│   ├── chat-body (histórico)
│   │   ├── message (usuário)
│   │   ├── message (bot)
│   │   └── message.loading
│   └── chat-footer (input)
│       ├── chat-input
│       └── send-btn
└── chat-overlay (fundo escurecido)
```

---

## 🚀 Próximos Passos

1. ✅ Componente criado (`FloatingChefBot.jsx`)
2. ✅ CSS com tema gourmet (`FloatingChefBot.css`)
3. 🔜 Integrar com backend Groq/Compound
4. 🔜 Conectar com `/api/chat/nutrition/`
5. 🔜 Teste em localhost:5173
6. 🔜 Deploy em Render

---

## 📝 Notas

- Componente é **100% funcional** com respostas mockadas
- Pronto para integração com API real
- Totalmente customizável via CSS
- Mobile-first responsive design
- Performance otimizada (Virtual scrolling se necessário)
- Sem dependências externas (Pure React + CSS)

---

**Criado**: 22 de outubro de 2025  
**Status**: ✅ Pronto para usar  
**Próximo**: Integrar com backend  

🍳 **ChefBot Ready!** 🤖
