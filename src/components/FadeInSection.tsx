import React, { useEffect, useState } from 'react';
import { motion, type TargetAndTransition } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  id?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 32,
  threshold = 0.08,
  rootMargin = '0px 0px -50px 0px',
  id,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Compute directional offsets
  const getOffset = () => {
    if (prefersReducedMotion || direction === 'none') return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: distance };
    }
  };

  const offset = getOffset();

  const initialValues: TargetAndTransition = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x, y: offset.y };

  const animateValues: TargetAndTransition = isVisible
    ? { opacity: 1, x: 0, y: 0 }
    : initialValues;

  return (
    <div ref={ref} id={id} className={`w-full ${className}`}>
      <motion.div
        initial={initialValues}
        animate={animateValues}
        transition={{
          duration: prefersReducedMotion ? 0.3 : duration,
          delay: prefersReducedMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a natural deceleration
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
