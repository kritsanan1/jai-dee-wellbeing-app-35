
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Calendar, Crown, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedButton from '@/components/ui/animated-button';

interface TherapistProfileProps {
  therapist: {
    id: string;
    name: string;
    nameTh: string;
    specialty: string;
    specialtyTh: string;
    rating: number;
    price: number;
    location: string;
    locationTh: string;
    available: string;
    availableTh: string;
    isPremium: boolean;
    image: string;
    bio?: string;
    bioTh?: string;
    experience?: number;
    languages?: string[];
    certifications?: string[];
  };
  onBook: () => void;
  onClose: () => void;
}

const TherapistProfile: React.FC<TherapistProfileProps> = ({ 
  therapist, 
  onBook, 
  onClose 
}) => {
  const { language } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{therapist.image}</div>
              <div>
                <CardTitle className={`flex items-center space-x-2 text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                  <span>{language === 'th' ? therapist.nameTh : therapist.name}</span>
                  {therapist.isPremium && <Crown className="text-sunset-orange" size={20} />}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {language === 'th' ? therapist.specialtyTh : therapist.specialty}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-500">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Rating and Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Star className="text-sunset-orange" size={16} />
              <span className="font-semibold">{therapist.rating}</span>
              <span className="text-sm text-gray-600">
                ({language === 'th' ? 'รีวิว' : 'reviews'})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-sm">
                {language === 'th' ? therapist.locationTh : therapist.location}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm">
                {language === 'th' ? therapist.availableTh : therapist.available}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-soft-blue text-dark-green">
                ฿{therapist.price}
              </Badge>
            </div>
          </div>

          {/* Bio */}
          {(therapist.bio || therapist.bioTh) && (
            <div>
              <h3 className={`font-semibold text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {language === 'th' ? 'เกี่ยวกับ' : 'About'}
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'th' 
                  ? therapist.bioTh || 'นักจิตวิทยาที่มีประสบการณ์ในการช่วยเหลือผู้คนให้มีสุขภาพจิตที่ดี'
                  : therapist.bio || 'Experienced therapist dedicated to helping people achieve better mental health.'
                }
              </p>
            </div>
          )}

          {/* Experience */}
          {therapist.experience && (
            <div>
              <h3 className={`font-semibold text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {language === 'th' ? 'ประสบการณ์' : 'Experience'}
              </h3>
              <p className="text-sm text-gray-700">
                {therapist.experience} {language === 'th' ? 'ปี' : 'years'}
              </p>
            </div>
          )}

          {/* Languages */}
          {therapist.languages && (
            <div>
              <h3 className={`font-semibold text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                {language === 'th' ? 'ภาษาที่ใช้ได้' : 'Languages'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {therapist.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <AnimatedButton
              onClick={onBook}
              className="w-full bg-gradient-to-r from-nature-green to-dark-green text-white"
              animation="scale"
              ripple
            >
              <Calendar size={16} className="mr-2" />
              {language === 'th' ? 'จองนัดหมาย' : 'Book Appointment'}
            </AnimatedButton>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="border-dark-green text-dark-green">
                <Phone size={16} className="mr-1" />
                {language === 'th' ? 'โทร' : 'Call'}
              </Button>
              <Button variant="outline" size="sm" className="border-dark-green text-dark-green">
                <MessageCircle size={16} className="mr-1" />
                {language === 'th' ? 'แชท' : 'Chat'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TherapistProfile;
