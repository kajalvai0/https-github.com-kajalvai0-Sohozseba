
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { UI_STRINGS } from '../constants';

interface ChatBotProps {
  lang: Language;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const t = UI_STRINGS[lang];
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: lang === 'en' ? 'Hi! How can I assist you with services in Bangladesh today?' : 'হ্যালো! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?', 
      timestamp: new Date() 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const result = await getGeminiResponse(input, history);
    
    const aiMsg: ChatMessage = { 
      role: 'model', 
      text: result.text || "...", 
      timestamp: new Date(),
      groundingUrls: result.urls
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-xl w-[360px] sm:w-[420px] h-[600px] rounded-3xl shadow-2xl border border-white flex flex-col mb-6 animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
          <div className="bg-blue-600 p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20">
                <i className="fa-solid fa-robot-astromech text-lg"></i>
              </div>
              <div>
                <p className="font-black text-sm tracking-tight">Gemini Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Always Learning</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors">
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`
                  max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm
                  ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}
                `}>
                  {msg.text}
                </div>
                {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.groundingUrls.slice(0, 3).map((u, idx) => (
                      <a 
                        key={idx} 
                        href={u.uri} 
                        target="_blank" 
                        rel="noopener" 
                        className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-full text-blue-600 hover:bg-blue-50 flex items-center gap-1"
                      >
                        <i className="fa-solid fa-link text-[8px]"></i>
                        <span className="truncate max-w-[100px]">{u.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.askGemini}
                className="w-full bg-slate-100/80 border-none rounded-2xl pl-5 pr-14 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md shadow-blue-200"
              >
                <i className="fa-solid fa-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 hover:-rotate-3 transition-all active:scale-95 group relative"
      >
        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping group-hover:hidden"></div>
        {isOpen ? <i className="fa-solid fa-xmark text-2xl"></i> : <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>}
      </button>
    </div>
  );
};

export default ChatBot;
