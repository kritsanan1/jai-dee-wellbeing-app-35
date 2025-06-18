
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface FeedbackWidgetProps {
  onSubmit: (feedback: FeedbackData) => void;
  triggerButton?: boolean;
}

interface FeedbackData {
  rating: number;
  comment: string;
  category: string;
  timestamp: Date;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ 
  onSubmit, 
  triggerButton = true 
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('general');

  const categories = [
    { value: 'general', label: language === 'th' ? 'ทั่วไป' : 'General' },
    { value: 'ui', label: language === 'th' ? 'การออกแบบ' : 'Design' },
    { value: 'features', label: language === 'th' ? 'คุณสมบัติ' : 'Features' },
    { value: 'performance', label: language === 'th' ? 'ประสิทธิภาพ' : 'Performance' },
    { value: 'content', label: language === 'th' ? 'เนื้อหา' : 'Content' }
  ];

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error(language === 'th' ? 'กรุณาให้คะแนน' : 'Please provide a rating');
      return;
    }

    const feedbackData: FeedbackData = {
      rating,
      comment: comment.trim(),
      category,
      timestamp: new Date()
    };

    onSubmit(feedbackData);
    toast.success(language === 'th' ? 'ขขอบคุณสำหรับความคิดเห็น!' : 'Thank you for your feedback!');
    
    // Reset form
    setRating(0);
    setComment('');
    setCategory('general');
    setIsOpen(false);
  };

  if (!isOpen && triggerButton) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-nature-green to-dark-green shadow-lg z-40"
        size="icon"
      >
        <MessageSquare size={20} />
      </Button>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={`text-center ${language === 'th' ? 'font-sarabun' : 'font-poppins'}`}>
            {language === 'th' ? 'แบ่งปันความคิดเห็น' : 'Share Your Feedback'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rating */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              {language === 'th' ? 'คุณพอใจกับแอปนี้แค่ไหน?' : 'How satisfied are you with the app?'}
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Star
                    size={32}
                    className={star <= rating ? 'text-sunset-orange fill-current' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-dark-green mb-2 block">
              {language === 'th' ? 'หมวดหมู่' : 'Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-soft-blue rounded-md focus:outline-none focus:ring-2 focus:ring-nature-green"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium text-dark-green mb-2 block">
              {language === 'th' ? 'ความคิดเห็นเพิ่มเติม' : 'Additional Comments'}
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={language === 'th' 
                ? 'แบ่งปันความคิดเห็นของคุณ...' 
                : 'Share your thoughts...'}
              rows={3}
              className="border-soft-blue focus:border-nature-green"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              {language === 'th' ? 'ยกเลิก' : 'Cancel'}
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-nature-green to-dark-green"
            >
              <Send size={16} className="mr-2" />
              {language === 'th' ? 'ส่ง' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackWidget;
