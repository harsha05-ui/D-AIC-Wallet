import React from 'react';
import { motion } from 'framer-motion';
import { Award, User, Calendar, ExternalLink, QrCode, ShieldCheck, ShieldAlert } from 'lucide-react';
import { getIPFSUrl } from '../../utils/ipfs';
import StatusBadge from './StatusBadge';

export default function CertificateCard({ cert, onQrClick }) {
  const formatDate = (epoch) => {
    return new Date(epoch * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel p-8 rounded-[32px] flex flex-col justify-between h-[360px] relative overflow-hidden border border-white/[0.04] holo-effect ${
        cert.isValid ? 'hover:border-brand-500/40 hover:shadow-brand-500/5' : 'grayscale opacity-60 border-rose-950/30'
      }`}
    >
      {/* Luxury Diploma Border Decoration */}
      <div className={`absolute top-0 left-0 right-0 h-2 ${
        cert.isValid ? 'bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-500 animate-pulse-slow' : 'bg-rose-800'
      }`}></div>

      <div className="space-y-5">
        {/* Badge Header & Hologram */}
        <div className="flex justify-between items-start pt-2">
          <span className="px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider bg-dark-950 border border-white/[0.04] text-brand-300 font-mono shadow-inner">
            ID: #{cert.index + 100}
          </span>
          
          {cert.isValid ? (
            <div className="flex items-center gap-3">
              {/* Interactive Hologram Seal */}
              <div 
                className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-indigo-400 shadow-md border border-white/25 animate-spin-slow"
                title="Decentralized Security Hologram Seal"
              ></div>
              <StatusBadge isValid={true} />
            </div>
          ) : (
            <StatusBadge isValid={false} />
          )}
        </div>

        {/* Course Name & Recipient */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-white line-clamp-2 leading-snug">{cert.course}</h3>
          <p className="text-xs text-dark-300 flex items-center gap-2 mt-1 font-semibold">
            <User className="w-4 h-4 text-brand-400" /> Recipient: {cert.studentName}
          </p>
        </div>

        {/* Ledger Details Box */}
        <div className="grid grid-cols-2 gap-4 bg-dark-950/40 p-4 rounded-2xl border border-white/[0.03] text-xs shadow-inner">
          <div>
            <span className="text-dark-400 block mb-1 font-bold uppercase tracking-wider text-[8px]">University Signature:</span>
            <span className="text-dark-200 font-mono text-[10px]" title={cert.issuer}>
              {cert.issuer.slice(0, 6)}...{cert.issuer.slice(-4)}
            </span>
          </div>
          <div>
            <span className="text-dark-400 block mb-1 font-bold uppercase tracking-wider text-[8px] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-brand-400" /> Issue Timestamp:
            </span>
            <span className="text-dark-200 text-[10px] font-medium">{formatDate(cert.timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <a
          href={getIPFSUrl(cert.ipfsHash)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider bg-dark-900 hover:bg-dark-850 text-dark-200 hover:text-white border border-white/[0.04] transition-all cursor-pointer shadow-md"
        >
          <span>View Asset</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {cert.isValid && onQrClick && (
          <button
            onClick={() => onQrClick(cert)}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-brand-950 to-indigo-950 hover:from-brand-900 hover:to-indigo-900 border border-brand-900 hover:border-brand-700 text-brand-300 hover:text-white transition-all shadow-lg cursor-pointer animate-pulse-slow"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Verify QR</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
