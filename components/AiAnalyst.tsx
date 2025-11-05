
import React, { useState, useRef, useEffect } from 'react';
import { getAiInsight } from '../services/geminiService';
import { ChatMessage, Kpi, ProductionLine, Asset } from '../types';
import { Icons } from '../constants';

interface AiAnalystProps {
  plantData: {
    kpis: Kpi[];
    productionLines: ProductionLine[];
    assets: Asset[];
  };
}

const AiAnalyst: React.FC<AiAnalystProps> = ({ plantData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'I am your AI Plant Analyst. Ask me anything about the current operations, like "Why is line 3 efficiency low?" or "Summarize plant status."',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await getAiInsight(plantData, inputValue);
      const modelMessage: ChatMessage = { role: 'model', content: aiResponse };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'system',
        content: 'An error occurred. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderMessage = (msg: ChatMessage, index: number) => {
    const isUser = msg.role === 'user';
    const isSystem = msg.role === 'system';

    if (isSystem) {
        return (
            <div key={index} className="px-4 py-2 text-sm text-center text-gray-400">{msg.content}</div>
        );
    }

    return (
        <div key={index} className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Icons.robot className="w-5 h-5 text-white" />
                </div>
            )}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 text-sm ${isUser ? 'bg-primary text-white' : 'bg-base-300 text-neutral'}`}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
            </div>
        </div>
    )
  }

  return (
    <div className="bg-base-200 rounded-lg border border-base-300 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-bold text-neutral p-4 border-b border-base-300">AI Analyst</h3>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map(renderMessage)}
        {isLoading && (
            <div className="flex items-start gap-3">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Icons.robot className="w-5 h-5 text-white" />
                </div>
                <div className="max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 text-sm bg-base-300 text-neutral">
                    <div className="flex items-center gap-2">
                         <Icons.spinner className="w-4 h-4 animate-spin"/>
                         <span>Analyzing...</span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-base-300">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about plant data..."
            className="w-full bg-base-300 border border-base-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-neutral"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary text-white rounded-lg p-2 disabled:bg-base-300 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
          >
            {isLoading ? <Icons.spinner className="w-6 h-6 animate-spin"/> : <Icons.send className="w-6 h-6" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiAnalyst;
