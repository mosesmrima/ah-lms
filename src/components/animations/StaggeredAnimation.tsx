"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggeredAnimationProps {
  children: ReactNode[];
  className?: string;
  delayBetweenItems?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  staggerChildren?: number;
}

export const StaggeredAnimation = ({
  children,
  className = '',
  delayBetweenItems = 0.1,
  direction = 'up',
  distance = 50,
  duration = 0.5,
  staggerChildren = 0.1,
}: StaggeredAnimationProps) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delayBetweenItems,
      },
    },
  };

  const itemVariants = {
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
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredAnimation;
