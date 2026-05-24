import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VerificationStatus({ title, description, isActive = true, isSuccess = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3.5 items-start p-4 rounded-2xl border bg-dark-950/40 shadow-inner relative group ${
        isActive 
          ? isSuccess 
            ? 'border-cyan-900/60 text-cyan-300' 
            : 'border-rose-900/60 text-rose-300'
          : 'border-white/[0.02] text-dark-400'
      }`}
    >
      {isActive ? (
        isSuccess ? (
          <CheckCircle2 className="w-5.5 h-5.5 text-cyan-400 flex-shrink-0 mt-0.5 animate-pulse-slow" />
        ) : (
          <AlertCircle className="w-5.5 h-5.5 text-rose-500 flex-shrink-0 mt-0.5 animate-pulse" />
        )
      ) : (
        <CheckCircle2 className="w-5.5 h-5.5 text-dark-600 flex-shrink-0 mt-0.5" />
      )}
      <div>
        <h5 className={`text-[10px] font-extrabold uppercase tracking-widest ${isActive ? 'text-white' : 'text-dark-400'}`}>{title}</h5>
        <p className="text-[9px] text-dark-400 mt-1 font-light leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
