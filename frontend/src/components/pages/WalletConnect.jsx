import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Activity, Cpu } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';

export default function WalletConnect({ account, connectWallet, disconnectWallet }) {
  const navigate = useNavigate();
  const isMetaMaskInstalled = typeof window.ethereum !== 'undefined';

  const handleBackToDashboard = () => {
    if (account) {
      navigate('/student');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-8 relative">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-radial from-brand-600/10 via-transparent to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* Main Connection Card */}
      <GlassCard hover={false} className="p-8 bg-dark-900/10 border border-white/[0.04] shadow-2xl space-y-8 text-center relative overflow-hidden">
        {/* Top Border glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-500"></div>

        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-brand-950/80 border border-brand-900 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-950/40 animate-pulse-slow">
            <Wallet className="w-8 h-8" />
          </div>
          <h2 className="text-2.5xl font-black text-white tracking-tight">Decentralized Auth</h2>
          <p className="text-xs text-dark-400 leading-relaxed max-w-xs mx-auto font-light">
            Sync your cryptographic signatures to read academic vaults or publish credentials.
          </p>
        </div>

        {/* Status indicator box */}
        <div className="p-4.5 rounded-2xl bg-dark-950/60 border border-white/[0.02] text-xs text-left space-y-3.5 shadow-inner">
          <div className="flex justify-between items-center">
            <span className="text-dark-450 font-bold flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-405" /> Extension State:
            </span>
            {isMetaMaskInstalled ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Detected
              </span>
            ) : (
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Missing
              </span>
            )}
          </div>

          <div className="flex justify-between items-center border-t border-white/[0.03] pt-3">
            <span className="text-dark-450 font-bold flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-405" /> Connection State:
            </span>
            {account ? (
              <span className="text-cyan-400 font-bold font-mono text-[10px]">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            ) : (
              <span className="text-dark-400 font-bold">Disconnected</span>
            )}
          </div>
        </div>

        {/* Main sync button controls */}
        <div className="space-y-4">
          {!account ? (
            <NeonButton 
              onClick={connectWallet} 
              className="w-full py-4 rounded-xl text-[10px] tracking-widest font-black uppercase"
            >
              Sync MetaMask Provider
            </NeonButton>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 bg-emerald-950/30 p-4.5 border border-emerald-900/40 rounded-xl text-[11px] text-left leading-relaxed">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 animate-bounce-slow" />
                <span>Web3 active consensus session established successfully. Welcome to D-AIC Wallet!</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={disconnectWallet}
                  className="w-full py-3.5 rounded-xl bg-dark-900 border border-white/[0.04] text-dark-300 hover:text-white text-[10px] font-bold tracking-wider uppercase transition-all hover:border-rose-900/40 cursor-pointer shadow-md"
                >
                  Disconnect
                </button>
                <NeonButton 
                  onClick={handleBackToDashboard}
                  className="w-full py-3.5 rounded-xl text-[10px] font-black tracking-wider uppercase"
                >
                  Go To Wallet
                </NeonButton>
              </div>
            </div>
          )}

          {!isMetaMaskInstalled && (
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noreferrer"
              className="mt-2 block text-[10px] text-cyan-400 hover:text-cyan-350 font-bold hover:underline transition-colors"
            >
              Download MetaMask Extension <ArrowRight className="w-3 h-3 inline-block" />
            </a>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
