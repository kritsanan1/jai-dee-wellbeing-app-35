
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  User, Settings, Award, Flame, Target, Crown, 
  Globe, Bell, Shield, LogOut, Calendar 
} from 'lucide-react';

const Profile: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  const userStats = {
    meditationStreak: 12,
    totalSessions: 48,
    totalMinutes: 360,
    level: 3,
    nextLevelProgress: 65
  };

  const achievements = [
    {
      id: '1',
      title: language === 'th' ? 'นักสมาธิมือใหม่' : 'Meditation Beginner',
      description: language === 'th' ? 'ทำสมาธิครบ 5 วัน' : 'Complete 5 meditation sessions',
      icon: '🧘‍♀️',
      unlocked: true
    },
    {
      id: '2',
      title: language === 'th' ? 'ยอดนักหายใจ' : 'Breathing Master',
      description: language === 'th' ? 'ฝึกหายใจครบ 10 ครั้ง' : 'Complete 10 breathing exercises',
      icon: '💨',
      unlocked: true
    },
    {
      id: '3',
      title: language === 'th' ? 'จิตใจสงบ' : 'Zen Master',
      description: language === 'th' ? 'ทำสมาธิต่อเนื่อง 30 วัน' : '30-day meditation streak',
      icon: '🌸',
      unlocked: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-nature-green to-dark-green rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="text-white" size={32} />
        </div>
        <h1 className={`text-xl font-bold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {language === 'th' ? 'สมชาย ใจดี' : 'Somchai Jaidee'}
        </h1>
        <p className="text-gray-600 text-sm">
          {language === 'th' ? 'สมาชิกตั้งแต่ มีนาคม 2024' : 'Member since March 2024'}
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-wellness-gradient border-none shadow-lg">
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            <Target size={20} />
            <span>{t('profile.progress')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Flame className="text-sunset-orange" size={16} />
                <span className="text-2xl font-bold text-dark-green">{userStats.meditationStreak}</span>
              </div>
              <p className="text-sm text-gray-600">
                {language === 'th' ? 'วันติดต่อกัน' : 'Day Streak'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dark-green mb-1">{userStats.totalSessions}</div>
              <p className="text-sm text-gray-600">
                {language === 'th' ? 'เซสชันทั้งหมด' : 'Total Sessions'}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-dark-green">
                {language === 'th' ? `เลเวล ${userStats.level}` : `Level ${userStats.level}`}
              </span>
              <span className="text-sm text-gray-600">
                {userStats.nextLevelProgress}%
              </span>
            </div>
            <Progress value={userStats.nextLevelProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-lg">
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            <Award size={20} />
            <span>{language === 'th' ? 'ความสำเร็จ' : 'Achievements'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
              achievement.unlocked ? 'bg-mint-green/30' : 'bg-gray-100/50'
            }`}>
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className={`font-medium ${achievement.unlocked ? 'text-dark-green' : 'text-gray-500'} ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {achievement.description}
                </p>
              </div>
              {achievement.unlocked && (
                <Award className="text-sunset-orange" size={20} />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Premium Upgrade */}
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
            <Button variant="secondary" className="bg-white text-sunset-orange hover:bg-gray-100">
              {language === 'th' ? 'อัปเกรด' : 'Upgrade'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-lg">
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            <Settings size={20} />
            <span>{t('profile.settings')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="text-dark-green" size={20} />
              <span className={`font-medium text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {t('profile.language')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">EN</span>
              <Switch
                checked={language === 'th'}
                onCheckedChange={(checked) => setLanguage(checked ? 'th' : 'en')}
              />
              <span className="text-sm text-gray-600">TH</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="text-dark-green" size={20} />
              <span className={`font-medium text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {language === 'th' ? 'การแจ้งเตือน' : 'Notifications'}
              </span>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Privacy */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="text-dark-green" size={20} />
              <span className={`font-medium text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {language === 'th' ? 'ความเป็นส่วนตัว' : 'Privacy'}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600">
              {language === 'th' ? 'จัดการ' : 'Manage'}
            </Button>
          </div>

          {/* Logout */}
          <div className="pt-2 border-t border-soft-blue">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50">
              <LogOut size={20} className="mr-3" />
              {language === 'th' ? 'ออกจากระบบ' : 'Sign Out'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
