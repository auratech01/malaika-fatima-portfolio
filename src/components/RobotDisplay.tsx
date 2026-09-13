import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { defaultPortfolioData } from '../data';

interface RobotDisplayProps {
  mediaConfig?: typeof defaultPortfolioData.robotMedia;
  recruiterMode?: boolean;
}

export const RobotDisplay: React.FC<RobotDisplayProps> = ({ 
  mediaConfig = defaultPortfolioData.robotMedia,
  recruiterMode = false 
}) => {
  const [imgSrc, setImgSrc] = useState<string>(mediaConfig?.imageUrl || '/images/robot_avatar.png');

  useEffect(() => {
    if (!mediaConfig?.imageUrl) return;

    const img = new Image();
    img.src = mediaConfig.imageUrl;
    img.onload = () => {
      setImgSrc(mediaConfig.imageUrl);
    };
    img.onerror = () => {
      setImgSrc('/images/robot_avatar.png');
    };
  }, [mediaConfig?.imageUrl]);

  return (
    <div className="relative flex flex-col items-center justify-center my-4 sm:my-6 group">
      {/* HUD Frame Container around Robot - Balanced responsive sizing */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] flex items-center justify-center">
        
        {/* Outer Circular HUD Orbit Lines - Toned down on mobile and recruiter mode to prevent visual clutter */}
        {!recruiterMode && (
          <>
            <div 
              className="absolute inset-2 sm:inset-0 rounded-full border border-cyan-500/20 hidden sm:block animate-spin-slow pointer-events-none" 
              style={{ animationDuration: '40s' }} 
            />
            <div 
              className="absolute inset-6 sm:inset-4 rounded-full border border-dashed border-cyan-400/20 hidden sm:block animate-spin-reverse pointer-events-none" 
              style={{ animationDuration: '30s' }} 
            />
          </>
        )}
        
        {/* Floor Pedestal - Calmer, cleaner on mobile */}
        <div className={`absolute bottom-2 w-44 sm:w-64 md:w-72 h-8 sm:h-12 rounded-full blur-lg pointer-events-none ${
          recruiterMode ? 'bg-blue-500/10' : 'bg-cyan-500/15'
        }`} />
        <div className={`absolute bottom-5 sm:bottom-6 w-36 sm:w-48 md:w-56 h-2 rounded-full border ${
          recruiterMode ? 'border-slate-600' : 'border-cyan-400/50 box-glow-cyan'
        }`} />

        {/* Floating Robot Element - Calmer, gentler animation */}
        <motion.div
          animate={{
            y: recruiterMode ? [0, -4, 0] : [0, -8, 0],
          }}
          transition={{
            duration: recruiterMode ? 6 : 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 w-full h-full flex items-center justify-center p-2"
        >
          <img
            src={imgSrc}
            alt={mediaConfig?.alt || 'Cyber Robot Avatar'}
            className={`max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-102 ${
              recruiterMode 
                ? 'drop-shadow-[0_4px_16px_rgba(15,23,42,0.6)]' 
                : 'filter drop-shadow-[0_0_20px_rgba(6,182,212,0.65)]'
            }`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://lh3.googleusercontent.com/d/1z1uqxUYAbUAc0y5HKXJyE9R-43B4vmYb";
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
