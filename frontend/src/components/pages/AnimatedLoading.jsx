import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function AnimatedLoading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 bg-[#0B0F1A] flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      {/* Glow Backdrop */}
      <div className="absolute w-[400px] h-[400px] bg-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Cybernetic Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(82, 108, 240, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(82, 108, 240, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative flex flex-col items-center justify-center space-y-6">
        {/* Pulsing visual ring loader */}
        <div className="relative flex items-center justify-center">
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-500/20 border-t-cyan-400"
          />

          {/* Outer ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 rounded-full border border-dashed border-indigo-500/10 border-b-indigo-400 absolute"
          />

          {/* Logo center */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white absolute shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-cyan-400/20"
          >
            <Award className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Text Loader */}
        <div className="text-center space-y-1.5">
          <h2 className="text-sm font-black uppercase tracking-widest text-white leading-none">D-AIC WALLET</h2>
          <span className="text-[9px] font-mono tracking-widest text-cyan-400 animate-pulse block">Decrypting Credential Nodes...</span>
        </div>
      </div>
    </motion.div>
  );
}
