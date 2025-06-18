
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, X, Sparkles, Brain, Heart, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedButton from '@/components/ui/animated-button';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpgrade 
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const features = [
    {
      icon: Brain,
      title: language === 'th' ? 'แชท AI ไม่จำกัด' : 'Unlimited AI Chat',
      description: language === 'th' ? 'พูดคุยกับ AI ได้ไม่จำกัด' : 'Chat with AI without limits'
    },
    {
      icon: Heart,
      title: language === 'th' ? 'เนื้อหาพิเศษ' : 'Exclusive Content',
      description: language === 'th' ? 'การทำสมาธิและบทความพิเศษ' : 'Premium meditation and articles'
    },
    {
      icon: Target,
      title: language === 'th' ? 'แผนการปรับปรุงส่วนตัว' : 'Personalized Plans',
      description: language === 'th' ? 'แผนการดูแลสุขภาพจิตเฉพาะคุณ' : 'Customized wellness plans'
    },
    {
      icon: Sparkles,
      title: language === 'th' ? 'ไม่มีโฆษณา' : 'Ad-Free Experience',
      description: language === 'th' ? 'ใช้งานได้อย่างสบายใจ' : 'Uninterrupted wellness journey'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-sunset-orange to-lotus-pink p-6 text-white relative">
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            size="sm"
          >
            <X size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Crown size={32} className="text-yellow-200" />
            <div>
              <h2 className={`text-2xl font-bold ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {language === 'th' ? 'อัปเกรดเป็นพรีเมียม' : 'Upgrade to Premium'}
              </h2>
              <p className="text-sm opacity-90">
                {language === 'th' ? 'ปลดล็อกคุณสมบัติพิเศษทั้งหมด' : 'Unlock all premium features'}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-mint-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-dark-green" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-wellness-gradient p-4 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-dark-green">
                ฿299
                <span className="text-sm font-normal text-gray-600 ml-1">
                  /{language === 'th' ? 'เดือน' : 'month'}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {language === 'th' ? 'ยกเลิกได้ทุกเมื่อ' : 'Cancel anytime'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <AnimatedButton
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-sunset-orange to-lotus-pink text-white text-lg py-3"
              animation="glow"
              ripple
            >
              <Crown size={20} className="mr-2" />
              {language === 'th' ? 'อัปเกรดตอนนี้' : 'Upgrade Now'}
            </AnimatedButton>
            
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full text-gray-600"
            >
              {language === 'th' ? 'ไว้ทีหลัง' : 'Maybe Later'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumModal;
