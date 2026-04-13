import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const PaymentBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your WelfareFund Assistant. How can I help you with your payments today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simple mock response logic
    setTimeout(() => {
      let botResponse = "I'm analyzing your request. For now, remember our Paybill is 400200.";
      if (input.toLowerCase().includes("pay")) {
        botResponse = "To make a payment, use M-Pesa Paybill 400200. Use your Phone Number as the Account Number.";
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <Layout role="member">
      <div className="max-w-3xl mx-auto h-[calc(100vh-160px)] flex flex-col">
        <header className="mb-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Payment Assistant</h1>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online & Ready
            </p>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.sender === 'bot' && <Bot size={18} className="shrink-0 mt-1 opacity-70" />}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t border-gray-50 bg-gray-50/50 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Paybill, deadlines, or status..."
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
        
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {["What is the Paybill?", "Check my deadline", "How to pay cash?"].map((suggestion) => (
            <button 
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="whitespace-nowrap bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentBot;