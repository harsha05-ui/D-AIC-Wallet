import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Key, Sliders, ShieldCheck, Database, Landmark, User } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';

export default function ProfileSettings() {
  const [useMock, setUseMock] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [username, setUsername] = useState('Authorized Institution node');
  const [nodeType, setNodeType] = useState('University Registry');

  useEffect(() => {
    const savedMock = localStorage.getItem('daic_ipfs_mock');
    const savedKey = localStorage.getItem('daic_pinata_key');
    const savedSecret = localStorage.getItem('daic_pinata_secret');
    const savedName = localStorage.getItem('daic_user_name');
    const savedType = localStorage.getItem('daic_node_type');

    if (savedMock !== null) setUseMock(savedMock === 'true');
    if (savedKey) setApiKey(savedKey);
    if (savedSecret) setApiSecret(savedSecret);
    if (savedName) setUsername(savedName);
    if (savedType) setNodeType(savedType);
  }, []);

  const saveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('daic_ipfs_mock', useMock.toString());
    localStorage.setItem('daic_pinata_key', apiKey);
    localStorage.setItem('daic_pinata_secret', apiSecret);
    localStorage.setItem('daic_user_name', username);
    localStorage.setItem('daic_node_type', nodeType);
    alert("Profile and node configurations updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          Console Settings <Settings className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
        </h2>
        <p className="text-dark-400 text-sm mt-1">Configure your Pinata IPFS distributed clusters, custom user profiles, and active node sessions.</p>
      </div>

      <form onSubmit={saveSettings} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Node Identity Panel */}
          <GlassCard hover={false} className="p-8 bg-dark-900/10 border border-white/[0.04] space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-4">
              <User className="w-5 h-5 text-cyan-405" /> Node Identity Profile
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Authority Display Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="E.g., Massachusetts Institute of Technology"
                  className="w-full mt-2 p-3.5 rounded-xl glass-input text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Active Node Authority Type</label>
                <select
                  value={nodeType}
                  onChange={(e) => setNodeType(e.target.value)}
                  className="w-full mt-2 p-3.5 rounded-xl glass-input text-xs font-bold cursor-pointer"
                >
                  <option value="University Registry">University Registry (Signer)</option>
                  <option value="Accreditation Board">Accreditation Board (Audit)</option>
                  <option value="Employer Representative">Employer Representative (Viewer)</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Decentralized Cluster settings */}
          <GlassCard hover={false} className="p-8 bg-dark-900/10 border border-white/[0.04] space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-4">
              <Database className="w-5 h-5 text-cyan-405" /> Distributed Storage (IPFS)
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-white select-none">
                  <input
                    type="checkbox"
                    checked={useMock}
                    onChange={(e) => setUseMock(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 bg-dark-900 border-white/[0.08] w-4.5 h-4.5 cursor-pointer"
                  />
                  <span className="text-dark-200">Local Offline Gateway (Fastest)</span>
                </label>
              </div>

              <p className="text-[10px] text-dark-400 font-light leading-relaxed">
                Checking this box anchors credentials locally within your browser cache, allowing 100% complete file audits offline without a Pinata API Key subscription.
              </p>

              {!useMock && (
                <div className="space-y-4 pt-2 animate-in slide-in-from-top-3 duration-250">
                  <div>
                    <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Pinata API Key</label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Paste Pinata API Key"
                      className="w-full mt-1.5 p-3.5 rounded-xl glass-input text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Pinata Secret API Key</label>
                    <input
                      type="password"
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      placeholder="Paste Pinata Secret Key"
                      className="w-full mt-1.5 p-3.5 rounded-xl glass-input text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

        </div>

        {/* Action button */}
        <div className="flex justify-end pt-4 border-t border-white/[0.04]">
          <NeonButton type="submit" className="text-xs uppercase font-extrabold tracking-widest cursor-pointer px-8 py-4 rounded-2xl">
            Save System Settings
          </NeonButton>
        </div>
      </form>
    </div>
  );
}
