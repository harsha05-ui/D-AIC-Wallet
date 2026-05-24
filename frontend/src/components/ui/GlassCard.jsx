import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', delay = 0, hover = true }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: delay }
    }
  };

  const hoverAnimation = hover ? {
    y: -5,
    borderColor: 'rgba(82, 108, 240, 0.3)',
    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(82, 108, 240, 0.15)',
    transition: { duration: 0.3, ease: 'easeOut' }
  } : {};

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover={hoverAnimation}
      variants={cardVariants}
      className={`glass-panel p-6 rounded-[28px] relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
