
import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const reassuringMessages = [
    "Analyzing your menu's structure...",
    "Digitizing items and prices...",
    "Crafting 3D food visualizations...",
    "Categorizing for the best experience...",
    "Almost there, putting on the finishing touches...",
    "Preparing your digital storefront..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % reassuringMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-8 animate-in fade-in duration-1000">
      <div className="relative w-24 h-24">
        {/* Pulsing glow background */}
        <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse"></div>
        
        {/* Main outer ring */}
        <div className="absolute inset-0 border-[3px] border-slate-800 rounded-full"></div>
        
        {/* Animated spinning ring */}
        <div className="absolute inset-0 border-[3px] border-amber-500 rounded-full border-t-transparent animate-spin"></div>
        
        {/* Inner static icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-500/50 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-3 max-w-xs">
        <div className="h-8 flex items-center justify-center">
          <p className="text-xl font-black text-white tracking-tight animate-in slide-in-from-bottom-2 fade-in duration-500 key={messageIndex}">
            {reassuringMessages[messageIndex]}
          </p>
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
          Powered by Gemini Vision Engine
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex gap-2">
        {reassuringMessages.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-700 ${i === messageIndex ? 'w-8 bg-amber-500' : 'w-2 bg-slate-800'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
