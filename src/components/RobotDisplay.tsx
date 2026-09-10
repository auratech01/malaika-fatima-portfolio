import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { defaultPortfolioData } from '../data';

interface RobotDisplayProps {
  mediaConfig?: typeof defaultPortfolioData.robotMedia;
}

export const RobotDisplay: React.FC<RobotDisplayProps> = ({ mediaConfig = defaultPortfolioData.robotMedia }) => {
  const [imgSrc, setImgSrc] = useState<string>(mediaConfig?.imageUrl || '/images/robot_avatar.png');

  useEffect(() => {
    if (!mediaConfig?.imageUrl) return;

    // Check if image loads cleanly, fallback to direct path or Google Drive link
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
    <div className="relative flex flex-col items-center justify-center my-6 group">
      {/* HUD Frame Container around Robot */}
      <div className="relative w-80 h-80 sm:w-[26rem] sm:h-[26rem] md:w-[32rem] md:h-[32rem] flex items-center justify-center">
        
        {/* Outer Circular HUD Orbit Lines */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }} />
        <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/30 animate-spin-reverse pointer-events-none" style={{ animationDuration: '20s' }} />
        
        {/* Cyan Glowing Floor Pedestal */}
        <div className="absolute bottom-2 w-56 sm:w-72 md:w-80 h-12 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
        <div className="absolute bottom-6 w-44 sm:w-56 md:w-64 h-2.5 rounded-full border border-cyan-400/60 box-glow-cyan" />

        {/* Floating Robot Element */}
        <motion.div
          animate={{
            y: [0, -16, 0],
            rotate: [0, 1, -1, 0]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 w-full h-full flex items-center justify-center p-2"
        >
          <img
            src={imgSrc}
            alt={mediaConfig?.alt || 'Cyber Robot Avatar'}
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_30px_rgba(6,182,212,0.85)] transition-transform duration-300 hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Direct fallback if needed
              e.currentTarget.src = "https://lh3.googleusercontent.com/d/1z1uqxUYAbUAc0y5HKXJyE9R-43B4vmYb";
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
