import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Disc, ArrowUpRight, Cpu, Layers, ExternalLink, HardDrive } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import StatsCard from '../ui/StatsCard';

export default function TransactionHistory({ account }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (account) {
      const savedLogs = localStorage.getItem(`daic_issuer_history_${account.toLowerCase()}`);
      if (savedLogs) {
        try {
          setLogs(JSON.parse(savedLogs));
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      // Load fallback mock transactions to ensure a rich portfolio demo out of the box!
      setLogs([
        {
          id: '1',
          student: '0x3C44CdDB6a900fa2b5851275211522d0076a4a00',
          name: 'Alice Johnson',
          course: 'Master of Science in Decentralized Ledger Systems',
          cid: 'QmXoyp1Z4x5Ncd2PZFZ1EKy79D2A18DGAF8H2D8S8A1L2S',
          tx: '0x99538a7c29be17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
          date: '5/24/2026',
          gasUsed: '124,532',
          block: '14,230'
        },
        {
          id: '2',
          student: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
          name: 'Bob Smith',
          course: 'Bachelor of Computer Engineering (Cryptography Focus)',
          cid: 'QmT5Ncd2PZFZ1EKy79D2A18DGAF8H2D8S8A1L2SQmXoyp1Z',
          tx: '0xfa596d6196494727eB191811B377b3348ffA596d61964943C44CdDB6a900fa2',
          date: '5/23/2026',
          gasUsed: '124,532',
          block: '14,215'
        }
      ]);
    }
  }, [account]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          Ledger Explorer <History className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
        </h2>
        <p className="text-dark-400 text-sm mt-1">Audit the chronological ledger entries, block coordinates, and cryptographic proofs pinned on Ethereum.</p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          icon={Layers} 
          value={logs.length} 
          label="Total Signed Blocks" 
          subtitle="Anchored qualifications" 
          colorClass="text-cyan-400 bg-cyan-950/40 border-cyan-900/60" 
        />
        <StatsCard 
          icon={Cpu} 
          value="124.5k" 
          label="Avg Gas Consumption" 
          subtitle="Optimized Solidity writing" 
          colorClass="text-cyan-400 bg-cyan-950/40 border-cyan-900/60" 
        />
        <StatsCard 
          icon={HardDrive} 
          value="IPFS Pinned" 
          label="Storage Protocol" 
          subtitle="Distributed content-addressed" 
          colorClass="text-purple-400 bg-purple-950/40 border-purple-900/60" 
        />
      </div>

      {/* Transaction Table */}
      <GlassCard hover={false} className="bg-dark-900/10 border border-white/[0.02] p-8">
        <div className="flex justify-between items-center border-b border-white/[0.04] pb-4 mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Disc className="w-5 h-5 text-cyan-400 animate-spin-slow" /> Live Ledger Transaction Records
          </h3>
          <span className="text-[9px] font-black uppercase bg-cyan-950 px-3 py-1 border border-cyan-900 text-cyan-300 rounded-full tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            Etherscan Local Host
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="py-12 text-center text-dark-500 font-light text-xs">
            No smart contract records registered in this session.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.03] text-dark-400 font-bold uppercase tracking-wider text-[9px]">
                  <th className="pb-3 pr-4">Tx Hash</th>
                  <th className="pb-3 pr-4">Recipient Graduate</th>
                  <th className="pb-3 pr-4">Qualifying Award</th>
                  <th className="pb-3 pr-4">Block Position</th>
                  <th className="pb-3 pr-4">Gas Burned</th>
                  <th className="pb-3 text-right">Anchor Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {logs.map((log, index) => (
                  <tr key={log.id || index} className="text-dark-200 hover:text-white transition-colors">
                    <td className="py-4 pr-4 font-mono text-cyan-400 text-[10px] max-w-[130px] truncate" title={log.tx}>
                      {log.tx}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="font-semibold text-white">{log.name}</span> <br />
                      <span className="text-[10px] text-dark-450 font-mono">{log.student}</span>
                    </td>
                    <td className="py-4 pr-4 max-w-[200px] truncate font-medium text-dark-200" title={log.course}>
                      {log.course}
                    </td>
                    <td className="py-4 pr-4 font-mono font-medium text-dark-350">
                      {log.block || '14,242'}
                    </td>
                    <td className="py-4 pr-4 font-mono font-semibold text-emerald-400">
                      {log.gasUsed || '124,532'}
                    </td>
                    <td className="py-4 text-right font-medium text-dark-350">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
