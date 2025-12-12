import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AfterglowScreenProps {
  onDismiss: () => void;
}

export function AfterglowScreen({ onDismiss }: AfterglowScreenProps) {
  const [textPhase, setTextPhase] = useState(0);

  useEffect(() => {
    // First text appears immediately
    const timer1 = setTimeout(() => setTextPhase(1), 2000);
    const timer2 = setTimeout(() => setTextPhase(2), 4000);
    
    // Auto dismiss after showing both texts
    const autoDismiss = setTimeout(() => {
      onDismiss();
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(autoDismiss);
    };
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="size-full relative overflow-hidden cursor-pointer"
      onClick={onDismiss}
      onTouchEnd={(e) => {
        e.preventDefault();
        onDismiss();
      }}
    >
      {/* Aurora background animation */}
      <div className="absolute inset-0 bg-black">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(72, 209, 204, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 20%, rgba(72, 209, 204, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(167, 139, 250, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 30% 60%, rgba(96, 165, 250, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(72, 209, 204, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Text content */}
      <div className="relative z-10 size-full flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {textPhase === 0 && (
            <motion.h1
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-white text-center"
            >
              Session Complete
            </motion.h1>
          )}
          
          {textPhase === 1 && (
            <motion.h1
              key="lighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-white text-center"
            >
              Feel lighter?
            </motion.h1>
          )}

          {textPhase === 2 && (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="flex flex-col items-center gap-8"
            >
              {/* Large check mark */}
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(52, 211, 153, 0.4)',
                    '0 0 0 20px rgba(52, 211, 153, 0)',
                    '0 0 0 0 rgba(52, 211, 153, 0)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <svg
                  className="w-20 h-20 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </svg>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/60 text-center"
              >
                Tap anywhere to continue
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
