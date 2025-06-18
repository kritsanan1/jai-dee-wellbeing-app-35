
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User, Heart, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: language === 'th' 
        ? 'สวัสดีค่ะ! ฉันเป็น AI ที่จะช่วยดูแลสุขภาพจิตของคุณ วันนี้คุณรู้สึกอย่างไรบ้างคะ?' 
        : 'Hello! I\'m your AI wellness companion. How are you feeling today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        th: [
          'ฉันเข้าใจความรู้สึกของคุณ คุณต้องการลองทำการฝึกหายใจ 5 นาทีไหมคะ?',
          'ขขอบคุณที่แบ่งปันกับฉัน คุณอยากลองทำสมาธิเพื่อช่วยผ่อนคลายไหมคะ?',
          'ฉันอยู่ที่นี่เพื่อรับฟังคุณเสมอ มาลองหาวิธีที่จะทำให้คุณรู้สึกดีขึ้นกันนะคะ'
        ],
        en: [
          'I understand how you\'re feeling. Would you like to try a 5-minute breathing exercise?',
          'Thank you for sharing with me. Would you like to try some meditation to help you relax?',
          'I\'m here to listen. Let\'s find ways to help you feel better.'
        ]
      };

      const responses = aiResponses[language];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const saveMood = () => {
    toast.success(
      language === 'th' 
        ? 'บันทึกอารมณ์เรียบร้อยแล้ว' 
        : 'Mood saved successfully'
    );
  };

  return (
    <div className="flex flex-col h-screen max-h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xl font-bold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {t('chat.title')}
        </h1>
        <Button
          onClick={saveMood}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 border-nature-green text-nature-green hover:bg-mint-green"
        >
          <Save size={16} />
          <span>{t('chat.save_mood')}</span>
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-scroll space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-dark-green text-white' 
                : 'bg-white border-soft-blue'
            } shadow-md`}>
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <div className="w-6 h-6 bg-gradient-to-r from-nature-green to-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  {message.type === 'user' && (
                    <div className="w-6 h-6 bg-calm-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={12} className="text-white" />
                    </div>
                  )}
                  <p className={`text-sm ${language === 'th' ? 'font-sarabun' : 'font-poppins'} ${
                    message.type === 'user' ? 'text-white' : 'text-gray-700'
                  }`}>
                    {message.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-white border-soft-blue shadow-md">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-nature-green to-mint-green rounded-full flex items-center justify-center">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-nature-green rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-nature-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-nature-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.placeholder')}
            className={`pr-12 border-soft-blue focus:border-nature-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}
          />
          <Heart className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lotus-pink" size={16} />
        </div>
        <Button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-gradient-to-r from-nature-green to-dark-green text-white shadow-lg gentle-hover"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default AIChat;
