
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface FeedbackFormProps {
  onSubmit: (feedback: {
    rating: number;
    category: string;
    message: string;
    email?: string;
  }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const { language } = useLanguage();
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const categories = [
    { value: 'bug', label: language === 'th' ? 'พบข้อผิดพลาด' : 'Bug Report' },
    { value: 'feature', label: language === 'th' ? 'เสนอคุณสมบัติใหม่' : 'Feature Request' },
    { value: 'ui', label: language === 'th' ? 'ปรับปรุงหน้าจอ' : 'UI Improvement' },
    { value: 'content', label: language === 'th' ? 'เนื้อหา' : 'Content' },
    { value: 'other', label: language === 'th' ? 'อื่นๆ' : 'Other' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error(language === 'th' ? 'กรุณาให้คะแนน' : 'Please provide a rating');
      return;
    }
    if (!message.trim()) {
      toast.error(language === 'th' ? 'กรุณาใส่ข้อความ' : 'Please enter your feedback');
      return;
    }

    onSubmit({
      rating,
      category: category || 'other',
      message: message.trim(),
      email: email.trim() || undefined
    });

    // Reset form
    setRating(0);
    setCategory('');
    setMessage('');
    setEmail('');
    
    toast.success(language === 'th' ? 'ขขอบคุณสำหรับความคิดเห็น!' : 'Thank you for your feedback!');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm border-soft-blue shadow-lg">
      <CardHeader>
        <CardTitle className={`text-dark-green ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
          {language === 'th' ? 'แบ่งปันความคิดเห็น' : 'Share Your Feedback'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className={`block text-sm font-medium text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
              {language === 'th' ? 'ให้คะแนนประสบการณ์ของคุณ' : 'Rate your experience'}
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-colors duration-200"
                >
                  <Star
                    size={24}
                    className={star <= rating ? 'text-sunset-orange fill-current' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
              {language === 'th' ? 'หมวดหมู่' : 'Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-soft-blue rounded-md focus:ring-2 focus:ring-nature-green focus:border-transparent"
            >
              <option value="">
                {language === 'th' ? 'เลือกหมวดหมู่' : 'Select category'}
              </option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className={`block text-sm font-medium text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
              {language === 'th' ? 'ข้อความ' : 'Message'}
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'th' ? 'แบ่งปันความคิดเห็นของคุณ...' : 'Share your thoughts...'}
              rows={4}
              className="border-soft-blue focus:border-nature-green"
            />
          </div>

          {/* Email (optional) */}
          <div>
            <label className={`block text-sm font-medium text-dark-green mb-2 ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
              {language === 'th' ? 'อีเมล (ไม่บังคับ)' : 'Email (optional)'}
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'th' ? 'your.email@example.com' : 'your.email@example.com'}
              className="border-soft-blue focus:border-nature-green"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-nature-green to-dark-green text-white"
          >
            <Send size={16} className="mr-2" />
            {language === 'th' ? 'ส่งความคิดเห็น' : 'Send Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
