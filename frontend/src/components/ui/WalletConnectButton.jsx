import React from 'react';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletConnectButton({ account, connectWallet, disconnectWallet }) {
  if (account) {
    return (
      <div className="flex items-center gap-2 bg-dark-900/60 border border-white/[0.05] pl-3.5 pr-2.5 py-2 rounded-xl text-xs font-semibold text-dark-200 shadow-inner">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative flex">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        </span>
        <span className="font-mono text-dark-300 tracking-wide">{account.slice(0, 6)}...{account.slice(-4)}</span>
        <button 
          onClick={disconnectWallet}
          className="ml-3 pl-3 border-l border-dark-800 text-dark-400 hover:text-rose-400 transition-colors font-bold uppercase text-[10px]"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={connectWallet}
      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-brand-500/10 hover:shadow-brand-500/25 hover:scale-[1.02] transition-all cursor-pointer"
    >
      <Wallet className="w-4 h-4" />
      Sync Wallet
    </motion.button>
  );
}
