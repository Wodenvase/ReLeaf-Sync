import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className, 
  delay = 0,
  hover = true 
}) => {
  return (
    <motion.div
      className={clsx(
        'glass-card rounded-2xl p-6',
        hover && 'card-hover',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5 } : undefined}
    >
      {children}
    </motion.div>
  );
};