"use client";

import { motion } from "motion/react";

export function GasBg() {
  const flames = [
    { x1: "10%", y1: "0%", points: "10,0 5,35 15,40 8,90", delay: 0, dur: 3.5 },
    { x1: "30%", y1: "0%", points: "10,0 3,30 12,35 5,80", delay: 1.2, dur: 4 },
    { x1: "55%", y1: "0%", points: "10,0 6,38 16,42 9,95", delay: 0.6, dur: 3.2 },
    { x1: "75%", y1: "0%", points: "10,0 4,32 13,36 7,85", delay: 1.8, dur: 3.8 },
    { x1: "90%", y1: "0%", points: "10,0 5,40 15,44 9,92", delay: 0.3, dur: 4.2 },
  ];

  const orbs = [
    { cx: "20%", cy: "30%", r: 60, delay: 0.5, colors: ["#FCA5A5", "#EF4444"] },
    { cx: "70%", cy: "20%", r: 80, delay: 1.5, colors: ["#F87171", "#DC2626"] },
    { cx: "45%", cy: "60%", r: 50, delay: 2.5, colors: ["#FCA5A5", "#EF4444"] },
    { cx: "85%", cy: "55%", r: 40, delay: 0.8, colors: ["#EF4444", "#DC2626"] },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.cx,
            top: orb.cy,
            width: orb.r * 2,
            height: orb.r * 2,
            background: `radial-gradient(circle, rgba(248,113,113,0.2) 0%, rgba(220,38,38,0.08) 50%, transparent 70%)`,
            transform: "translate(-50%,-50%)",
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.8, delay: orb.delay, ease: "easeInOut" }}
        />
      ))}

      {flames.map((flame, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: flame.x1 }}
          animate={{ opacity: [0, 0, 1, 0.7, 1, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: flame.dur,
            delay: flame.delay,
            ease: "easeInOut",
            times: [0, 0.3, 0.4, 0.5, 0.55, 0.65, 1],
          }}
        >
          <svg width="20" height="96" viewBox="0 0 20 96" fill="none">
            <polyline
              points={flame.points}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter={`url(#gas-glow-${i})`}
            />
            <defs>
              <filter id={`gas-glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </motion.div>
      ))}

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`flame-spark-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ left: `${8 + i * 8}%`, top: `${10 + (i % 4) * 20}%`, opacity: 0, background: "radial-gradient(circle, #FCA5A5, #EF4444)" }}
          animate={{ opacity: [0, 0.9, 0], y: [0, -20, -40], scale: [0.5, 1.2, 0] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.8, delay: i * 0.35, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
          backgroundSize: "300% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-100% 0%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </div>
  );
}
