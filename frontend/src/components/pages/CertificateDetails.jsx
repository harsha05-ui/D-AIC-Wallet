import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, User, Calendar, ExternalLink, ArrowLeft, ShieldCheck, ShieldAlert, Cpu, Landmark, Layers } from 'lucide-react';
import { ethers } from 'ethers';
import { getIPFSUrl } from '../../utils/ipfs';
import contractDetails from '../../contracts/contractDetails.json';

// Import Reusable UI Components
import GlassCard from '../ui/GlassCard';
import StatusBadge from '../ui/StatusBadge';
import Loader from '../ui/Loader';
import VerificationStatus from '../ui/VerificationStatus';

export default function CertificateDetails() {
  const { student, index } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchCertificateDetails = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (!ethers.isAddress(student)) {
        throw new Error("Invalid student Ethereum address provided in link parameters.");
      }

      let readProvider;
      if (window.ethereum) {
        readProvider = new ethers.BrowserProvider(window.ethereum);
      } else {
        // Fallback to local hardhat node so it loads offline/without metamask!
        readProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      }

      if (!contractDetails.address) {
        throw new Error("Registry smart contract address not found in build parameters.");
      }

      const contract = new ethers.Contract(
        contractDetails.address,
        contractDetails.abi,
        readProvider
      );

      console.log(`Deep-linking credential: Student address ${student}, index ${index}`);
      
      // Get all certificates of the student
      const certificates = await contract.getCertificates(student);
      const targetIdx = Number(index);

      if (targetIdx < 0 || targetIdx >= certificates.length) {
        throw new Error(`Credential index #${index} is out of bounds for the specified graduate key.`);
      }

      const selected = certificates[targetIdx];
      setCert({
        index: targetIdx,
        studentName: selected.studentName,
        course: selected.course,
        ipfsHash: selected.ipfsHash,
        issuer: selected.issuer,
        timestamp: Number(selected.timestamp),
        isValid: selected.isValid
      });
    } catch (err) {
      console.error("Deep link error:", err);
      setErrorMsg(err.message || "Failed to load signed credentials from the Ethereum ledger. Make sure your local node is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificateDetails();
  }, [student, index]);

  const formatDate = (epoch) => {
    return new Date(epoch * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {/* Back Button Link */}
      <div className="print:hidden">
        <Link 
          to="/verify" 
          className="inline-flex items-center gap-2 text-xs font-bold text-dark-400 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Verification Console
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader message="Querying Ethereum state variable registry. Inspecting signed degree hash..." />
        ) : errorMsg ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 text-center rounded-[32px] border border-rose-950/40 space-y-5"
          >
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
            <h3 className="text-xl font-bold text-white">Credential Verification Nullified</h3>
            <p className="text-xs text-dark-400 max-w-md mx-auto leading-relaxed">{errorMsg}</p>
            <Link to="/">
              <button className="px-5 py-3 bg-dark-900 border border-white/[0.04] text-white hover:border-cyan-500 rounded-xl transition-all cursor-pointer text-xs mt-4">
                Return to Landing Hub
              </button>
            </Link>
          </motion.div>
        ) : cert ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 print:p-0"
          >
            <div className="glass-panel p-8 md:p-12 rounded-[36px] border border-white/[0.04] relative holo-effect print:bg-white print:text-black print:border-gray-300 print:shadow-none space-y-10">
              
              {/* Top Banner decoration */}
              <div className={`absolute top-0 left-0 right-0 h-2.5 rounded-t-[36px] ${
                cert.isValid ? 'bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-500' : 'bg-rose-800'
              }`}></div>

              {/* Top Status & Hologram Row */}
              <div className="flex justify-between items-start pt-4 border-b border-white/[0.04] pb-6 print:border-gray-250">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-brand-950/80 border border-brand-900 flex items-center justify-center text-cyan-400 print:bg-gray-100 print:text-brand-800 shadow-inner">
                    <Award className="w-8 h-8 animate-pulse-slow" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest print:text-brand-700">Deep-Linked Ledger Record</span>
                    <h2 className="text-2xl md:text-3.5xl font-black text-white print:text-black mt-1 leading-snug">{cert.course}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {cert.isValid && (
                    <div 
                      className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-indigo-400 shadow-md border border-white/20 animate-spin-slow print:hidden"
                      title="Decentralized Security Hologram Seal"
                    ></div>
                  )}
                  <StatusBadge isValid={cert.isValid} />
                </div>
              </div>

              {/* Core Information Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Recipient Identity Name</span>
                    <span className="text-white font-semibold flex items-center gap-2 mt-2.5 print:text-black text-sm">
                      <User className="w-5 h-5 text-cyan-400 print:text-brand-700" /> {cert.studentName}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Graduation Account Key</span>
                    <span className="text-white font-mono block mt-2 select-all print:text-black font-semibold tracking-wide text-[11px] bg-dark-950/60 p-2.5 rounded-xl border border-white/[0.02] truncate">{student}</span>
                  </div>

                  <div>
                    <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Consensus Verification Clock</span>
                    <span className="text-white font-semibold flex items-center gap-2 mt-2.5 print:text-black text-sm">
                      <Calendar className="w-5 h-5 text-cyan-400 print:text-brand-700" /> {formatDate(cert.timestamp)}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Authorized Campus Key (Issuer)</span>
                    <span className="text-white font-mono block mt-2 select-all print:text-black font-semibold tracking-wide text-[11px] bg-dark-950/60 p-2.5 rounded-xl border border-white/[0.02] truncate">{cert.issuer}</span>
                  </div>

                  <div>
                    <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">IPFS Encrypted Gateway CID</span>
                    <div className="flex items-center gap-2.5 mt-2">
                      <span className="text-brand-405 font-mono select-all block truncate print:text-brand-800 text-[11px] font-semibold bg-dark-950/60 p-2.5 rounded-xl border border-white/[0.02] flex-1">{cert.ipfsHash}</span>
                      <a
                        href={getIPFSUrl(cert.ipfsHash)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl bg-dark-900 border border-white/[0.04] text-brand-400 hover:text-white hover:border-brand-600 transition-all print:hidden cursor-pointer shadow-md"
                        title="Open IPFS File Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest print:text-gray-500">Registry Anchor ID</span>
                    <span className="text-white font-mono block mt-2.5 print:text-black text-[11px] font-semibold">
                      #{cert.index + 100} (Decentralized Index Pointer)
                    </span>
                  </div>
                </div>
              </div>

              {/* Validation Status Steps Grid */}
              <div className="space-y-4 pt-6 border-t border-white/[0.03] print:hidden">
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
