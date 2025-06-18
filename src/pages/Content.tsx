
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Wind, BookOpen, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Content: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const meditationSessions = [
    {
      title: language === 'th' ? 'การทำสมาธิเพื่อการนอนหลับ' : 'Sleep Meditation',
      duration: '15 min',
      theme: 'sleep',
      gradient: 'from-purple-400 to-indigo-500'
    },
    {
      title: language === 'th' ? 'การทำสมาธิเพื่อลดความเครียด' : 'Stress Relief',
      duration: '10 min',
      theme: 'stress',
      gradient: 'from-calm-blue to-soft-blue'
    },
    {
      title: language === 'th' ? 'การทำสมาธิเพื่อความมีสติ' : 'Mindfulness',
      duration: '5 min',
      theme: 'mindfulness',
      gradient: 'from-nature-green to-mint-green'
    }
  ];

  const breathingExercises = [
    {
      title: language === 'th' ? 'การหายใจ 4-7-8' : '4-7-8 Breathing',
      description: language === 'th' ? 'เทคนิคการหายใจเพื่อผ่อนคลาย' : 'Relaxation breathing technique'
    },
    {
      title: language === 'th' ? 'การหายใจลึก' : 'Deep Breathing',
      description: language === 'th' ? 'การหายใจเพื่อลดความวิตกกังวล' : 'Breathing for anxiety relief'
    }
  ];

  const articles = [
    {
      title: language === 'th' ? 'การจัดการความเครียดในชีวิตประจำวัน' : 'Managing Daily Stress',
      readTime: '5 min',
      category: language === 'th' ? 'ความเครียด' : 'Stress'
    },
    {
      title: language === 'th' ? 'ความสำคัญของการนอนหลับต่อสุขภาพจิต' : 'Sleep and Mental Health',
      readTime: '7 min',
      category: language === 'th' ? 'การนอนหลับ' : 'Sleep'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-2xl font-bold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {language === 'th' ? 'เนื้อหาสุขภาพจิต' : 'Wellness Content'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'th' ? 'เลือกกิจกรรมที่เหมาะกับคุณ' : 'Choose activities that suit you'}
        </p>
      </div>

      {/* Guided Meditation */}
      <section>
        <h2 className={`text-lg font-semibold text-dark-green mb-4 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {t('content.meditation')}
        </h2>
        <div className="space-y-3">
          {meditationSessions.map((session, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-lg gentle-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${session.gradient} rounded-xl flex items-center justify-center`}>
                      <Play className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className={`font-medium text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                        {session.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{session.duration}</span>
                        <Star size={14} className="text-sunset-orange" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-nature-green to-dark-green text-white">
                    {language === 'th' ? 'เล่น' : 'Play'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Breathing Exercises */}
      <section>
        <h2 className={`text-lg font-semibold text-dark-green mb-4 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {t('content.breathing')}
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {breathingExercises.map((exercise, index) => (
            <Card key={index} className="bg-meditation-gradient border-mint-green shadow-lg gentle-hover">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center breathing-circle">
                    <Wind className="text-dark-green" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                      {exercise.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {exercise.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-dark-green text-dark-green">
                    {language === 'th' ? 'เริ่ม' : 'Start'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mental Health Articles */}
      <section>
        <h2 className={`text-lg font-semibold text-dark-green mb-4 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {t('content.articles')}
        </h2>
        <div className="space-y-3">
          {articles.map((article, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-lg gentle-hover">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-sunset-orange to-lotus-pink rounded-lg flex items-center justify-center">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium text-dark-green mb-1 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-soft-blue rounded-full text-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Content;
