import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Disc } from 'lucide-react';
import { ethers } from 'ethers';

// Import custom layouts & header navbar
import Navbar from './components/Navbar';
import AnimatedBackground from './components/ui/AnimatedBackground';

// Import distinct page components
import Landing from './components/pages/Landing';
import About from './components/pages/About';
import Institution from './components/pages/Institution';
import Student from './components/pages/Student';
import Verifier from './components/pages/Verifier';
import CertificateDetails from './components/pages/CertificateDetails';
import WalletConnect from './components/pages/WalletConnect';
import TransactionHistory from './components/pages/TransactionHistory';
import ProfileSettings from './components/pages/ProfileSettings';
import Analytics from './components/pages/Analytics';
import NotFound from './components/pages/NotFound';
import AnimatedLoading from './components/pages/AnimatedLoading';

function AppContent() {
  const location = useLocation();
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [networkError, setNetworkError] = useState('');
  const [globalLoading, setGlobalLoading] = useState(true);

  // Global curtain entry loading screen trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for MetaMask account/network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          reconnectEthers();
        } else {
          setAccount(null);
          setSigner(null);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    reconnectEthers();
  }, []);

  const reconnectEthers = async () => {
    try {
      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send("eth_accounts", []);
        if (accounts.length > 0) {
          const activeSigner = await browserProvider.getSigner();
          setProvider(browserProvider);
          setSigner(activeSigner);
          setAccount(accounts[0]);
        }
      }
    } catch (err) {
      console.error("MetaMask reload error:", err);
    }
  };

  const connectWallet = async () => {
    setNetworkError('');
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to use this application!");
      return;
    }

    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      const activeSigner = await browserProvider.getSigner();
      
      setProvider(browserProvider);
      setSigner(activeSigner);
      setAccount(accounts[0]);

      const network = await browserProvider.getNetwork();
      if (Number(network.chainId) !== 31337 && Number(network.chainId) !== 1337 && Number(network.chainId) !== 8545) {
        console.warn("Please switch MetaMask network to Localhost 8545 to interact with local contracts.");
      }
    } catch (err) {
      console.error(err);
      if (err.code === 4001) {
        setNetworkError("Wallet connection request was rejected by the user.");
      } else {
        setNetworkError("Failed to connect MetaMask. Check browser console logs.");
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
    setProvider(null);
  };

  return (
    <AnimatePresence mode="wait">
      {globalLoading ? (
        <AnimatedLoading key="global-curtain-loader" />
      ) : (
        <div key="app-main-layout" className="min-h-screen text-dark-50 flex flex-col justify-between relative selection:bg-cyan-600 selection:text-white pb-10">
          
          {/* Futuristic Animated Space particle background */}
          <AnimatedBackground />

          {/* Sticky Header Nav */}
          <Navbar 
            account={account} 
            connectWallet={connectWallet} 
            disconnectWallet={disconnectWallet} 
          />

          {/* Main Content Area */}
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 print:py-0 print:px-0">
            
            {/* Display Network Error notification banner */}
            {networkError && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-rose-950/40 border border-rose-900/40 rounded-2xl text-rose-350 text-xs shadow-2xl max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-300 print:hidden backdrop-blur">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 animate-bounce-slow" />
                <span>{networkError}</span>
              </div>
            )}

            {/* Cinematic Page Reveal Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Routes location={location}>
                  <Route 
                    path="/" 
                    element={<Landing account={account} connectWallet={connectWallet} />} 
                  />
                  <Route 
                    path="/about" 
                    element={<About />} 
                  />
                  <Route 
                    path="/institution" 
                    element={
                      <Institution 
                        account={account} 
                        provider={provider} 
                        signer={signer} 
                        connectWallet={connectWallet} 
                      />
                    } 
                  />
                  <Route 
                    path="/student" 
                    element={
                      <Student 
                        account={account} 
                        provider={provider} 
                        signer={signer} 
                        connectWallet={connectWallet} 
                      />
                    } 
                  />
                  <Route 
                    path="/verify" 
                    element={
                      <Verifier 
                        account={account} 
                        provider={provider} 
                        signer={signer} 
                      />
                    } 
                  />
                  <Route 
                    path="/certificate/:student/:index" 
                    element={<CertificateDetails />} 
                  />
                  <Route 
                    path="/connect" 
                    element={
                      <WalletConnect 
                        account={account} 
                        connectWallet={connectWallet} 
                        disconnectWallet={disconnectWallet} 
                      />
                    } 
                  />
                  <Route 
                    path="/history" 
                    element={<TransactionHistory account={account} />} 
                  />
                  <Route 
                    path="/settings" 
                    element={<ProfileSettings />} 
                  />
                  <Route 
                    path="/analytics" 
                    element={<Analytics />} 
                  />
                  <Route 
                    path="*" 
                    element={<NotFound />} 
                  />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Futuristic Footer */}
          <footer className="border-t border-white/[0.04] mt-20 pt-8 pb-4 text-center text-xs text-dark-500 max-w-7xl mx-auto w-full px-4 print:hidden">
            <p className="font-medium text-dark-400">© 2026 D-AIC Wallet (Decentralized Academic Identity). Startup-level presentation ledger.</p>
            <p className="mt-2.5 font-mono text-[9px] tracking-widest text-dark-600 uppercase flex items-center justify-center gap-2">
              <span>Solidity Contract</span> <Disc className="w-2.5 h-2.5 text-cyan-500 animate-spin-slow" /> 
              <span>IPFS Vaults</span> <Disc className="w-2.5 h-2.5 text-cyan-500 animate-spin-slow" /> 
              <span>Ethers.js v6</span> <Disc className="w-2.5 h-2.5 text-cyan-500 animate-spin-slow" /> 
              <span>Framer Motion</span>
            </p>
          </footer>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
