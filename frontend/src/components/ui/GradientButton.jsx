import React from 'react';
import { motion } from 'framer-motion';

export default function GradientButton({ children, onClick, type = 'button', className = '', disabled = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-650 to-brand-700 hover:from-brand-500 hover:via-indigo-600 hover:to-brand-650 text-white font-extrabold tracking-wide text-xs uppercase shadow-lg shadow-brand-500/10 hover:shadow-brand-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </motion.button>
  );
}
