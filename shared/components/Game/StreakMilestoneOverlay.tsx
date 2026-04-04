'use client';

import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star } from 'lucide-react';
import { useHasFinePointer } from '@/shared/hooks/generic/useHasFinePointer';
import { cn } from '@/shared/lib/utils';
import { getRandomMilestoneMessage } from '@/shared/lib/game/streakMilestones';

interface StreakMilestoneOverlayProps {
  milestone: number | null;
  onDismiss: () => void;
}

const layerVariants = {
  hidden: { opacity: 0, x: 120 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.85 },
      opacity: { duration: 0.24 },
    },
  },
  exit: {
    opacity: 0,
    x: -140,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.85 },
      opacity: { duration: 0.2 },
    },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 280,
      damping: 24,
      mass: 0.9,
    },
  },
};

export default function StreakMilestoneOverlay({
  milestone,
  onDismiss,
}: StreakMilestoneOverlayProps) {
  const hasFinePointer = useHasFinePointer();
  const message = useMemo(() => {
    if (!milestone) return '';

    return getRandomMilestoneMessage(milestone);
  }, [milestone]);

  useEffect(() => {
    if (!milestone) return;

    const absorbKeyboardEvent = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      absorbKeyboardEvent(event);
      onDismiss();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      absorbKeyboardEvent(event);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      absorbKeyboardEvent(event);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('keypress', handleKeyPress, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('keypress', handleKeyPress, true);
    };
  }, [milestone, onDismiss]);

  useEffect(() => {
    if (!milestone) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 180);
  }, [milestone]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          key={`streak-${milestone}`}
          variants={layerVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='fixed inset-0 z-[70] flex h-full w-full items-center justify-center bg-(--background-color)'
          onClick={onDismiss}
          role='dialog'
          aria-modal='true'
          aria-label={`${milestone} in a row`}
        >
          <motion.div
            variants={contentVariants}
            initial='hidden'
            animate='visible'
            className='mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-6 text-center select-none'
          >
            <motion.button
              variants={itemVariants}
              className={cn(
                'inline-flex h-24 w-24 items-center justify-center rounded-4xl border-b-16 border-(--secondary-color-accent) bg-(--secondary-color) text-(--background-color) transition-all duration-200',
                'motion-safe:animate-float [--float-distance:-6px]',
              )}
            >
              <Star className='h-14 w-14' strokeWidth={2.5} />
            </motion.button>

            <motion.h2
              variants={itemVariants}
              className='text-4xl font-bold tracking-tighter text-(--main-color) sm:text-5xl'
            >
              {milestone} in a row!
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='max-w-2xl text-xl font-semibold text-(--secondary-color) sm:text-2xl'
            >
              + {message}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className='text-sm text-(--secondary-color)/80 '
            >
              ({hasFinePointer ? 'click' : 'tap'} or press any key to continue)
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
