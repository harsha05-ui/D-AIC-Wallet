import React from 'react';
import GlassCard from './GlassCard';

export default function StatsCard({ icon: Icon, value, label, subtitle, colorClass = 'text-cyan-400 bg-cyan-950/40 border-cyan-900/60' }) {
  return (
    <GlassCard hover={false} className="p-6 bg-dark-900/10 border border-white/[0.02] flex items-center gap-5 shadow-inner">
      <div className={`p-4 rounded-2xl border flex-shrink-0 shadow-md ${colorClass}`}>
        <Icon className="w-6 h-6 animate-pulse-slow" />
      </div>
      <div className="space-y-1">
        <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest leading-none">{label}</span>
        <span className="text-3xl font-black text-white font-mono tracking-wide mt-1 block leading-none">{value}</span>
        {subtitle && (
          <span className="text-[10px] text-dark-450 block font-medium leading-none mt-1">{subtitle}</span>
        )}
      </div>
    </GlassCard>
  );
}
