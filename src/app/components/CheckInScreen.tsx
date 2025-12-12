import { motion } from 'motion/react';

type MoodType = 'heavy' | 'anxious' | 'chaotic';

interface CheckInScreenProps {
  onSelectMood: (mood: MoodType) => void;
}

export function CheckInScreen({ onSelectMood }: CheckInScreenProps) {
  const moods = [
    {
      id: 'heavy' as MoodType,
      label: 'Heavy',
      description: '沉重 / 冻结',
      gradient: 'from-gray-800 via-gray-700 to-red-800',
      emoji: '🪨',
    },
    {
      id: 'anxious' as MoodType,
      label: 'Anxious',
      description: '焦虑 / 紧绷',
      gradient: 'from-blue-900 via-blue-800 to-purple-700',
      emoji: '🔥',
    },
    {
      id: 'chaotic' as MoodType,
      label: 'Chaotic',
      description: '混乱 / 思绪多',
      gradient: 'from-black via-gray-900 to-emerald-900',
      emoji: '🌪️',
    },
  ];

  return (
    <div className="size-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 p-6">
      {/* Title */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-center text-white">
          How is your body feeling?
        </h1>
      </div>

      {/* Cards Container - takes up ~80% of remaining space */}
      <div className="flex flex-col gap-4 md:gap-6 w-full max-w-2xl flex-1 max-h-[80vh]">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            className={`
              relative flex-1 rounded-3xl overflow-hidden
              bg-gradient-to-br ${mood.gradient}
              shadow-2xl
              focus:outline-none focus:ring-4 focus:ring-white/30
              transition-shadow duration-300
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17,
            }}
            onClick={() => onSelectMood(mood.id)}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 md:p-12">
              <div className="mb-4">
                {mood.emoji}
              </div>
              <h2 className="text-white mb-2">
                {mood.label}
              </h2>
              <p className="text-white/70">
                {mood.description}
              </p>
            </div>

            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  );
}
