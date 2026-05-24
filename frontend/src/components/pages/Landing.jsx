import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, GraduationCap, ShieldCheck, ArrowRight, Wallet, Lock, Database, Globe, Layers, Cpu, Compass, FileText } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import StatsCard from '../ui/StatsCard';

export default function Landing({ account, connectWallet }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 16 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-24 relative"
    >
      {/* Cinematic Hero */}
      <motion.div variants={itemVariants} className="relative text-center py-16 space-y-6 max-w-4xl mx-auto">
        <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-cyan-300 bg-cyan-950/40 border border-cyan-850/40 uppercase inline-flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
          <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          Futuristic Web3 Academic Identity Ledger
        </span>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none text-white">
          D-AIC <span className="text-gradient">Wallet</span>
        </h1>
        
        <p className="text-lg md:text-xl text-dark-300 max-w-3xl mx-auto font-light leading-relaxed">
          Secure Academic Credentials on Blockchain. 
          The permanent cryptographical standard for university publishes, student ownership, and instant verification.
        </p>

        <div className="pt-8 flex justify-center gap-4">
          {account ? (
            <Link to="/student">
              <NeonButton className="px-8 py-5 text-xs tracking-widest font-black uppercase">
                <Compass className="w-5 h-5" />
                Go To My Wallet Dashboard
              </NeonButton>
            </Link>
          ) : (
            <NeonButton onClick={connectWallet} className="px-8 py-5 text-xs tracking-widest font-black uppercase">
              <Wallet className="w-5 h-5" />
              Sync MetaMask Wallet
            </NeonButton>
          )}

          <Link to="/verify" className="hidden sm:inline-block">
            <NeonButton variant="secondary" className="px-8 py-5 text-xs tracking-widest font-black uppercase">
              <ShieldCheck className="w-5 h-5" />
              Verify Credentials
            </NeonButton>
          </Link>
        </div>
      </motion.div>

      {/* Cybernetic Statistics Row utilizing StatsCard */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto space-y-4">
        <h3 className="text-xs text-dark-400 font-bold uppercase tracking-widest text-center">Live Blockchain Activity Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatsCard 
            icon={Cpu} 
            value="31337" 
            label="Local EVM Chain ID" 
            subtitle="Hardhat Node Server" 
            colorClass="text-cyan-400 bg-cyan-950/40 border-cyan-900/60" 
          />
          <StatsCard 
            icon={Layers} 
            value="0.00s" 
            label="Block Resolution" 
            subtitle="Instant local consensus" 
            colorClass="text-cyan-400 bg-cyan-950/40 border-cyan-900/40" 
          />
          <StatsCard 
            icon={ShieldCheck} 
            value="100%" 
            label="Registry Uptime" 
            subtitle="Validator health: active" 
            colorClass="text-purple-400 bg-purple-950/40 border-purple-900/40" 
          />
          <StatsCard 
            icon={Globe} 
            value="0 Gas" 
            label="Query Overhead" 
            subtitle="Ledger reading free" 
            colorClass="text-purple-400 bg-purple-950/40 border-purple-900/40" 
          />
        </div>
      </motion.div>

      {/* Animated Workflow Roadmap */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">Decentralized Credential Lifecycle</h2>
          <p className="text-xs text-dark-400">Chronological pipeline tracing certificate signatures from campus to company</p>
        </div>

        <GlassCard hover={false} className="p-8 bg-dark-900/10 border border-white/[0.02] shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3 items-center relative">
            
            {/* Step 1 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-14 h-14 rounded-2xl bg-brand-950 border border-brand-900/60 flex items-center justify-center text-cyan-400 mx-auto group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300">
                <GraduationCap className="w-6.5 h-6.5 animate-pulse-slow" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">1. University Signs</h4>
                <p className="text-[9px] text-dark-400 mt-1 font-light leading-relaxed">Campus uploads files and signs with credentials</p>
              </div>
            </div>

            {/* Link 1 */}
            <div className="hidden md:flex justify-center text-dark-500 animate-pulse-slow">
              <ArrowRight className="w-6 h-6 text-cyan-500" />
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-14 h-14 rounded-2xl bg-brand-950 border border-brand-900/60 flex items-center justify-center text-cyan-400 mx-auto group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300">
                <Database className="w-6.5 h-6.5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">2. Pinned on IPFS</h4>
                <p className="text-[9px] text-dark-400 mt-1 font-light leading-relaxed">Content-addressable CIDs generated globally</p>
              </div>
            </div>

            {/* Link 2 */}
            <div className="hidden md:flex justify-center text-dark-500 animate-pulse-slow">
              <ArrowRight className="w-6 h-6 text-cyan-500" />
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-14 h-14 rounded-2xl bg-brand-950 border border-brand-900/60 flex items-center justify-center text-cyan-400 mx-auto group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300">
                <ShieldCheck className="w-6.5 h-6.5 animate-pulse-slow" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">3. Verified & Audited</h4>
                <p className="text-[9px] text-dark-400 mt-1 font-light leading-relaxed">Employer audits signature directly on Ethereum</p>
              </div>
            </div>

          </div>
        </GlassCard>
      </motion.div>

      {/* Main Workspace Portal Navigation Cards */}
      <motion.div variants={itemVariants} className="space-y-8 relative">
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-black text-white tracking-tight">Access Your Console</h2>
          <p className="text-xs text-dark-400 font-light">Select your specific workspace application portal below</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Institution Dashboard Card */}
          <GlassCard className="flex flex-col justify-between h-[390px] group holo-effect p-8">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-950/80 border border-brand-850/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors shadow-inner">
                <GraduationCap className="w-8 h-8 animate-pulse-slow" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-900 px-2.5 py-1 rounded-md inline-block">
                  Authorized Issuers
                </span>
                <h3 className="text-2xl font-black text-white leading-none">University Portal</h3>
              </div>
              <p className="text-xs text-dark-300 leading-relaxed font-light">
                For accredited academic institutions to drag-and-drop academic degree assets, generate cryptographical hashes, and sign smart contract transactions.
              </p>
            </div>
            
            <Link to="/institution">
              <button
                className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-brand-950/80 hover:bg-brand-900 border border-brand-900 hover:border-brand-700 text-cyan-300 hover:text-white font-bold transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Access Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </GlassCard>

          {/* Student Dashboard Card */}
          <GlassCard className="flex flex-col justify-between h-[390px] group holo-effect p-8">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-950/80 border border-brand-850/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors shadow-inner">
                <Award className="w-8 h-8 animate-pulse-slow" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/50 border border-indigo-900 px-2.5 py-1 rounded-md inline-block">
                  Credential Wallets
                </span>
                <h3 className="text-2xl font-black text-white leading-none">Student Dashboard</h3>
              </div>
              <p className="text-xs text-dark-300 leading-relaxed font-light">
                For graduates to connect their decentralized wallet, aggregate all issued credentials in one visual card view, and output secure, scan-ready verification QR codes.
              </p>
            </div>

            <Link to="/student">
              <button
                className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-brand-950/80 hover:bg-brand-900 border border-brand-900 hover:border-brand-700 text-cyan-300 hover:text-white font-bold transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Connect Wallet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </GlassCard>

          {/* Verifier Card */}
          <GlassCard className="flex flex-col justify-between h-[390px] group holo-effect p-8">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-950/80 border border-brand-850/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors shadow-inner">
                <ShieldCheck className="w-8 h-8 animate-pulse-slow" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-2.5 py-1 rounded-md inline-block">
                  Instant Verification
                </span>
                <h3 className="text-2xl font-black text-white leading-none">Auditor Console</h3>
              </div>
              <p className="text-xs text-dark-300 leading-relaxed font-light">
                For employers, companies, and certification boards to query graduate wallet keys, run cryptographic checksum verification chains, and generate printable PDF reports.
              </p>
            </div>

            <Link to="/verify">
              <button
                className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-brand-950/80 hover:bg-brand-900 border border-brand-900 hover:border-brand-700 text-cyan-300 hover:text-white font-bold transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Audit Profiles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </GlassCard>
        </div>
      </motion.div>
    </motion.div>
  );
}
