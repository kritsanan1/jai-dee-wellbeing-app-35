
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Brain, Heart, Sunrise, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WellnessStreak from '@/components/gamification/WellnessStreak';
import AnimatedButton from '@/components/ui/animated-button';
import ProgressIndicator from '@/components/ui/progress-indicator';
import { useWellnessData } from '@/hooks/useWellnessData';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { wellnessData, isLoading } = useWellnessData();

  const moodData = {
    current: 'Calm',
    currentTh: 'สงบ',
    percentage: 75,
    streak: wellnessData.currentStreak
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin w-8 h-8 border-4 border-nature-green border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="text-nature-green animate-gentle-bounce" size={24} />
          <h1 className={`text-2xl font-bold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            {t('home.welcome')}
          </h1>
          <Sparkles className="text-nature-green animate-gentle-bounce" size={24} />
        </div>
        <p className="text-gray-600 text-sm">
          {language === 'th' ? 'เริ่มต้นวันใหม่ด้วยจิตใจที่ดี' : 'Start your day with mindfulness'}
        </p>
      </div>

      {/* Wellness Streak Component */}
      <WellnessStreak
        currentStreak={wellnessData.currentStreak}
        weeklyGoal={wellnessData.weeklyGoal}
        weeklyProgress={wellnessData.weeklyProgress}
        achievements={wellnessData.achievements}
      />

      {/* Daily Mood Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-lg gentle-hover">
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center space-x-2 text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            <Brain className="text-calm-blue" size={20} />
            <span>{t('home.mood_summary')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-dark-green">
                {language === 'th' ? moodData.currentTh : moodData.current}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'th' ? `${moodData.streak} วันติดต่อกัน` : `${moodData.streak} days streak`}
              </p>
            </div>
            <div className="breathing-circle w-12 h-12 bg-gradient-to-r from-mint-green to-calm-blue rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
          </div>
          <ProgressIndicator 
            value={moodData.percentage} 
            variant="mood"
            animated
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <AnimatedButton
          onClick={() => navigate('/content')}
          className="h-20 bg-gradient-to-r from-nature-green to-dark-green text-white rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-lg"
          animation="scale"
          ripple
        >
          <Sunrise size={24} />
          <span className={`text-sm font-medium ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            {t('home.start_meditation')}
          </span>
        </AnimatedButton>
        
        <AnimatedButton
          onClick={() => navigate('/chat')}
          className="h-20 bg-gradient-to-r from-calm-blue to-soft-blue text-white rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-lg"
          animation="glow"
          ripple
        >
          <Brain size={24} />
          <span className={`text-sm font-medium ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            {t('home.check_mood')}
          </span>
        </AnimatedButton>
      </div>

      {/* Premium Upgrade Banner */}
      <Card className="bg-gradient-to-r from-sunset-orange to-lotus-pink text-white border-none shadow-lg gentle-hover">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown size={24} className="text-yellow-200" />
              <div>
                <h3 className={`font-semibold ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                  {t('common.upgrade')}
                </h3>
                <p className="text-sm opacity-90">
                  {language === 'th' ? 'ปลดล็อกคุณสมบัติพิเศษทั้งหมด' : 'Unlock all premium features'}
                </p>
              </div>
            </div>
            <AnimatedButton 
              variant="secondary" 
              size="sm" 
              className="bg-white text-sunset-orange hover:bg-gray-100"
              animation="bounce"
            >
              {language === 'th' ? 'อัปเกรด' : 'Upgrade'}
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>

      {/* Daily Wellness Tip */}
      <Card className="bg-meditation-gradient border-mint-green shadow-lg">
        <CardHeader>
          <CardTitle className={`text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            {t('home.daily_tip')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-gray-700 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            {language === 'th' 
              ? 'การฝึกสมาธิเพียง 5 นาทีต่อวันสามารถช่วยลดความเครียดและเพิ่มสมาธิได้อย่างมีนัยสำคัญ' 
              : 'Just 5 minutes of daily meditation can significantly reduce stress and improve focus.'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
