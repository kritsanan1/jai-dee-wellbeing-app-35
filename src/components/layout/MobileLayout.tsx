
import React from 'react';
import BottomNavigation from './BottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-wellness-gradient">
      {/* Main content area */}
      <main className="pb-20 px-4 pt-6">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default MobileLayout;
