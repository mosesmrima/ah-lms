"use client";

import React, { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export const AnimateOnScroll = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: AnimateOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Set the initial and animate variants based on the direction
  const getDirectionOffset = (): { x: number; y: number } => {
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

  const offset = getDirectionOffset();

  const variants = {
    hidden: { 
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
