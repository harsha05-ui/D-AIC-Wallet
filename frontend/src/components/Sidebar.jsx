import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ items = [], activeItem, setActiveItem }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? '72px' : '240px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel min-h-[500px] flex flex-col justify-between py-6 rounded-[28px] border border-white/[0.04] bg-dark-900/10 shadow-2xl relative overflow-hidden flex-shrink-0"
    >
      <div className="space-y-6 px-3">
        {/* Toggle Collapse Button */}
        <div className="flex justify-end px-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] text-dark-300 hover:text-white transition-all cursor-pointer shadow-inner"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sidebar List */}
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer group text-left relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-brand-950 to-indigo-950/80 border border-brand-900/60 text-brand-300 shadow-md' 
                    : 'text-dark-300 hover:text-white hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'text-brand-400' : 'text-dark-400 group-hover:text-white'} transition-colors`}>
                  <Icon className="w-5 h-5 flex-shrink-0" />
                </div>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold tracking-wide"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Info Badge */}
      {!collapsed && (
        <div className="px-5 text-[9px] font-mono tracking-widest text-dark-600 uppercase text-center border-t border-white/[0.03] pt-4 mx-3">
          SaaS Engine v1.0
        </div>
      )}
    </motion.div>
  );
}
