
import { useState, useEffect } from 'react';
import { Star, Award, Zap, LucideIcon } from 'lucide-react';

interface WellnessData {
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  moodHistory: MoodEntry[];
  achievements: Achievement[];
}

interface MoodEntry {
  date: Date;
  mood: string;
  score: number;
}

interface Achievement {
  id: string;
  title: string;
  titleTh: string;
  icon: LucideIcon;
  unlocked: boolean;
  date?: Date;
}

export const useWellnessData = () => {
  const [wellnessData, setWellnessData] = useState<WellnessData>({
    currentStreak: 5,
    weeklyGoal: 7,
    weeklyProgress: 4,
    moodHistory: [],
    achievements: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading wellness data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock achievements data
      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'First Step',
          titleTh: 'ก้าวแรก',
          icon: Star,
          unlocked: true,
          date: new Date(Date.now() - 86400000 * 5)
        },
        {
          id: '2',
          title: 'Week Warrior',
          titleTh: 'นักรบสัปดาห์',
          icon: Award,
          unlocked: true,
          date: new Date(Date.now() - 86400000 * 2)
        },
        {
          id: '3',
          title: 'Meditation Master',
          titleTh: 'ปรมาจารย์สมาธิ',
          icon: Zap,
          unlocked: false
        }
      ];

      setWellnessData(prev => ({
        ...prev,
        achievements: mockAchievements
      }));
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const updateStreak = (newStreak: number) => {
    setWellnessData(prev => ({
      ...prev,
      currentStreak: newStreak
    }));
  };

  const addMoodEntry = (mood: string, score: number) => {
    const newEntry: MoodEntry = {
      date: new Date(),
      mood,
      score
    };

    setWellnessData(prev => ({
      ...prev,
      moodHistory: [...prev.moodHistory, newEntry],
      weeklyProgress: prev.weeklyProgress + 1
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setWellnessData(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true, date: new Date() }
          : achievement
      )
    }));
  };

  return {
    wellnessData,
    isLoading,
    updateStreak,
    addMoodEntry,
    unlockAchievement
  };
};
