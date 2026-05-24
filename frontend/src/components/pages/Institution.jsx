import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Key, Settings, Loader2, Sparkles, AlertCircle, FileText, CheckCircle2, ShieldCheck, Wallet, Landmark, Table, Layers, History, LayoutDashboard } from 'lucide-react';
import { uploadToIPFS } from '../../utils/ipfs';
import { ethers } from 'ethers';
import contractDetails from '../../contracts/contractDetails.json';

// Import Reusable UI Components
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import Sidebar from '../Sidebar';
import StatsCard from '../ui/StatsCard';

export default function Institution({ account, provider, signer, connectWallet }) {
  // Sidebar Navigation active item
  const [activeTab, setActiveTab] = useState('overview'); // overview, issue, settings

  // Config States
  const [useMock, setUseMock] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  // Form States
  const [studentAddress, setStudentAddress] = useState('');
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);
  
  // App States
  const [status, setStatus] = useState('idle'); // idle, ipfs, metamask, mining, success, error
  const [statusMessage, setStatusMessage] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [txHash, setTxHash] = useState('');

  // Issued History logs
  const [historyLogs, setHistoryLogs] = useState([]);

  // Sidebar configuration items
  const sidebarItems = [
    { id: 'overview', label: 'Overview Panel', icon: LayoutDashboard },
    { id: 'issue', label: 'Issue Diploma', icon: AwardIcon },
    { id: 'settings', label: 'Node Settings', icon: Settings }
  ];

  function AwardIcon(props) {
    return <Landmark {...props} />;
  }

  // Load configuration and history logs on mount
  useEffect(() => {
    const savedMock = localStorage.getItem('daic_ipfs_mock');
    const savedKey = localStorage.getItem('daic_pinata_key');
    const savedSecret = localStorage.getItem('daic_pinata_secret');

    if (savedMock !== null) setUseMock(savedMock === 'true');
    if (savedKey) setApiKey(savedKey);
    if (savedSecret) setApiSecret(savedSecret);

    if (account) {
      loadHistoryLogs();
    }
  }, [account]);

  const loadHistoryLogs = () => {
    const logs = localStorage.getItem(`daic_issuer_history_${account.toLowerCase()}`);
    if (logs) {
      try {
        setHistoryLogs(JSON.parse(logs));
      } catch (e) {
        console.error(e);
      }
    } else {
      setHistoryLogs([]);
    }
  };

  const saveConfig = () => {
    localStorage.setItem('daic_ipfs_mock', useMock.toString());
    localStorage.setItem('daic_pinata_key', apiKey);
    localStorage.setItem('daic_pinata_secret', apiSecret);
    alert("IPFS Configuration saved successfully!");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const issueCertificate = async (e) => {
    e.preventDefault();
    if (!account) return;
    if (!studentAddress || !studentName || !course || !file) {
      alert("Please fill in all details and upload a certificate file.");
      return;
    }
    if (!ethers.isAddress(studentAddress)) {
      alert("Please enter a valid Ethereum address!");
      return;
    }

    try {
      setStatus('ipfs');
      setStatusMessage('Pinning encrypted asset onto distributed IPFS clusters...');
      
      const cid = await uploadToIPFS(file, { apiKey, apiSecret }, useMock);
      setIpfsHash(cid);

      setStatus('metamask');
      setStatusMessage('Awaiting cryptographic signature authorization in MetaMask...');

      if (!contractDetails.address) {
        throw new Error("Smart contract is not compiled or deployed. Deploy using 'npm run deploy' on Hardhat network.");
      }

      const contract = new ethers.Contract(
        contractDetails.address,
        contractDetails.abi,
        signer
      );

      const tx = await contract.issueCertificate(
        studentAddress,
        studentName,
        course,
        cid
      );
      
      setStatus('mining');
      setStatusMessage('Awaiting block validations. Anchoring certificate parameters on-chain...');
      setTxHash(tx.hash);

      await tx.wait();

      const newLog = {
        id: Date.now().toString(),
        student: studentAddress,
        name: studentName,
        course: course,
        cid: cid,
        tx: tx.hash,
        date: new Date().toLocaleDateString()
      };

      const updatedLogs = [newLog, ...historyLogs];
      localStorage.setItem(`daic_issuer_history_${account.toLowerCase()}`, JSON.stringify(updatedLogs));
      setHistoryLogs(updatedLogs);

      setStatus('success');
      setStatusMessage('Certificate hash anchored successfully!');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setStatusMessage(err.message || 'Smart contract transaction failed.');
    }
  };

  const resetForm = () => {
    setStudentAddress('');
    setStudentName('');
    setCourse('');
    setFile(null);
    setStatus('idle');
    setIpfsHash('');
    setTxHash('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          Institution Console <Landmark className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
        </h2>
        <p className="text-dark-400 text-sm mt-1">Publish secure, immutable academic certifications directly to the Ethereum network.</p>
      </div>

      {/* Sidebar navigation grid */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <Sidebar 
          items={sidebarItems} 
          activeItem={activeTab} 
          setActiveItem={setActiveTab} 
        />

        {/* Dashboard Content Panel */}
        <div className="flex-grow w-full">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Stats row utilizing StatsCard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard 
                    icon={History} 
                    value={historyLogs.length} 
                    label="Total Degrees Issued" 
                    subtitle="Immutable ledger counts" 
                    colorClass="text-cyan-400 bg-cyan-950/40 border-cyan-900/60" 
                  />
                  <StatsCard 
                    icon={Landmark} 
                    value={contractDetails.address ? `${contractDetails.address.slice(0, 6)}...${contractDetails.address.slice(-4)}` : 'Offline'} 
                    label="Registry Address" 
                    subtitle="Contract anchored hash" 
                    colorClass="text-cyan-400 bg-cyan-950/40 border-cyan-900/60" 
                  />
                  <StatsCard 
                    icon={Wallet} 
                    value={account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Disconnected'} 
                    label="Active Authority" 
                    subtitle="Consensus session" 
                    colorClass="text-purple-400 bg-purple-950/40 border-purple-900/60" 
                  />
                </div>

                {/* History Logs Table */}
                <GlassCard hover={false} className="bg-dark-900/10 border border-white/[0.02] p-8">
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-4 mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Table className="w-5 h-5 text-cyan-400 animate-pulse-slow" /> Certificate Registry Log History
                    </h3>
                    <span className="text-[9px] font-black uppercase bg-cyan-950 px-3 py-1 border border-cyan-900 text-cyan-300 rounded-full tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                      Immutable Log Ledger
                    </span>
                  </div>

                  {historyLogs.length === 0 ? (
                    <div className="py-12 text-center text-dark-500 font-light text-xs leading-relaxed">
                      No degree issuances registered under this account session. Click "Issue Diploma" to begin!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/[0.03] text-dark-400 font-bold uppercase tracking-wider text-[9px]">
                            <th className="pb-3 pr-4">Student</th>
                            <th className="pb-3 pr-4">Degree</th>
                            <th className="pb-3 pr-4">IPFS Hash</th>
                            <th className="pb-3 pr-4">Tx Hash</th>
                            <th className="pb-3 text-right">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                          {historyLogs.map((log) => (
                            <tr key={log.id} className="text-dark-200 hover:text-white transition-colors">
                              <td className="py-3.5 pr-4 font-semibold">
                                {log.name} <br />
                                <span className="text-[10px] text-dark-450 font-mono font-medium">{log.student.slice(0, 6)}...{log.student.slice(-4)}</span>
                              </td>
                              <td className="py-3.5 pr-4 max-w-[180px] truncate font-medium text-dark-200" title={log.course}>
                                {log.course}
                              </td>
                              <td className="py-3.5 pr-4 font-mono text-cyan-400 text-[10px]" title={log.cid}>
                                {log.cid.slice(0, 10)}...{log.cid.slice(-6)}
                              </td>
                              <td className="py-3.5 pr-4 font-mono text-[10px] text-dark-400" title={log.tx}>
                                {log.tx.slice(0, 10)}...{log.tx.slice(-6)}
                              </td>
                              <td className="py-3.5 text-right font-medium text-dark-350">{log.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {/* ISSUE DIPLOMA PANEL */}
            {activeTab === 'issue' && (
              <motion.div
                key="issue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {!account ? (
                  <GlassCard hover={false} className="p-16 rounded-[32px] text-center space-y-6 max-w-xl mx-auto border border-white/[0.04] bg-dark-900/10">
                    <div className="w-16 h-16 rounded-2xl bg-brand-950/80 border border-brand-900 flex items-center justify-center text-cyan-400 mx-auto animate-pulse-slow shadow-xl">
                      <Wallet className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-white animate-pulse-slow">Console Locked</h3>
                      <p className="text-xs text-dark-400 max-w-sm mx-auto leading-relaxed">
                        Please connect your MetaMask wallet credentials to authorize digital diplomas on the local blockchain node.
                      </p>
                    </div>
                    <NeonButton onClick={connectWallet} className="mx-auto font-black uppercase text-[10px] tracking-widest">
                      Connect MetaMask Wallet
                    </NeonButton>
                  </GlassCard>
                ) : status === 'idle' ? (
                  <form onSubmit={issueCertificate} className="glass-panel p-8 rounded-[32px] border border-white/[0.04] space-y-8 relative bg-dark-900/10 shadow-2xl">
                    <div className="border-b border-white/[0.04] pb-4 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">Diploma Sign Registry Specs</h3>
                      <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-900 shadow-[0_0_10px_rgba(6,182,212,0.15)]">Connected</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-5">
                        <div>
                          <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Student Wallet Address</label>
                          <input
                            type="text"
                            required
                            value={studentAddress}
                            onChange={(e) => setStudentAddress(e.target.value)}
                            placeholder="0x..."
                            className="w-full mt-2 p-3.5 rounded-xl glass-input text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Graduate Student Name</label>
                          <input
                            type="text"
                            required
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="E.g., Jane Doe"
                            className="w-full mt-2 p-3.5 rounded-xl glass-input text-xs font-medium"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Academic Degree Award / Course Title</label>
                          <input
                            type="text"
                            required
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="E.g., PhD in Cryptographical Engineering"
                            className="w-full mt-2 p-3.5 rounded-xl glass-input text-xs font-medium"
                          />
                        </div>
                      </div>

                      {/* Drag & Drop File Zone */}
                      <div className="flex flex-col">
                        <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest mb-2">Digital Diploma Asset</label>
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          className="flex-1 border border-dashed border-dark-700 hover:border-cyan-500/80 rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer bg-dark-900/10 hover:bg-cyan-950/10 group relative overflow-hidden"
                          onClick={() => document.getElementById('fileInput').click()}
                        >
                          <input
                            id="fileInput"
                            type="file"
                            required
                            accept="application/pdf,image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          
                          {file ? (
                            <div className="space-y-3.5 relative z-10 animate-in fade-in duration-200">
                              <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-900 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-950/30 animate-bounce-slow">
                                <FileText className="w-7 h-7" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white truncate max-w-[220px]">{file.name}</p>
                                <p className="text-[10px] font-bold text-cyan-400 mt-1 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-900 inline-block uppercase">
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4 relative z-10">
                              <div className="w-14 h-14 rounded-2xl bg-dark-950 border border-white/[0.04] flex items-center justify-center text-dark-400 mx-auto group-hover:text-cyan-400 group-hover:border-cyan-850/60 group-hover:scale-105 transition-all shadow-inner">
                                <Upload className="w-6 h-6 animate-pulse-slow" />
                              </div>
                              <div>
                                <p className="text-xs text-white font-semibold tracking-wide">Drag & drop certificate diploma</p>
                                <p className="text-[10px] text-dark-400 mt-1.5 leading-relaxed">Accepts certified PNG, JPG images or PDFs</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-dark-400 bg-white/[0.01] p-4 rounded-2xl border border-white/[0.03]">
                      <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse-slow" />
                      <span className="leading-relaxed font-light">Verify details before signing. Once anchored to the Ethereum ledger, this digital credential record cannot be deleted or structurally altered.</span>
                    </div>

                    <NeonButton type="submit" className="w-full py-4.5 rounded-2xl text-[10px] font-black tracking-widest uppercase">
                      Sign & Publish to Ethereum Ledger
                    </NeonButton>
                  </form>
                ) : (
                  /* Progress Stepper & Completion Screens */
                  <GlassCard hover={false} className="p-12 rounded-[32px] border border-white/[0.04] text-center space-y-8 max-w-xl mx-auto relative overflow-hidden bg-dark-900/10">
                    
                    {status !== 'success' && status !== 'error' ? (
                      <div className="space-y-8 py-6">
                        <Loader2 className="w-14 h-14 text-cyan-500 animate-spin mx-auto" />
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-white tracking-wide">Cryptographic Operations</h3>
                          <p className="text-xs text-dark-350 px-8 leading-relaxed font-light">{statusMessage}</p>
                        </div>

                        {/* Progress Stepper Line */}
                        <div className="flex justify-between items-center max-w-xs mx-auto pt-6 relative">
                          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/[0.03] -translate-y-1/2 -z-10"></div>
                          
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                            status === 'ipfs' 
                              ? 'bg-gradient-to-r from-cyan-600 to-indigo-650 border-cyan-500 text-white ring-4 ring-brand-950 shadow-lg shadow-cyan-600/20 animate-pulse' 
                              : 'bg-dark-950 border-white/[0.04] text-dark-400'
                          }`}>1</div>
                          
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                            status === 'metamask' 
                              ? 'bg-gradient-to-r from-cyan-600 to-indigo-650 border-cyan-500 text-white ring-4 ring-brand-950 shadow-lg shadow-cyan-600/20 animate-pulse' 
                              : 'bg-dark-950 border-white/[0.04] text-dark-400'
                          }`}>2</div>
                          
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                            status === 'mining' 
                              ? 'bg-gradient-to-r from-cyan-600 to-indigo-650 border-cyan-500 text-white ring-4 ring-brand-950 shadow-lg shadow-cyan-600/20 animate-pulse' 
                              : 'bg-dark-950 border-white/[0.04] text-dark-400'
                          }`}>3</div>
                        </div>
                      </div>
                    ) : status === 'success' ? (
                      <div className="space-y-8 py-6">
                        <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto shadow-2xl animate-bounce-slow">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-3xl font-black text-white tracking-tight">Ledger Anchored!</h3>
                          <p className="text-xs text-cyan-400/90 font-bold uppercase tracking-wider font-mono">Credential Verification Complete</p>
                        </div>

                        {/* Transaction Detail Card */}
                        <div className="glass-card p-5 rounded-2xl text-left text-xs space-y-3.5 max-w-md mx-auto border border-white/[0.04] shadow-inner">
                          <div className="flex justify-between items-center">
                            <span className="text-dark-455 font-bold">IPFS CID:</span>
                            <a
                              href={useMock ? '#' : `https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 font-bold font-mono hover:underline truncate max-w-[200px]"
                            >
                              {ipfsHash}
                            </a>
                          </div>
                          {txHash && (
                            <div className="flex justify-between items-center">
                              <span className="text-dark-455 font-bold">Block Transaction:</span>
                              <span className="text-dark-200 font-mono select-all truncate max-w-[200px]">{txHash}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-dark-455 font-bold">Graduate Target:</span>
                            <span className="text-dark-200 font-mono truncate max-w-[200px]">{studentAddress}</span>
                          </div>
                        </div>

                        <NeonButton onClick={resetForm} className="px-6 py-3.5 mx-auto text-xs uppercase font-extrabold tracking-widest cursor-pointer">
                          Issue Another Diploma
                        </NeonButton>
                      </div>
                    ) : (
                      /* Error View */
                      <div className="space-y-6 py-6">
                        <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-455 mx-auto">
                          <AlertCircle className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black text-white">Execution Interrupted</h3>
                          <p className="text-xs text-rose-400 font-semibold leading-relaxed px-6">{statusMessage}</p>
                        </div>
                        <button
                          onClick={resetForm}
                          className="px-5 py-3 bg-dark-900/80 border border-white/[0.04] hover:border-cyan-500 text-white font-bold rounded-xl transition-all cursor-pointer text-xs"
                        >
                          Modify Specs & Retry
                        </button>
                      </div>
                    )}
                  </GlassCard>
                )}
              </motion.div>
            )}

            {/* SETTINGS PANEL */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard hover={false} className="p-8 rounded-[32px] border border-white/[0.04] bg-dark-900/10 space-y-6">
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Key className="w-4 h-4 text-cyan-400 animate-pulse-slow" /> Decentralized Nodes IPFS
                    </h3>
                    <span className="text-[9px] font-black uppercase bg-cyan-950 px-3 py-1 border border-cyan-900 text-cyan-300 rounded-full tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.15)]">Node Controller</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center space-y-2">
                      <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Gateway Upload Protocol</label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-white select-none">
                          <input
                            type="checkbox"
                            checked={useMock}
                            onChange={(e) => setUseMock(e.target.checked)}
                            className="rounded text-brand-600 focus:ring-brand-500 bg-dark-900 border-white/[0.08] w-4.5 h-4.5 cursor-pointer"
                          />
                          <span className="text-dark-200">Mock IPFS Local Offline Gateway (Recommended)</span>
                        </label>
                      </div>
                      <p className="text-[10px] text-dark-400 font-light leading-relaxed">
                        Checking this box enables automatic local base64 indexing inside your browser's localStorage. This makes testing offline 100% complete and working out of the box!
                      </p>
                    </div>

                    {!useMock && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Pinata API Key</label>
                          <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Paste Pinata API Key"
                            className="w-full mt-1.5 p-3.5 rounded-xl glass-input text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Pinata Secret API Key</label>
                          <input
                            type="password"
                            value={apiSecret}
                            onChange={(e) => setApiSecret(e.target.value)}
                            placeholder="Paste Pinata Secret Key"
                            className="w-full mt-1.5 p-3.5 rounded-xl glass-input text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/[0.04]">
                    <NeonButton onClick={saveConfig} className="text-xs uppercase font-extrabold tracking-widest cursor-pointer px-6">
                      Save Node Settings
                    </NeonButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
