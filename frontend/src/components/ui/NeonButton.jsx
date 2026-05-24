import React from 'react';
import { motion } from 'framer-motion';

export default function NeonButton({ children, onClick, type = 'button', className = '', disabled = false, variant = 'primary' }) {
  // Variations for a tech/holographic startup visual feel
  const styleVariants = {
    primary: 'bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-650 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] border border-cyan-400/20',
    secondary: 'bg-dark-900/80 hover:bg-dark-850 text-brand-300 border border-brand-900/60 hover:border-brand-500/40 shadow-inner',
    danger: 'bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-[0_0_20px_rgba(244,63,94,0.25)] hover:shadow-[0_0_30px_rgba(244,63,94,0.45)] border border-rose-500/20'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 ${styleVariants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
