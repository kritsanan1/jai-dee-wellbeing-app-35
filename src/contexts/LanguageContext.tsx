
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    en: string;
    th: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', th: 'หน้าแรก' },
  'nav.chat': { en: 'AI Chat', th: 'แชท AI' },
  'nav.content': { en: 'Content', th: 'เนื้อหา' },
  'nav.therapist': { en: 'Therapist', th: 'นักจิตวิทยา' },
  'nav.profile': { en: 'Profile', th: 'โปรไฟล์' },
  
  // Home page
  'home.welcome': { en: 'Welcome back', th: 'ยินดีต้อนรับกลับ' },
  'home.mood_summary': { en: 'Today\'s Mood Summary', th: 'สรุปอารมณ์วันนี้' },
  'home.start_meditation': { en: 'Start Meditation', th: 'เริ่มการทำสมาธิ' },
  'home.check_mood': { en: 'Check Your Mood', th: 'ตรวจสอบอารมณ์' },
  'home.daily_tip': { en: 'Daily Wellness Tip', th: 'เคล็ดลับสุขภาพจิตประจำวัน' },
  
  // AI Chat
  'chat.title': { en: 'AI Wellness Chat', th: 'แชทด้านสุขภาพจิตกับ AI' },
  'chat.placeholder': { en: 'How are you feeling today?', th: 'วันนี้คุณรู้สึกอย่างไร?' },
  'chat.save_mood': { en: 'Save Mood', th: 'บันทึกอารมณ์' },
  
  // Content
  'content.meditation': { en: 'Guided Meditation', th: 'การทำสมาธิแบบมีคำแนะนำ' },
  'content.breathing': { en: 'Breathing Exercises', th: 'การฝึกหายใจ' },
  'content.articles': { en: 'Mental Health Articles', th: 'บทความสุขภาพจิต' },
  
  // Therapist
  'therapist.title': { en: 'Find a Therapist', th: 'ค้นหานักจิตวิทยา' },
  'therapist.book': { en: 'Book Session', th: 'จองนัดหมาย' },
  
  // Profile
  'profile.progress': { en: 'Your Progress', th: 'ความก้าวหน้าของคุณ' },
  'profile.settings': { en: 'Settings', th: 'การตั้งค่า' },
  'profile.language': { en: 'Language', th: 'ภาษา' },
  
  // Common
  'common.upgrade': { en: 'Upgrade to Premium', th: 'อัปเกรดเป็นพรีเมียม' },
  'common.loading': { en: 'Loading...', th: 'กำลังโหลด...' },
  'common.save': { en: 'Save', th: 'บันทึก' },
  'common.cancel': { en: 'Cancel', th: 'ยกเลิก' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
