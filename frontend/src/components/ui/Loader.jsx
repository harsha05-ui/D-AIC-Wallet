import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ message = 'Loading ledger details...' }) {
  return (
    <div className="py-20 text-center space-y-4 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-brand-900/30 border-t-brand-500 animate-spin"></div>
        <div className="w-8 h-8 rounded-full border-4 border-indigo-900/10 border-b-indigo-400 animate-spin absolute" style={{ animationDirection: 'reverse' }}></div>
      </div>
      <p className="text-xs text-dark-400 font-medium tracking-wide animate-pulse">{message}</p>
    </div>
  );
}
