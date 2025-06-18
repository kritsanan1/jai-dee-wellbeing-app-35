
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User, Heart, Save } from 'lucide-react';
import { toast } from 'sonner';
import VoiceInput from '@/components/voice/VoiceInput';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  mood?: 'happy' | 'sad' | 'anxious' | 'calm' | 'stressed';
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

  const analyzeMood = (text: string): 'happy' | 'sad' | 'anxious' | 'calm' | 'stressed' => {
    const lowerText = text.toLowerCase();
    
    // Simple mood analysis based on keywords
    if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('good') || 
        lowerText.includes('ดี') || lowerText.includes('สบาย') || lowerText.includes('มีความสุข')) {
      return 'happy';
    } else if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('down') ||
               lowerText.includes('เศร้า') || lowerText.includes('หดหู่') || lowerText.includes('ไม่สบายใจ')) {
      return 'sad';
    } else if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous') ||
               lowerText.includes('วิตกกังวล') || lowerText.includes('กังวล') || lowerText.includes('ตื่นเต้น')) {
      return 'anxious';
    } else if (lowerText.includes('stressed') || lowerText.includes('pressure') || lowerText.includes('overwhelmed') ||
               lowerText.includes('เครียด') || lowerText.includes('กดดัน') || lowerText.includes('ท้อแท้')) {
      return 'stressed';
    } else {
      return 'calm';
    }
  };

  const generateEmphatheticResponse = (mood: string, userMessage: string): string => {
    const responses = {
      th: {
        happy: [
          'ดีใจจังที่คุณรู้สึกดี! ความสุขคือพลังที่ดีที่สุด อยากลองทำสมาธิเพื่อเสริมพลังบวกไหมคะ?',
          'น่ายินดีมากค่ะ! วันนี้คุณทำอะไรที่ทำให้มีความสุขบ้างคะ?',
          'เยี่ยมมากเลย! ลองบันทึกความรู้สึกดีๆ นี้ไว้เป็นแรงบันดาลใจในวันที่ยากลำบากนะคะ'
        ],
        sad: [
          'ฉันเข้าใจความรู้สึกของคุณ เศร้าใจเป็นเรื่องปกติ คุณอยากลองฟังเพลงสงบๆ หรือทำการหายใจลึกๆ ไหมคะ?',
          'ขอโอบกอดคุณนะคะ ในช่วงที่เศร้าใจ การดูแลตัวเองเป็นสิ่งสำคัญมาก ลองพักผ่อนให้เพียงพอนะคะ',
          'ความเศร้าเป็นส่วนหนึ่งของชีวิต ฉันอยู่ที่นี่เพื่อรับฟังคุณเสมอ อยากพูดเพิ่มเติมไหมคะ?'
        ],
        anxious: [
          'เข้าใจเลยค่ะว่าคุณรู้สึกกังวล ลองทำการหายใจ 4-7-8 กันไหมคะ? หายใจเข้า 4 วินาที กลั้น 7 วินาที แล้วหายใจออก 8 วินาที',
          'ความวิตกกังวลทำให้รู้สึกไม่สบาย ลองนั่งสมาธิสั้นๆ 5 นาทีไหมคะ? จะช่วยทำให้จิตใจสงบลง',
          'ฉันอยู่ที่นี่กับคุณ อยากลองเทคนิคการผ่อนคลายกล้ามเนื้อไหมคะ? จะช่วยลดความตึงเครียดได้'
        ],
        stressed: [
          'เครียดหนักมากเลยสินะคะ ลองหยุดพักสักครู่ แล้วทำการหายใจลึกๆ ให้อากาศไหลผ่านร่างกายอย่างช้าๆ',
          'ความเครียดส่งผลต่อร่างกายและจิตใจ อยากลองการทำสมาธิแบบสั้นๆ หรือฟังเสียงธรรมชาติไหมคะ?',
          'คุณทำงานหนักมาก ลองให้เวลาตัวเองพักผ่อน การดูแลตัวเองไม่ใช่เรื่องเห็นแก่ตัวนะคะ'
        ],
        calm: [
          'ดีใจที่คุณรู้สึกสงบ นี่คือสถานะจิตใจที่ดีมาก อยากเรียนรู้เทคนิคการรักษาความสงบนี้ไหมคะ?',
          'ความสงบภายในเป็นของขวัญที่ดีที่สุด ลองทำสมาธิเพื่อเสริมสร้างความสงบนี้ให้มากขึ้นไหมคะ?',
          'สวยงามมาก! ลองแบ่งปันพลังบวกนี้ให้คนรอบข้างด้วยนะคะ'
        ]
      },
      en: {
        happy: [
          'I\'m so glad you\'re feeling good! Happiness is the best energy. Would you like to try some meditation to boost those positive vibes?',
          'That\'s wonderful to hear! What made you happy today?',
          'Excellent! Try to remember this feeling for those challenging days ahead.'
        ],
        sad: [
          'I understand how you\'re feeling. Sadness is natural. Would you like to try some calming music or deep breathing exercises?',
          'Sending you a virtual hug. Taking care of yourself during sad times is very important. Make sure to rest well.',
          'Sadness is part of life. I\'m here to listen to you always. Would you like to share more?'
        ],
        anxious: [
          'I understand you\'re feeling anxious. Let\'s try the 4-7-8 breathing technique: breathe in for 4 seconds, hold for 7, breathe out for 8.',
          'Anxiety can be uncomfortable. Would you like to try a short 5-minute meditation? It can help calm your mind.',
          'I\'m here with you. Would you like to try some muscle relaxation techniques? They can help reduce tension.'
        ],
        stressed: [
          'You sound really stressed. Let\'s take a moment to pause and take some deep breaths, letting the air flow slowly through your body.',
          'Stress affects both body and mind. Would you like to try a short meditation or listen to some nature sounds?',
          'You\'ve been working so hard. Try to give yourself some rest time. Self-care isn\'t selfish.'
        ],
        calm: [
          'I\'m happy you\'re feeling calm. This is a beautiful state of mind. Would you like to learn techniques to maintain this peace?',
          'Inner peace is the best gift. Would you like to try some meditation to strengthen this calmness even more?',
          'Beautiful! Try sharing this positive energy with people around you.'
        ]
      }
    };

    const moodResponses = responses[language][mood as keyof typeof responses.th];
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const mood = analyzeMood(textToSend);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date(),
      mood
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with mood analysis
    setTimeout(() => {
      const aiResponse = generateEmphatheticResponse(mood, textToSend);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
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

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript);
    // Auto-send voice input after a short delay
    setTimeout(() => {
      handleSend(transcript);
    }, 500);
  };

  const saveMood = () => {
    const lastUserMessage = messages.filter(m => m.type === 'user').pop();
    if (lastUserMessage?.mood) {
      // Save mood to local storage or send to backend
      const moodData = {
        mood: lastUserMessage.mood,
        message: lastUserMessage.content,
        timestamp: lastUserMessage.timestamp.toISOString()
      };
      
      localStorage.setItem('lastMood', JSON.stringify(moodData));
      toast.success(
        language === 'th' 
          ? 'บันทึกอารมณ์เรียบร้อยแล้ว' 
          : 'Mood saved successfully'
      );
    }
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
                  <div className="flex-1">
                    <p className={`text-sm ${language === 'th' ? 'font-sarabun' : 'font-poppins'} ${
                      message.type === 'user' ? 'text-white' : 'text-gray-700'
                    }`}>
                      {message.content}
                    </p>
                    {message.mood && message.type === 'user' && (
                      <div className="mt-1">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {language === 'th' ? 'อารมณ์: ' : 'Mood: '}
                          {message.mood}
                        </span>
                      </div>
                    )}
                  </div>
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
        
        <VoiceInput 
          onTranscript={handleVoiceTranscript}
          language={language}
        />
        
        <Button
          onClick={() => handleSend()}
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
