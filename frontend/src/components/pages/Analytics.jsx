import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Activity, Globe, HardDrive, ShieldCheck, Zap, Compass, RefreshCw } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import StatsCard from '../ui/StatsCard';

export default function Analytics() {
  const [loading, setLoading] = useState(false);
  const [networkLatency, setNetworkLatency] = useState(12);

  const simulateRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setNetworkLatency(Math.floor(Math.random() * 8) + 8);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            Network Telemetry <Activity className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
          </h2>
          <p className="text-dark-400 text-sm mt-1">Real-time stats monitor mapping global consensus nodes, gas efficiency, and distributed IPFS caches.</p>
        </div>

        <button
          onClick={simulateRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-dark-900 border border-white/[0.04] text-dark-300 hover:text-white transition-all disabled:opacity-50 self-start cursor-pointer shadow-md"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Recalibrate Diagnostics
        </button>
      </div>

      {/* Cybernetic Telemetry Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          icon={Globe} 
          value="14,242" 
          label="Active EVM Blocks" 
          subtitle="Consensus synced" 
          colorClass="text-cyan-405 bg-cyan-950/40 border-cyan-900/60" 
        />
        <StatsCard 
          icon={Zap} 
          value={`${networkLatency} ms`} 
          label="Registry Latency" 
          subtitle="Ethers query speed" 
          colorClass="text-cyan-405 bg-cyan-950/40 border-cyan-900/60" 
        />
        <StatsCard 
          icon={ShieldCheck} 
          value="99.98%" 
          label="Consensus Health" 
          subtitle="Node signatures online" 
          colorClass="text-purple-400 bg-purple-950/40 border-purple-900/60" 
        />
        <StatsCard 
          icon={HardDrive} 
          value="24.8 GB" 
          label="Total IPFS Cache" 
          subtitle="Distributed assets pinned" 
          colorClass="text-purple-400 bg-purple-950/40 border-purple-900/60" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Node peer clusters list */}
        <GlassCard hover={false} className="lg:col-span-2 p-8 bg-dark-900/10 border border-white/[0.04] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-4">
            <Compass className="w-5 h-5 text-cyan-405 animate-spin-slow" /> Active Institutional Validators
          </h3>

          <div className="space-y-4">
            {/* Peer Node 1 */}
            <div className="flex justify-between items-center bg-dark-950/50 p-4.5 rounded-2xl border border-white/[0.02] shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <div>
                  <h4 className="text-xs font-bold text-white">MIT Registry Node</h4>
                  <span className="text-[9.5px] text-dark-450 font-mono">0xac0974bec39a17...bf2ff80</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 border border-cyan-900 rounded-md">8 ms</span>
            </div>

            {/* Peer Node 2 */}
            <div className="flex justify-between items-center bg-dark-950/50 p-4.5 rounded-2xl border border-white/[0.02] shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Stanford Registrar Node</h4>
                  <span className="text-[9.5px] text-dark-450 font-mono">0x70997970C51812...7aa29feb</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 border border-cyan-900 rounded-md">11 ms</span>
            </div>

            {/* Peer Node 3 */}
            <div className="flex justify-between items-center bg-dark-950/50 p-4.5 rounded-2xl border border-white/[0.02] shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Harvard Registry Anchor</h4>
                  <span className="text-[9.5px] text-dark-450 font-mono">0x3C44CdDB6a900f...076a4a00</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 border border-cyan-900 rounded-md">14 ms</span>
            </div>
          </div>
        </GlassCard>

        {/* Network Metrics Telemetry */}
        <GlassCard hover={false} className="p-8 bg-dark-900/10 border border-white/[0.04] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-4">
            <BarChart2 className="w-5 h-5 text-cyan-405 animate-pulse-slow" /> Gas Allocation Stats
          </h3>

          <div className="space-y-6 font-semibold text-xs text-dark-300">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>EVM Deployment Signature</span>
                <span className="text-cyan-405">85% Gas Efficient</span>
              </div>
              <div className="h-1.5 w-full bg-dark-950 border border-white/[0.02] rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-cyan-500 to-brand-600 shadow-[0_0_10px_#06b6d4]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span>IPFS Upload Node Cache</span>
                <span className="text-cyan-405">92% Gas Saved</span>
              </div>
              <div className="h-1.5 w-full bg-dark-950 border border-white/[0.02] rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-cyan-500 to-brand-600 shadow-[0_0_10px_#06b6d4]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Solidity Registry Read</span>
                <span className="text-emerald-400 font-bold">100% Free (0 Gas)</span>
              </div>
              <div className="h-1.5 w-full bg-dark-950 border border-white/[0.02] rounded-full overflow-hidden">
                <div className="h-full w-[100%] bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_10px_#10b981]"></div>
              </div>
            </div>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
