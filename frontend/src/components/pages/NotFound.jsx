import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Compass, ArrowLeft } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-16 text-center space-y-8 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-radial from-rose-500/10 via-transparent to-transparent rounded-full blur-[80px] pointer-events-none" />

      <GlassCard hover={false} className="p-10 bg-dark-900/10 border border-white/[0.04] shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top decorative danger border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 animate-pulse-slow"></div>

        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-900 flex items-center justify-center text-rose-455 mx-auto animate-bounce-slow shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight leading-none">Block Out of Bounds</h2>
          <span className="text-[10px] font-mono tracking-widest text-rose-405 block uppercase">Error 404: Unanchored Node Coordinate</span>
        </div>

        <p className="text-xs text-dark-400 leading-relaxed font-light px-4">
          The smart contract block parameters or deep link directory you entered does not exist on the D-AIC Identity Ledger.
        </p>

        <div className="pt-4 flex flex-col gap-4">
          <Link to="/">
            <NeonButton className="w-full py-4 rounded-xl text-[10px] tracking-widest font-black uppercase">
              <Compass className="w-4 h-4" /> Return to Main Hub
            </NeonButton>
          </Link>
          
          <Link to="/verify" className="text-xs text-dark-400 hover:text-white transition-colors inline-flex items-center justify-center gap-1.5 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Verification Console
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
