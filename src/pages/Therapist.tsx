
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Star, MapPin, Clock, Search, Filter, Crown } from 'lucide-react';

interface Therapist {
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
}

const Therapist: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      nameTh: 'ดร. ซาร่า เฉิน',
      specialty: 'Anxiety & Depression',
      specialtyTh: 'ความวิตกกังวลและซึมเศร้า',
      rating: 4.9,
      price: 1500,
      location: 'Bangkok',
      locationTh: 'กรุงเทพฯ',
      available: 'Today',
      availableTh: 'วันนี้',
      isPremium: false,
      image: '👩‍⚕️'
    },
    {
      id: '2',
      name: 'Dr. Piyaporn Tanaka',
      nameTh: 'ดร. ปิยาภรณ์ ทานากะ',
      specialty: 'Relationship Counseling',
      specialtyTh: 'คำปรึกษาด้านความสัมพันธ์',
      rating: 4.8,
      price: 2000,
      location: 'Chiang Mai',
      locationTh: 'เชียงใหม่',
      available: 'Tomorrow',
      availableTh: 'พรุ่งนี้',
      isPremium: true,
      image: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Michael Johnson',
      nameTh: 'ดร. ไมเคิล จอห์นสัน',
      specialty: 'Stress Management',
      specialtyTh: 'การจัดการความเครียด',
      rating: 4.7,
      price: 1800,
      location: 'Phuket',
      locationTh: 'ภูเก็ต',
      available: 'Next Week',
      availableTh: 'สัปดาห์หน้า',
      isPremium: true,
      image: '👨‍⚕️'
    }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = (language === 'th' ? therapist.nameTh : therapist.name)
      .toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === 'th' ? therapist.specialtyTh : therapist.specialty)
      .toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'premium') return matchesSearch && therapist.isPremium;
    if (selectedFilter === 'available') return matchesSearch && therapist.available === 'Today';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-2xl font-bold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {t('therapist.title')}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'th' ? 'เชื่อมต่อกับผู้เชี่ยวชาญด้านสุขภาพจิต' : 'Connect with mental health professionals'}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder={language === 'th' ? 'ค้นหานักจิตวิทยา...' : 'Search therapists...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 border-soft-blue focus:border-nature-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}
          />
        </div>

        <div className="flex space-x-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-dark-green text-white' : 'border-dark-green text-dark-green'}
          >
            {language === 'th' ? 'ทั้งหมด' : 'All'}
          </Button>
          <Button
            variant={selectedFilter === 'available' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('available')}
            className={selectedFilter === 'available' ? 'bg-nature-green text-white' : 'border-nature-green text-nature-green'}
          >
            {language === 'th' ? 'ว่างวันนี้' : 'Available'}
          </Button>
          <Button
            variant={selectedFilter === 'premium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('premium')}
            className={selectedFilter === 'premium' ? 'bg-sunset-orange text-white' : 'border-sunset-orange text-sunset-orange'}
          >
            <Crown size={16} className="mr-1" />
            {language === 'th' ? 'พรีเมียม' : 'Premium'}
          </Button>
        </div>
      </div>

      {/* Therapist List */}
      <div className="space-y-4">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id} className="bg-white/80 backdrop-blur-sm border-soft-blue shadow-lg gentle-hover">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{therapist.image}</div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-semibold text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
                          {language === 'th' ? therapist.nameTh : therapist.name}
                        </h3>
                        {therapist.isPremium && (
                          <Crown className="text-sunset-orange" size={16} />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {language === 'th' ? therapist.specialtyTh : therapist.specialty}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-soft-blue text-dark-green">
                      ฿{therapist.price}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="text-sunset-orange" size={14} />
                      <span>{therapist.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{language === 'th' ? therapist.locationTh : therapist.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{language === 'th' ? therapist.availableTh : therapist.available}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-nature-green to-dark-green text-white"
                    >
                      <Calendar size={16} className="mr-1" />
                      {t('therapist.book')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-dark-green text-dark-green"
                    >
                      {language === 'th' ? 'ดูโปรไฟล์' : 'View Profile'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTherapists.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {language === 'th' ? 'ไม่พบนักจิตวิทยาที่ตรงกับการค้นหา' : 'No therapists found matching your search'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Therapist;
