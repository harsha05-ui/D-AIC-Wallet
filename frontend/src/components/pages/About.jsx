import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldAlert, Cpu, Sparkles, HardDrive, Shield } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 16 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-12 relative"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <span className="px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-cyan-300 bg-cyan-950/40 border border-cyan-900/60 shadow-inner inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Project Whitepaper
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          About the <span className="text-gradient">D-AIC Architecture</span>
        </h2>
        <p className="text-xs text-dark-400 max-w-xl mx-auto font-light leading-relaxed">
          Discover the high-fidelity engineering layers securing decentralized academic identities globally.
        </p>
      </motion.div>

      {/* Overview Card */}
      <motion.div variants={itemVariants}>
        <GlassCard hover={false} className="p-8 bg-dark-900/10 border border-white/[0.02] space-y-5 shadow-2xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <Sparkles className="w-5 h-5 text-cyan-400" /> Decentralized Integrity Ledger
          </h3>
          <p className="text-xs text-dark-300 leading-relaxed font-light">
            Conventional academic credential systems are heavily prone to forgery, data loss, and lengthy validation delays. 
            **D-AIC Wallet** resolves these systemic bottlenecks. 
            By writing a SHA-256 cryptographic representation of each graduation record directly to the immutable Ethereum ledger and pinning the diploma files securely across IPFS distributed clusters, we achieve a tamper-proof and zero-third-party credential ecosystem.
          </p>
        </GlassCard>
      </motion.div>

      {/* Technology Spec Columns */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Ethereum Smart Contract */}
        <GlassCard className="p-6 bg-dark-900/10 border border-white/[0.02]">
          <div className="flex gap-4">
            <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-900/60 text-cyan-400 flex-shrink-0 shadow-inner">
              <Cpu className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Solidity Registry Contract</h4>
              <p className="text-xs text-dark-450 leading-relaxed font-light">
                Our active smart contract tracks degree arrays with exact timestamps and authority signatures. Verification resolves instantly in a single gas-free read execution.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* IPFS Distributed Nodes */}
        <GlassCard className="p-6 bg-dark-900/10 border border-white/[0.02]">
          <div className="flex gap-4">
            <div className="p-3 rounded-2xl bg-indigo-950/50 border border-indigo-900/60 text-indigo-400 flex-shrink-0 shadow-inner">
              <HardDrive className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Distributed IPFS Vaults</h4>
              <p className="text-xs text-dark-450 leading-relaxed font-light">
                Credentials are saved on interplanetary file systems, preventing data loss. Content-addressed CIDs ensure documents are uniquely identified and permanently immune to alterations.
              </p>
            </div>
          </div>
        </GlassCard>

      </motion.div>
    </motion.div>
  );
}
