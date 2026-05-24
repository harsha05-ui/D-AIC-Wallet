import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Award, GraduationCap, ShieldCheck, Home as HomeIcon, Disc, FileText } from 'lucide-react';
import WalletConnectButton from './ui/WalletConnectButton';

export default function Navbar({ account, connectWallet, disconnectWallet }) {
  const activeStyle = 'bg-gradient-to-r from-brand-950 to-indigo-950 border border-brand-900/60 text-brand-300 shadow-md';
  const inactiveStyle = 'text-dark-300 hover:text-white hover:bg-white/[0.03] border border-transparent';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.05] bg-dark-950/40 backdrop-blur-xl print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/10 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            <Award className="w-6 h-6 animate-pulse-slow" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white leading-none">
              D-AIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">Wallet</span>
            </h1>
            <span className="text-[10px] tracking-widest text-cyan-300/80 font-bold uppercase mt-1 block">Decentralized Trust</span>
          </div>
        </Link>

        {/* Global Navigation Header Links */}
        <nav className="hidden md:flex items-center gap-2 p-1 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-md">
          <NavLink
            to="/"
            className={({ isActive }) => `flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${isActive ? activeStyle : inactiveStyle}`}
          >
            <HomeIcon className="w-4 h-4" /> Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${isActive ? activeStyle : inactiveStyle}`}
          >
            <FileText className="w-4 h-4" /> About Project
          </NavLink>
          <NavLink
            to="/institution"
            className={({ isActive }) => `flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${isActive ? activeStyle : inactiveStyle}`}
          >
            <GraduationCap className="w-4 h-4" /> Institutions
          </NavLink>
          <NavLink
            to="/student"
            className={({ isActive }) => `flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${isActive ? activeStyle : inactiveStyle}`}
          >
            <Award className="w-4 h-4" /> Students
          </NavLink>
          <NavLink
            to="/verify"
            className={({ isActive }) => `flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${isActive ? activeStyle : inactiveStyle}`}
          >
            <ShieldCheck className="w-4 h-4" /> Verifiers
          </NavLink>
        </nav>

        {/* Sync Wallet Button */}
        <div className="flex items-center gap-3">
          <WalletConnectButton 
            account={account} 
            connectWallet={connectWallet} 
            disconnectWallet={disconnectWallet} 
          />
        </div>
      </div>
    </header>
  );
}
