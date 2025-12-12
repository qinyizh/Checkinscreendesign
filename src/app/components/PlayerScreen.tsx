import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward } from 'lucide-react';

type MoodType = 'heavy' | 'anxious' | 'chaotic';

interface PlayerScreenProps {
  mood: MoodType;
  onComplete: () => void;
}

const moodConfigs = {
  heavy: {
    name: 'The Shake',
    description: '去重',
    color: '#ff6b35',
    secondaryColor: '#f7931e',
    orbType: 'shake',
  },
  anxious: {
    name: 'The Hum',
    description: '共鸣',
    color: '#9d4edd',
    secondaryColor: '#7209b7',
    orbType: 'hum',
  },
  chaotic: {
    name: 'The Rock',
    description: '摇篮',
    color: '#2d6a4f',
    secondaryColor: '#52b788',
    orbType: 'rock',
  },
};

export function PlayerScreen({ mood, onComplete }: PlayerScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [sessionTime, setSessionTime] = useState(0);
  const config = moodConfigs[mood];

  // Session timer - reduced to 20 seconds for testing
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setSessionTime(prev => {
        if (prev >= 20) { // 20 seconds for testing (change to 180 for production)
          setIsPlaying(false);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, onComplete]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="size-full flex flex-col items-center justify-between bg-black p-6 overflow-hidden">
      {/* Top Info */}
      <div className="w-full max-w-2xl pt-8 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white mb-2"
        >
          {config.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-white/60"
        >
          {config.description}
        </motion.p>
        
        {/* Skip button for testing */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="absolute top-8 right-0 flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80
            transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <SkipForward className="w-4 h-4" />
          <span>Skip</span>
        </motion.button>
      </div>

      {/* Central Orb */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          {/* Shake Orb - Jagged, energetic */}
          {config.orbType === 'shake' && (
            <ShakeOrb 
              isPlaying={isPlaying} 
              intensity={intensity}
              color={config.color}
              secondaryColor={config.secondaryColor}
            />
          )}

          {/* Hum Orb - Concentric circles */}
          {config.orbType === 'hum' && (
            <HumOrb 
              isPlaying={isPlaying} 
              intensity={intensity}
              color={config.color}
              secondaryColor={config.secondaryColor}
            />
          )}

          {/* Rock Orb - Soft breathing */}
          {config.orbType === 'rock' && (
            <RockOrb 
              isPlaying={isPlaying} 
              intensity={intensity}
              color={config.color}
              secondaryColor={config.secondaryColor}
            />
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-2xl pb-8">
        {/* Intensity Slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-white/60">Intensity</span>
            <span className="text-white/60">{intensity}%</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer
                bg-white/10 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-6 
                [&::-webkit-slider-thumb]:h-6 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.5)]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-6 
                [&::-moz-range-thumb]:h-6 
                [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.5)]
                [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${config.color} 0%, ${config.color} ${intensity}%, rgba(255,255,255,0.1) ${intensity}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white flex items-center justify-center
              shadow-[0_0_40px_rgba(255,255,255,0.3)]
              focus:outline-none focus:ring-4 focus:ring-white/50"
            style={{
              backgroundColor: isPlaying ? config.color : 'white',
            }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                >
                  <Pause className="w-8 h-8 text-white fill-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                >
                  <Play className="w-8 h-8 ml-1" style={{ color: config.color }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Shake Orb - Jagged and energetic
function ShakeOrb({ isPlaying, intensity, color, secondaryColor }: any) {
  return (
    <div className="relative w-full h-full">
      {/* Core */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${secondaryColor} 50%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
        animate={isPlaying ? {
          scale: [1, 1.2, 0.9, 1.3, 1],
          rotate: [0, 10, -10, 5, 0],
        } : {}}
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      
      {/* Jagged outer ring */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-16 rounded-full"
          style={{
            background: color,
            transformOrigin: 'center',
            x: '-50%',
            y: '-50%',
          }}
          animate={isPlaying ? {
            rotate: i * 30,
            scaleY: [1, 1.5 * (intensity / 100), 1],
            opacity: [0.3, 0.8, 0.3],
          } : {
            rotate: i * 30,
          }}
          transition={{
            duration: 0.3,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

// Hum Orb - Concentric circles expanding
function HumOrb({ isPlaying, intensity, color, secondaryColor }: any) {
  return (
    <div className="relative w-full h-full">
      {/* Core circle */}
      <motion.div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${secondaryColor} 40%, transparent 70%)`,
        }}
        animate={isPlaying ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Expanding rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: color,
          }}
          animate={isPlaying ? {
            scale: [0.5, 2],
            opacity: [0.8, 0],
          } : {
            scale: 0.5,
            opacity: 0,
          }}
          transition={{
            duration: 3 * (intensity / 100),
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Rock Orb - Soft breathing droplet
function RockOrb({ isPlaying, intensity, color, secondaryColor }: any) {
  return (
    <div className="relative w-full h-full">
      {/* Main breathing orb */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${secondaryColor} 50%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={isPlaying ? {
          scale: [1, 1.2 * (intensity / 100), 1],
          opacity: [0.6, 0.9, 0.6],
        } : {}}
        transition={{
          duration: 4,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Soft glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${color}40 60%, transparent 80%)`,
        }}
        animate={isPlaying ? {
          scale: [1.2, 1.4, 1.2],
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: 4,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}