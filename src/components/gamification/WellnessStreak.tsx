
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Star, Trophy, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProgressIndicator from '@/components/ui/progress-indicator';

interface WellnessStreakProps {
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  titleTh: string;
  icon: React.ComponentType<{ size?: number; className?: string; }>;
  unlocked: boolean;
  date?: Date;
}

const WellnessStreak: React.FC<WellnessStreakProps> = ({
  currentStreak,
  weeklyGoal,
  weeklyProgress,
  achievements
}) => {
  const { language } = useLanguage();

  const getStreakMessage = () => {
    if (currentStreak === 0) {
      return language === 'th' ? 'เริ่มต้นการเดินทางใหม่!' : 'Start your wellness journey!';
    } else if (currentStreak < 7) {
      return language === 'th' ? 'คุณกำลังสร้างนิสัยที่ดี!' : 'Building great habits!';
    } else if (currentStreak < 30) {
      return language === 'th' ? 'ยอดเยี่ยม! คุณทำได้ดีมาก!' : 'Amazing! You\'re doing great!';
    } else {
      return language === 'th' ? 'นักรบแห่งสุขภาพจิต!' : 'Mental wellness warrior!';
    }
  };

  const getStreakColor = () => {
    if (currentStreak < 7) return 'from-calm-blue to-soft-blue';
    if (currentStreak < 30) return 'from-nature-green to-mint-green';
    return 'from-sunset-orange to-lotus-pink';
  };

  return (
    <div className="space-y-4">
      {/* Main Streak Display */}
      <Card className="bg-gradient-to-r from-gentle-gray to-soft-blue border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getStreakColor()} rounded-full flex items-center justify-center breathing-circle`}>
                <Flame className="text-white" size={32} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                  {currentStreak}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'th' ? 'วันติดต่อกัน' : 'day streak'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {getStreakMessage()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center space-x-2 text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            <Target className="text-nature-green" size={20} />
            <span>{language === 'th' ? 'เป้าหมายประจำสัปดาห์' : 'Weekly Goal'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressIndicator
            value={weeklyProgress}
            max={weeklyGoal}
            label={`${weeklyProgress}/${weeklyGoal} ${language === 'th' ? 'กิจกรรม' : 'activities'}`}
            variant="wellness"
            animated
          />
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center space-x-2 text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            <Trophy className="text-sunset-orange" size={20} />
            <span>{language === 'th' ? 'ความสำเร็จ' : 'Achievements'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {achievements.slice(0, 6).map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg text-center transition-all duration-200 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-mint-green to-nature-green text-white'
                      : 'bg-gentle-gray text-gray-400'
                  }`}
                >
                  <Icon size={24} className="mx-auto mb-2" />
                  <p className="text-xs font-medium">
                    {language === 'th' ? achievement.titleTh : achievement.title}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessStreak;
