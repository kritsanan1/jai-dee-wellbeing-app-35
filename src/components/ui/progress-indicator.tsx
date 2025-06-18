
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'wellness' | 'mood' | 'streak';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'default',
  size = 'md',
  animated = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const variantClasses = {
    default: 'bg-nature-green',
    wellness: 'bg-gradient-to-r from-mint-green to-nature-green',
    mood: 'bg-gradient-to-r from-calm-blue to-soft-blue',
    streak: 'bg-gradient-to-r from-sunset-orange to-lotus-pink'
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-dark-green">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-600">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn(
            sizeClasses[size],
            'bg-gentle-gray',
            animated && 'transition-all duration-500 ease-out'
          )}
        />
        <div 
          className={cn(
            'absolute inset-0 rounded-full transition-all duration-500 ease-out',
            variantClasses[variant]
          )}
          style={{ 
            width: `${percentage}%`,
            ...(animated && { 
              background: variant === 'default' ? undefined : variantClasses[variant]
            })
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
