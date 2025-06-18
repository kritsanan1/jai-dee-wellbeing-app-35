
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrivacyConsentProps {
  onConsentGiven: (consents: ConsentData) => void;
  onDecline: () => void;
}

interface ConsentData {
  analytics: boolean;
  personalization: boolean;
  dataProcessing: boolean;
  required: boolean;
}

const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ 
  onConsentGiven, 
  onDecline 
}) => {
  const { language } = useLanguage();
  const [consents, setConsents] = useState<ConsentData>({
    analytics: false,
    personalization: false,
    dataProcessing: false,
    required: false
  });

  const consentItems = [
    {
      key: 'required' as keyof ConsentData,
      icon: Shield,
      title: language === 'th' ? 'การประมวลผลข้อมูลที่จำเป็น' : 'Required Data Processing',
      description: language === 'th' 
        ? 'การประมวลผลข้อมูลที่จำเป็นสำหรับการใช้งานแอปพลิเคชัน' 
        : 'Essential data processing required for app functionality',
      required: true
    },
    {
      key: 'analytics' as keyof ConsentData,
      icon: Eye,
      title: language === 'th' ? 'การวิเคราะห์การใช้งาน' : 'Usage Analytics',
      description: language === 'th'
        ? 'ช่วยให้เราปรับปรุงแอปพลิเคชันให้ดีขึ้น'
        : 'Help us improve the app experience',
      required: false
    },
    {
      key: 'personalization' as keyof ConsentData,
      icon: Database,
      title: language === 'th' ? 'การปรับแต่งเนื้อหา' : 'Content Personalization',
      description: language === 'th'
        ? 'เนื้อหาและคำแนะนำที่เหมาะสมกับคุณ'
        : 'Personalized content and recommendations',
      required: false
    },
    {
      key: 'dataProcessing' as keyof ConsentData,
      icon: Lock,
      title: language === 'th' ? 'การแบ่งปันข้อมูล' : 'Data Sharing',
      description: language === 'th'
        ? 'การแบ่งปันข้อมูลกับพันธมิตรเพื่อบริการที่ดีขึ้น'
        : 'Share data with partners for improved services',
      required: false
    }
  ];

  const handleConsentChange = (key: keyof ConsentData, checked: boolean) => {
    setConsents(prev => ({ ...prev, [key]: checked }));
  };

  const handleAccept = () => {
    onConsentGiven({ ...consents, required: true });
  };

  const canProceed = consents.required;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-nature-green to-mint-green rounded-full flex items-center justify-center mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <CardTitle className={`text-xl ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            {language === 'th' ? 'การคุ้มครองความเป็นส่วนตัว' : 'Privacy Protection'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center mb-6">
            {language === 'th'
              ? 'เราใส่ใจในความเป็นส่วนตัวของคุณ กรุณาเลือกการอนุญาตที่คุณต้องการ'
              : 'We care about your privacy. Please select your preferences below.'
            }
          </p>

          <div className="space-y-4">
            {consentItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gentle-gray">
                  <Icon className="text-nature-green mt-1" size={20} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                        {item.title}
                        {item.required && <span className="text-red-500 ml-1">*</span>}
                      </h4>
                      <Checkbox
                        checked={consents[item.key]}
                        onCheckedChange={(checked) => handleConsentChange(item.key, checked as boolean)}
                        disabled={item.required}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onDecline}
              className="flex-1"
            >
              {language === 'th' ? 'ปฏิเสธ' : 'Decline'}
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!canProceed}
              className="flex-1 bg-gradient-to-r from-nature-green to-dark-green"
            >
              {language === 'th' ? 'ยอมรับ' : 'Accept'}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            {language === 'th'
              ? 'คุณสามารถเปลี่ยนแปลงการตั้งค่าได้ในหน้าโปรไฟล์'
              : 'You can change these settings anytime in your profile.'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyConsent;
