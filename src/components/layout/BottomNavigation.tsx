
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageCircle, BookOpen, Users, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { 
      id: 'home', 
      path: '/', 
      icon: Home, 
      label: t('nav.home'),
      gradient: 'from-nature-green to-dark-green'
    },
    { 
      id: 'chat', 
      path: '/chat', 
      icon: MessageCircle, 
      label: t('nav.chat'),
      gradient: 'from-calm-blue to-soft-blue'
    },
    { 
      id: 'content', 
      path: '/content', 
      icon: BookOpen, 
      label: t('nav.content'),
      gradient: 'from-mint-green to-nature-green'
    },
    { 
      id: 'therapist', 
      path: '/therapist', 
      icon: Users, 
      label: t('nav.therapist'),
      gradient: 'from-lotus-pink to-sunset-orange'
    },
    { 
      id: 'profile', 
      path: '/profile', 
      icon: User, 
      label: t('nav.profile'),
      gradient: 'from-sunset-orange to-nature-green'
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-soft-blue shadow-2xl z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105` 
                    : 'text-gray-600 hover:text-dark-green hover:bg-soft-blue/30'
                }`}
              >
                <Icon 
                  size={20} 
                  className={isActive ? 'animate-gentle-bounce' : ''} 
                />
                <span className={`text-xs font-medium ${isActive ? 'font-sarabun' : 'font-poppins'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
