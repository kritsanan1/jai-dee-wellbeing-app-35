
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  animation?: 'pulse' | 'bounce' | 'scale' | 'glow';
  ripple?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className, 
  animation = 'scale',
  ripple = false,
  ...props 
}) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    }
    props.onClick?.(e);
  };

  const animationClasses = {
    pulse: 'hover:animate-pulse',
    bounce: 'hover:animate-gentle-bounce',
    scale: 'hover:scale-105 active:scale-95',
    glow: 'hover:shadow-lg hover:shadow-nature-green/30'
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={cn(
        'transition-all duration-200 relative overflow-hidden',
        animationClasses[animation],
        ripple && isClicked && 'animate-pulse',
        className
      )}
    >
      {ripple && isClicked && (
        <div className="absolute inset-0 bg-white/20 animate-ping rounded-md" />
      )}
      {children}
    </Button>
  );
};

export default AnimatedButton;
