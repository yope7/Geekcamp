import React, { ReactNode } from 'react';

interface TVProps {
  children: ReactNode;
}

export const TV: React.FC<TVProps> = ({ children }) => {
  return (
    <div className="relative inline-block">
      {/* TV image */}
      <img 
        src="/images/TV.png" 
        alt="Vintage TV" 
        className="w-64 h-auto relative z-10"
        width="30%"
      />
      
      {/* Content overlay */}
      <div className="absolute top-[12%] left-[12%] w-[76%] h-[57%] overflow-hidden">
        {children}
      </div>
    </div>
  );
};
