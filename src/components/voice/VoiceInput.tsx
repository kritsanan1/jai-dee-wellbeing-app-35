
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language?: 'en' | 'th';
}

const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  language: voiceLang 
}) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = () => {
    if (!isSupported) {
      toast.error(language === 'th' ? 'เบราว์เซอร์ไม่รองรับการรับรู้เสียง' : 'Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = voiceLang === 'th' ? 'th-TH' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast.error(language === 'th' ? 'เกิดข้อผิดพลาดในการรับรู้เสียง' : 'Speech recognition error');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      onClick={startListening}
      disabled={isListening}
      variant={isListening ? "default" : "outline"}
      size="icon"
      className={`rounded-full ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
          : 'border-nature-green text-nature-green hover:bg-mint-green'
      }`}
    >
      {isListening ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Mic size={18} />
      )}
    </Button>
  );
};

export default VoiceInput;
