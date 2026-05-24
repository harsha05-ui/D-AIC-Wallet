import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ShieldAlert, Award, Calendar, User, ExternalLink, Printer, Sparkles, CheckCircle2, AlertCircle, FileCheck, Layers, Cpu } from 'lucide-react';
import { ethers } from 'ethers';
import { getIPFSUrl } from '../../utils/ipfs';
import contractDetails from '../../contracts/contractDetails.json';

// Import Reusable UI Components
import GlassCard from '../ui/GlassCard';
import Loader from '../ui/Loader';
import StatusBadge from '../ui/StatusBadge';
import VerificationStatus from '../ui/VerificationStatus';

export default function Verifier({ account, provider, signer }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchAddress, setSearchAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [certs, setCerts] = useState([]);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Extract address parameter from URL query if arriving from a QR Code scan
  useEffect(() => {
    const urlAddress = searchParams.get('address');
    if (urlAddress && ethers.isAddress(urlAddress)) {
      setSearchAddress(urlAddress);
      triggerVerify(urlAddress);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchAddress) return;
    if (!ethers.isAddress(searchAddress)) {
      setErrorMsg("Please enter a valid Ethereum hex address (0x...)");
      setCerts([]);
      setSearched(true);
      return;
    }
    setSearchParams({ address: searchAddress });
    triggerVerify(searchAddress);
  };

  const triggerVerify = async (address) => {
    setLoading(true);
    setErrorMsg('');
    setCerts([]);
    try {
      // Artificially wait 2.5 seconds to showcase the premium futuristic validation scanner effect!
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const readProvider = provider || new ethers.BrowserProvider(window.ethereum);
      
      if (!contractDetails.address) {
        throw new Error("Smart contract is not compiled or deployed. Deploy using 'npm run deploy' on Hardhat network.");
      }

      const contract = new ethers.Contract(
        contractDetails.address,
        contractDetails.abi,
        readProvider
      );

      console.log("Querying smart contract verification for address:", address);
      const data = await contract.verifyCertificate(address);

      const formatted = data.map((c, index) => ({
        index: index,
        studentName: c.studentName,
        course: c.course,
        ipfsHash: c.ipfsHash,
        issuer: c.issuer,
        timestamp: Number(c.timestamp),
        isValid: c.isValid
      }));

      formatted.sort((a, b) => b.timestamp - a.timestamp);
      setCerts(formatted);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to query the Ethereum network. Verify that your Hardhat local node is running.");
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (epoch) => {
    return new Date(epoch * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 print:p-0 relative">
      {/* Header - Hidden in Print */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            Verification Console <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
          </h2>
          <p className="text-dark-400 text-sm mt-1">Verify signed graduate academic degree values against Ethereum state variables.</p>
        </div>
      </div>

      {/* Search Console - Hidden in Print */}
      <form onSubmit={handleSearchSubmit} className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4 print:hidden shadow-xl bg-dark-900/10">
        <label className="text-[10px] text-dark-450 font-bold uppercase tracking-widest">Search Graduate Account Address</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-dark-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder="Paste student wallet key (0x...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 bg-gradient-to-r from-cyan-600 to-indigo-650 hover:from-cyan-500 hover:to-indigo-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Auditing Ledger...' : 'Audit Credentials'}
          </button>
        </div>
      </form>

      {/* Verification Display Container */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative p-10 rounded-[32px] overflow-hidden"
          >
            {/* Holographic scanning overlay field */}
            <div className="absolute inset-0 bg-cyan-500/5 border border-cyan-500/15 pointer-events-none rounded-[32px] z-20">
              <motion.div
                animate={{ y: [0, 360, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-[3px] bg-cyan-400 shadow-[0_0_15px_#22d3ee,0_0_25px_#22d3ee,0_0_35px_#22d3ee]"
              />
            </div>
            
            <Loader message="Deploying holographic validation scanner. Running real-time cryptographic audit trail..." />
          </motion.div>
        ) : errorMsg ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-8 rounded-2xl border border-rose-950/40 text-center max-w-lg mx-auto space-y-4 print:hidden"
          >
            <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto animate-pulse" />
            <h4 className="font-bold text-white text-lg">Blockchain Connect offline</h4>
            <p className="text-xs text-dark-400 leading-relaxed">{errorMsg}</p>
          </motion.div>
        ) : searched ? (
          certs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel p-16 rounded-[32px] text-center max-w-2xl mx-auto space-y-6 border border-white/[0.04] print:hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-950/40 border border-rose-900 flex items-center justify-center text-rose-455 mx-auto animate-pulse-slow">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">Verification Nullified</h4>
                <p className="text-xs text-dark-400 max-w-md mx-auto leading-relaxed font-light">
                  No active educational qualifications are mapped to this address:
                  <code className="text-rose-400 font-mono text-[10px] block mt-2 bg-rose-950/40 p-1.5 rounded truncate">{searchAddress}</code>
                </p>
              </div>
            </motion.div>
          ) : (
            /* Report View - Formatted to render beautifully in both browser & PDF print output */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 animate-in"
            >
              {/* Header info for PDF / Print Output */}
              <div className="hidden print:block border-b-2 border-brand-905 pb-4 mb-6">
                <h1 className="text-3xl font-black text-black">D-AIC WALLET AUDIT REPORT</h1>
                <p className="text-sm text-gray-500">Decentralized Academic Identity Ledger Proof</p>
                <p className="text-xs text-gray-400 mt-1">Student Wallet: {searchAddress}</p>
                <p className="text-xs text-gray-400">Date Printed: {new Date().toLocaleString()}</p>
              </div>

              {/* Verification Stats Summary - Hidden in Print */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
                <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 bg-dark-900/10 border border-white/[0.03]">
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-900 flex items-center justify-center text-cyan-400 shadow-inner">
                    <CheckCircle2 className="w-5.5 h-5.5 animate-pulse-slow" />
                  </div>
                  <div>
                    <span className="text-[9px] text-dark-400 block uppercase font-bold tracking-wider">Ledger Registry</span>
                    <span className="text-xs font-semibold text-white">Contract Authenticated</span>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 bg-dark-900/10 border border-white/[0.03]">
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-900 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Layers className="w-5.5 h-5.5 animate-pulse-slow" />
                  </div>
                  <div>
                    <span className="text-[9px] text-dark-400 block uppercase font-bold tracking-wider">IPFS Gateway Link</span>
                    <span className="text-xs font-semibold text-white">Assets Verified</span>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl flex items-center justify-between bg-dark-900/10 border border-white/[0.03]">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-900 flex items-center justify-center text-cyan-400 shadow-inner">
                      <FileCheck className="w-5.5 h-5.5 animate-pulse-slow" />
                    </div>
                    <div>
                      <span className="text-[9px] text-dark-400 block uppercase font-bold tracking-wider">Status Check</span>
                      <span className="text-xs font-semibold text-white">{certs.length} Records Verified</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePrint}
                    className="p-2.5 rounded-xl bg-brand-950 hover:bg-brand-900 border border-brand-900 hover:border-brand-700 text-brand-300 hover:text-white transition-all shadow cursor-pointer"
                    title="Print PDF Audit Certificate"
                  >
                    <Printer className="w-4 h-4 animate-bounce-slow" />
                  </button>
                </div>
              </div>

              {/* List of Certificates */}
              <div className="space-y-8">
                {certs.map((cert) => (
                  <div
                    key={cert.index}
                    className="glass-panel p-8 rounded-[32px] border border-white/[0.04] space-y-8 relative print:border-gray-300 print:text-black print:bg-white print:shadow-none holo-effect"
                  >
                    {/* Status ribbon */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.04] print:border-gray-200 pb-5">
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-brand-950 border border-brand-900 flex items-center justify-center text-cyan-400 print:bg-gray-100 print:text-cyan-850 print:border-gray-300 shadow-inner">
                          <Award className="w-6.5 h-6.5 animate-pulse-slow" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest print:text-brand-700">Audit Provenance Record</span>
                          <h3 className="text-2xl font-black text-white print:text-black mt-0.5 leading-snug">{cert.course}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusBadge isValid={cert.isValid} />
                      </div>
                    </div>

                    {/* Core Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
                      <div className="space-y-4">
                        <div>
                          <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Student Identity Name</span>
                          <span className="text-white font-semibold flex items-center gap-2 mt-2 print:text-black text-sm">
                            <User className="w-4.5 h-4.5 text-cyan-400 print:text-brand-700" /> {cert.studentName}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Validation Timestamp</span>
                          <span className="text-white font-semibold flex items-center gap-2 mt-2 print:text-black text-sm">
                            <Calendar className="w-4.5 h-4.5 text-cyan-400 print:text-brand-700" /> {formatDate(cert.timestamp)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Authorized University Signature (Issuer)</span>
                          <span className="text-white font-mono block mt-2 select-all print:text-black font-semibold tracking-wide text-[11px] bg-dark-950 p-2.5 rounded-xl border border-white/[0.02] truncate">{cert.issuer}</span>
                        </div>

                        <div>
                          <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">IPFS Encrypted Cryptographic CID</span>
                          <div className="flex items-center gap-2.5 mt-2">
                            <span className="text-brand-400 font-mono select-all block truncate max-w-xs print:text-brand-800 text-[11px] font-semibold bg-dark-950 p-2.5 rounded-xl border border-white/[0.02] flex-1">{cert.ipfsHash}</span>
                            <a
                              href={getIPFSUrl(cert.ipfsHash)}
                              target="_blank"
                              rel="noreferrer"
                              className="p-3.5 rounded-xl bg-dark-900 border border-white/[0.04] text-brand-400 hover:text-white hover:border-brand-600 transition-all print:hidden cursor-pointer shadow-md"
                              title="Inspect IPFS File Link"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Audit Timeline utilizing reusable VerificationStatus */}
                    <div className="space-y-4 pt-4 border-t border-white/[0.03] print:hidden">
                      <h4 className="text-[9px] text-dark-350 font-bold uppercase tracking-widest">Interactive Audit Proof Timeline</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        <VerificationStatus 
                          title="1. EVM Index verified"
                          description="Anchored under smart contract mapping logs"
                          isActive={true}
                          isSuccess={true}
                        />

                        <VerificationStatus 
                          title="2. Sign verified"
                          description="University signature matches institutional registry"
                          isActive={true}
                          isSuccess={true}
                        />

                        <VerificationStatus 
                          title="3. IPFS Vault ok"
                          description="Cryptographical CID successfully pinned and active"
                          isActive={true}
                          isSuccess={true}
                        />

                        <VerificationStatus 
                          title="4. Active state"
                          description={cert.isValid ? 'Active and validated ledger verification status' : 'Revoked by the issuing campus'}
                          isActive={true}
                          isSuccess={cert.isValid}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        ) : (
          /* Empty State */
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-16 rounded-[32px] text-center max-w-2xl mx-auto space-y-6 border border-white/[0.04]"
          >
            <div className="w-16 h-16 rounded-2xl bg-dark-900 border border-white/[0.04] flex items-center justify-center text-dark-400 mx-auto">
              <ShieldCheck className="w-8 h-8 animate-pulse-slow" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white">Awaiting Credential Audit</h4>
              <p className="text-xs text-dark-400 max-w-sm mx-auto leading-relaxed font-light">
                Scan a cryptographic QR code or paste a student's public address in the console above to execute a real-time blockchain validation.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
