import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressBarProps {
  /** Optional custom height class, defaults to h-[3px] */
  className?: string;
}

/**
 * Animated progress bar at the very top of the viewport
 * tracking scroll depth across the entire page using Framer Motion.
 */
export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className = 'h-[3px]',
}) => {
  // Framer Motion viewport scroll depth tracking
  const { scrollYProgress } = useScroll();

  // Smooth physics spring animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="viewport-scroll-progress"
      className={`fixed top-0 left-0 right-0 origin-left z-[100] pointer-events-none bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)] ${className}`}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
