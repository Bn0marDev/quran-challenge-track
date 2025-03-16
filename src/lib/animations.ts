
import { CSSProperties } from 'react';

// Staggered animation for lists
export const staggeredAnimation = (index: number, delay = 0.1): CSSProperties => ({
  opacity: 0,
  transform: 'translateY(10px)',
  animation: `fade-in 0.5s ease forwards, slide-up 0.5s ease forwards`,
  animationDelay: `${index * delay}s`,
});

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

// Button hover animation
export const buttonHoverAnimation = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

// Card hover animation
export const cardHoverAnimation = {
  scale: 1.01,
  y: -5,
  transition: { duration: 0.3 }
};

// Text reveal animation
export const textRevealAnimation = (delay = 0): CSSProperties => ({
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `fade-in 0.8s ease forwards, slide-up 0.8s ease forwards`,
  animationDelay: `${delay}s`,
});
