'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { ChatMessage, initialMessages, getAiResponse } from '@/lib/data';

const quickActions = [
  { label: '🚨 Any delays?', query: 'Show me delayed shipments' },
  { label: '🚚 In transit?', query: 'Which shipments are in transit?' },
  { label: '⏱️ ETA for 001?', query: 'What is the ETA for LGX-2024-001?' },
  { label: '🗺️ Optimize routes', query: 'Optimize my routes' },
  { label: '💰 Revenue?', query: 'Show me revenue insights' },
  { label: '📋 Summary', query: 'Give me an operations summary' },
];

function formatMessage(text: string) {
  // Convert newlines to <br> and basic formatting
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ));
}

export default function AICopilot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate AI thinking latency (800–1800ms)
    const delay = 800 + Math.random() * 1000;
    await new Promise(r => setTimeout(r, delay));

    const responseText = getAiResponse(text);
    const botMsg: ChatMessage = { role: 'bot', text: responseText, time: now() };
    setTyping(false);
    setMessages(prev => [...prev, botMsg]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button className="ai-fab" id="ai-copilot-btn" onClick={() => setOpen(o => !o)} title="Kingpin AI Copilot">
        {open ? '✕' : '✦'}
        {!open && <span className="ai-fab-badge">AI</span>}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="ai-window" id="ai-copilot-window">
          {/* Header */}
          {/* Header */}
          <div className="ai-window-header">
            <div className="ai-avatar">✦</div>
            <div className="ai-header-info">
              <div className="ai-header-name">Kingpin AI</div>
              <div className="ai-header-status">
                <div className="ai-status-dot" />
                Intelligent Logistics Copilot
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="ai-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ${msg.role}`}>
                <div className={`ai-msg-avatar ${msg.role}`}>
                  {msg.role === 'bot' ? '✦' : 'AN'}
                </div>
                <div>
                  <div className={`ai-msg-bubble ${msg.role}`}>
                    {formatMessage(msg.text)}
                  </div>
                  <div className="ai-msg-time">{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="ai-msg">
                <div className="ai-msg-avatar bot">✦</div>
                <div className="ai-typing-bubble">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="ai-quick-actions">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                className="ai-quick-btn"
                onClick={() => sendMessage(qa.query)}
                disabled={typing}
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="ai-input-row">
            <textarea
              ref={inputRef}
              className="ai-input"
              placeholder="Ask about shipments, routes, ETAs…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              id="ai-chat-input"
            />
            <button
              className="ai-send-btn"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              id="ai-send-btn"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
