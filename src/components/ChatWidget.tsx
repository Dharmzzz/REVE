import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Send, X, Bot, User, RefreshCw, MessageSquare } from 'lucide-react';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  externalQuery?: string | null;
  onClearExternalQuery?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'bot',
    text: "Hello! I'm Rêve's AI Eco Assistant. How can I help you today? Ask me about our 5 shoe collections, pricing, 2025 sustainability goals, 60-day trial & returns, or digital gift cards!",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    source: 'Rêve Eco Knowledge Engine',
  },
];

const SUGGESTIONS = [
  'What collections do you offer & what are their prices?',
  'What are your 2025 sustainability commitments?',
  'How do I return or exchange my shoes?',
  'Tell me about your digital gift cards',
  'What eco-friendly materials do you use?',
];

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onClose,
  onToggle,
  externalQuery,
  onClearExternalQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle external query passed from other pages (e.g. from product details or FAQ)
  useEffect(() => {
    if (externalQuery && externalQuery.trim() !== '') {
      handleSend(externalQuery);
      if (onClearExternalQuery) onClearExternalQuery();
    }
  }, [externalQuery]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Build conversation history format for backend
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      // Try primary relative path (works with Vite proxy or production)
      let endpoint = '/api/chat';
      let res: Response;
      try {
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, history }),
        });
      } catch (err) {
        // Fallback for independent development on port 5173 / 5500
        endpoint = 'http://127.0.0.1:8000/api/chat';
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, history }),
        });
      }

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
        escalated: data.escalated,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.warn('API error, providing intelligent client fallback:', error);
      // Fallback response if FastAPI server is momentarily unreachable
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "I'm having a brief connection blip with our primary knowledge server, but here is what I know: Rêve Eco offers 5 specialized collections (Urban Essentials $79–$99, Trail Explorer $119–$149, Street Style $89–$129, Athletic Performance $129–$169, Eco Classics $99–$119) and Digital Gift Cards ($25–$200). We offer a 60-day trial with free return shipping. You can also contact support@reve-eco.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'Rêve Eco Offline Engine',
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Floating Launcher Pill Button */}
      {!isOpen && (
        <button
          className="chatbot-launcher-pill"
          onClick={onToggle}
          title="Open AI Eco Assistant"
        >
          <div className="launcher-pulse-ring" />
          <Sparkles size={18} className="text-mint" />
          <span className="launcher-label">Ask Rêve AI</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="chat-window-container">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-brand">
              <div className="chat-avatar-ring">
                <Sparkles size={16} className="text-forest" />
              </div>
              <div>
                <h4 className="chat-header-name">Rêve AI Assistant</h4>
                <span className="chat-online-badge">
                  <span className="green-dot" /> Online • LangChain RAG
                </span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="chat-icon-btn"
                onClick={handleClearHistory}
                title="Restart conversation"
              >
                <RefreshCw size={15} />
              </button>
              <button className="chat-icon-btn" onClick={onClose} title="Minimize chat">
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="chat-suggestions-track">
            {SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                className="suggestion-chip"
                onClick={() => handleSend(sug)}
                disabled={isLoading}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="chat-messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${msg.sender === 'user' ? 'is-user' : 'is-bot'}`}
              >
                <div className="chat-bubble-content">
                  <div className="chat-bubble-text">
                    {msg.text.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>

                  {msg.source && (
                    <div className="chat-source-tag">
                      <span>Source: {msg.source}</span>
                    </div>
                  )}

                  <span className="chat-msg-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Thinking Indicator */}
            {isLoading && (
              <div className="chat-bubble-row is-bot">
                <div className="chat-bubble-content thinking-bubble">
                  <div className="typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="thinking-text">Rêve AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Ask about shoes, returns, materials..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              className="chat-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
