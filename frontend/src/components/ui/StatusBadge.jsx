import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatusBadge({ isValid }) {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
        isValid 
          ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 shadow-sm' 
          : 'text-rose-400 bg-rose-950/40 border border-rose-900/60 shadow-sm'
      }`}
    >
      {isValid ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Active</span>
        </>
      ) : (
        <>
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Revoked</span>
        </>
      )}
    </motion.span>
  );
}
