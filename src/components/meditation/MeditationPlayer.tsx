
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProgressIndicator from '@/components/ui/progress-indicator';

interface MeditationPlayerProps {
  title: string;
  duration: number; // in minutes
  theme: 'sleep' | 'stress' | 'mindfulness' | 'focus';
  onComplete?: () => void;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({
  title,
  duration,
  theme,
  onComplete
}) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  
  const totalSeconds = duration * 60;
  const minutes = Math.floor((totalSeconds - currentTime) / 60);
  const seconds = (totalSeconds - currentTime) % 60;

  const themeGradients = {
    sleep: 'from-purple-400 to-indigo-500',
    stress: 'from-calm-blue to-soft-blue',
    mindfulness: 'from-nature-green to-mint-green',
    focus: 'from-sunset-orange to-lotus-pink'
  };

  const themeBackgrounds = {
    sleep: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    stress: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    mindfulness: 'bg-gradient-to-br from-green-50 to-emerald-50',
    focus: 'bg-gradient-to-br from-orange-50 to-pink-50'
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalSeconds) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev + 1 >= totalSeconds) {
            setIsPlaying(false);
            onComplete?.();
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalSeconds, onComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const progress = (currentTime / totalSeconds) * 100;

  return (
    <div className={`min-h-screen ${themeBackgrounds[theme]} p-4 flex flex-col justify-center`}>
      <Card className="bg-white/90 backdrop-blur-lg border-none shadow-2xl overflow-hidden">
        <div className={`h-48 bg-gradient-to-r ${themeGradients[theme]} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="breathing-circle w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h2 className={`text-xl font-bold text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
              {title}
            </h2>
            <div className="text-3xl font-bold text-dark-green">
              {String(minutes).padStart(2, '0')}:{String(Math.floor(seconds)).padStart(2, '0')}
            </div>
          </div>

          <ProgressIndicator 
            value={progress} 
            variant="wellness"
            animated
            showPercentage={false}
          />

          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={handleReset}
              variant="outline"
              size="icon"
              className="rounded-full border-dark-green text-dark-green hover:bg-mint-green"
            >
              <RotateCcw size={20} />
            </Button>
            
            <Button
              onClick={handlePlayPause}
              size="lg"
              className={`rounded-full w-16 h-16 bg-gradient-to-r ${themeGradients[theme]} text-white shadow-lg hover:scale-105 transition-transform`}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Volume2 size={20} className="text-dark-green" />
              <div className="w-16 h-2 bg-gentle-gray rounded-full overflow-hidden">
                <div 
                  className="h-full bg-dark-green rounded-full transition-all duration-200"
                  style={{ width: `${volume}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className={`text-gray-600 text-sm ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
              {language === 'th' 
                ? 'สูดหายใจเข้าลึกๆ และปล่อยให้จิตใจสงบ' 
                : 'Breathe deeply and let your mind find peace'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeditationPlayer;
