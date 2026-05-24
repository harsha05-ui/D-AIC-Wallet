import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Wallet, Calendar, User, ExternalLink, QrCode, ShieldCheck, ShieldAlert, Sparkles, X, RefreshCw, Layers, Search, Filter, Cpu, BadgeCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { ethers } from 'ethers';
import { getIPFSUrl } from '../../utils/ipfs';
import contractDetails from '../../contracts/contractDetails.json';

// Import Reusable UI Components
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import Sidebar from '../Sidebar';
import Loader from '../ui/Loader';
import CertificateCard from '../ui/CertificateCard';

export default function Student({ account, provider, signer, connectWallet }) {
  // Sidebar Navigation active item
  const [activeTab, setActiveTab] = useState('overview'); // overview, credentials

  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null); // For QR code modal
  const [errorMsg, setErrorMsg] = useState('');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, valid, revoked

  const sidebarItems = [
    { id: 'overview', label: 'Wallet Profile', icon: WalletIcon },
    { id: 'credentials', label: 'My Diplomas', icon: AwardIcon }
  ];

  function WalletIcon(props) {
    return <Wallet {...props} />;
  }

  function AwardIcon(props) {
    return <Award {...props} />;
  }

  const fetchCertificates = async () => {
    if (!account || !contractDetails.address) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const contract = new ethers.Contract(
        contractDetails.address,
        contractDetails.abi,
        signer || provider
      );

      console.log("Fetching certificates for address:", account);
      const data = await contract.getCertificates(account);
      
      const formattedCerts = data.map((c, index) => ({
        index: index,
        studentName: c.studentName,
        course: c.course,
        ipfsHash: c.ipfsHash,
        issuer: c.issuer,
        timestamp: Number(c.timestamp),
        isValid: c.isValid
      }));

      formattedCerts.sort((a, b) => b.timestamp - a.timestamp);
      setCerts(formattedCerts);
    } catch (err) {
      console.error("Error fetching certificates:", err);
      setErrorMsg("Failed to read certificates from Ethereum network. Make sure your local node is running and contracts are deployed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      fetchCertificates();
    }
  }, [account]);

  const getVerificationLink = () => {
    return `${window.location.origin}/verify?address=${account}`;
  };

  // Filter and search logic
  const filteredCerts = certs.filter((cert) => {
    const matchesSearch = 
      cert.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'valid' && cert.isValid) ||
      (statusFilter === 'revoked' && !cert.isValid);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            Student Vault <Award className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
          </h2>
          <p className="text-dark-400 text-sm mt-1">Manage and audit your cryptographically signed educational credentials.</p>
        </div>

        {account && activeTab === 'credentials' && (
          <button
            onClick={fetchCertificates}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-dark-900 border border-white/[0.04] text-dark-300 hover:text-white transition-all disabled:opacity-50 self-start cursor-pointer shadow-md"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Wallet Ledger
          </button>
        )}
      </div>

      {/* Main SaaS Layout with Sidebar */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sidebar Nav */}
        <Sidebar 
          items={sidebarItems} 
          activeItem={activeTab} 
          setActiveItem={setActiveTab} 
        />

        {/* Dashboard Panels */}
        <div className="flex-grow w-full">
          
          {!account ? (
            <GlassCard hover={false} className="p-16 rounded-[32px] text-center space-y-6 max-w-xl mx-auto border border-white/[0.04] bg-dark-900/10">
              <div className="w-16 h-16 rounded-2xl bg-brand-950/80 border border-brand-900 flex items-center justify-center text-cyan-400 mx-auto animate-pulse-slow shadow-xl">
                <Wallet className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white animate-pulse-slow">Wallet Connection Required</h3>
                <p className="text-xs text-dark-400 max-w-sm mx-auto leading-relaxed">
                  Connect your decentralized wallet to read and inspect academic certificates registered to your address.
                </p>
              </div>
              <NeonButton onClick={connectWallet} className="mx-auto font-black text-[10px] tracking-widest uppercase">
                Connect MetaMask Wallet
              </NeonButton>
            </GlassCard>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* WALLET OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start animate-in"
                >
                  {/* Left Column - Large Profile Card */}
                  <GlassCard hover={false} className="p-8 bg-dark-900/10 border border-white/[0.02] md:col-span-2 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-cyan-400 animate-pulse-slow" /> Web3 Identity Profile
                      </h3>
                      <span className="text-[9px] font-black uppercase bg-cyan-950/60 px-3 py-1 border border-cyan-900/60 text-cyan-400 rounded-full tracking-wider animate-pulse-slow">
                        Ledger Active
                      </span>
                    </div>

                    <div className="space-y-4 text-sm font-medium">
                      <div>
                        <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest">Graduate Ethereum Key Address</span>
                        <span className="text-white font-mono block mt-1.5 p-3 rounded-xl bg-dark-950 border border-white/[0.02] select-all truncate text-xs font-semibold">{account}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest">Total Degrees Anchored</span>
                          <span className="text-2xl font-black text-white font-mono mt-1 block">{certs.length}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-dark-400 block font-bold uppercase tracking-widest">Contract Registry IPFS</span>
                          <span className="text-2xl font-black text-white font-mono mt-1 block">Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.03] flex justify-end">
                      <a
                        href={getVerificationLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 hover:text-cyan-350 font-bold hover:underline inline-flex items-center gap-1.5 transition-all"
                      >
                        Inspect Public Verify Profile <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </GlassCard>

                  {/* Right Column - Secondary Quick widgets */}
                  <div className="space-y-6">
                    <GlassCard hover={false} className="p-6 bg-dark-900/10 border border-white/[0.02] text-center space-y-4">
                      <div className="w-11 h-11 rounded-xl bg-indigo-950/60 border border-indigo-900 flex items-center justify-center text-indigo-400 mx-auto shadow-inner">
                        <BadgeCheck className="w-5.5 h-5.5 animate-pulse-slow" />
                      </div>
                      <div>
                        <span className="text-[10px] text-dark-400 block font-bold uppercase tracking-wider">Status Validation</span>
                        <span className="text-xs font-bold text-white mt-1 block">All Signatures Intact</span>
                      </div>
                    </GlassCard>

                    <GlassCard hover={false} className="p-6 bg-dark-900/10 border border-white/[0.02] text-center space-y-4">
                      <div className="w-11 h-11 rounded-xl bg-brand-950/60 border border-brand-900 flex items-center justify-center text-cyan-400 mx-auto shadow-inner">
                        <RefreshCw className="w-5.5 h-5.5 animate-pulse-slow" />
                      </div>
                      <div>
                        <span className="text-[10px] text-dark-400 block font-bold uppercase tracking-wider">Last Sync Check</span>
                        <span className="text-xs font-semibold text-white mt-1 block">Just Now</span>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              )}

              {/* MY CREDENTIALS GRID */}
              {activeTab === 'credentials' && (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 animate-in"
                >
                  {/* Search and Filters Ribbon */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center print:hidden bg-dark-900/5 p-4.5 rounded-[24px] border border-white/[0.03]">
                    {/* Search Input */}
                    <div className="relative w-full md:max-w-md">
                      <Search className="w-4 h-4 text-dark-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search diploma awards by name..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium"
                      />
                    </div>

                    {/* Filter selector dropdown */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Filter className="w-4 h-4 text-cyan-400 animate-pulse-slow" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2.5 rounded-xl glass-input text-xs font-semibold cursor-pointer w-full md:w-auto"
                      >
                        <option value="all">Status: All Credentials</option>
                        <option value="valid">Status: Active & Valid</option>
                        <option value="revoked">Status: Revoked</option>
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <Loader message="Querying Ethereum ledger for issued qualifications..." />
                  ) : filteredCerts.length === 0 ? (
                    <div className="glass-panel p-16 text-center rounded-[32px] border border-white/[0.04]">
                      <span className="text-xs text-dark-450 font-light block leading-relaxed">
                        No degrees match your search parameters. Clear query to reload all!
                      </span>
                    </div>
                  ) : (
                    /* Spring Physics Cards Grid utilizing our reusable CertificateCard */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredCerts.map((cert) => (
                        <CertificateCard 
                          key={cert.index} 
                          cert={cert} 
                          onQrClick={setSelectedCert} 
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          )}

        </div>
      </div>

      {/* QR Code Modal Overlay */}
      {selectedCert && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-250">
          <div className="glass-panel p-8 rounded-[36px] max-w-sm w-full space-y-6 text-center border border-cyan-900/60 relative shadow-2xl animate-in zoom-in-95 duration-250">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-white/[0.04] text-dark-400 hover:text-white transition-colors cursor-pointer animate-pulse-slow"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400 animate-pulse-slow" /> Holographic Proof
              </h3>
              <p className="text-xs text-dark-400 px-2 leading-relaxed">Present this code to verifiers to audit your signature records instantly.</p>
            </div>

            {/* QR Code Container */}
            <div className="p-5 bg-white rounded-[24px] w-fit mx-auto shadow-inner border border-brand-200/50">
              <QRCodeSVG
                value={getVerificationLink()}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>

            {/* Description */}
            <div className="space-y-4 border-t border-white/[0.04] pt-5">
              <div className="text-left text-xs bg-dark-950 p-4 rounded-2xl border border-white/[0.03] space-y-1">
                <p className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Digital Degree</p>
                <p className="text-white font-bold truncate leading-snug">{selectedCert.course}</p>
                <p className="text-dark-350 text-[10px] font-mono mt-0.5 truncate">Issuer: {selectedCert.issuer}</p>
              </div>
              
              <a
                href={getVerificationLink()}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-350 font-bold hover:underline inline-flex items-center gap-1.5 transition-all"
              >
                Inspect Ledger Proof <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
