import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Generate random particles for a futuristic space/blockchain feel
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 20
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0B0F1A]">
      {/* Cinematic Ambient Neon Light Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] bg-radial from-cyan-500/15 via-transparent to-transparent rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.85, 1.15, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-radial from-purple-500/12 via-transparent to-transparent rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 50, -20, 0]
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-[40%] right-[30%] w-[30vw] h-[30vw] bg-radial from-indigo-500/10 via-transparent to-transparent rounded-full blur-[90px]"
      />

      {/* Cybernetic Tech Grid Layout */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(82, 108, 240, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(82, 108, 240, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Node Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.1, y: `${p.y}vh`, x: `${p.x}vw` }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0.1, 0.6, 0.1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
          className="absolute rounded-full bg-cyan-400/40"
          style={{
            width: p.size,
            height: p.size,
            boxShadow: p.size > 2 ? '0 0 10px rgba(34, 211, 238, 0.8)' : 'none'
          }}
        />
      ))}
    </div>
  );
}
