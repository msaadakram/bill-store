"use client";

import { motion } from "motion/react";

export function ElectricBg() {
  const bolts = [
    { x1: "10%", y1: "0%", points: "10,0 5,40 14,40 8,90", delay: 0, dur: 3.5 },
    { x1: "30%", y1: "0%", points: "10,0 3,35 12,35 5,80", delay: 1.2, dur: 4 },
    { x1: "55%", y1: "0%", points: "10,0 6,42 16,42 9,95", delay: 0.6, dur: 3.2 },
    { x1: "75%", y1: "0%", points: "10,0 4,38 13,38 7,85", delay: 1.8, dur: 3.8 },
    { x1: "90%", y1: "0%", points: "10,0 5,45 15,45 9,92", delay: 0.3, dur: 4.2 },
  ];

  const arcs = [
    { cx: "20%", cy: "30%", r: 60, delay: 0.5 },
    { cx: "70%", cy: "20%", r: 80, delay: 1.5 },
    { cx: "45%", cy: "60%", r: 50, delay: 2.5 },
    { cx: "85%", cy: "55%", r: 40, delay: 0.8 },
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

      {arcs.map((arc, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: arc.cx,
            top: arc.cy,
            width: arc.r * 2,
            height: arc.r * 2,
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
            transform: "translate(-50%,-50%)",
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.8, delay: arc.delay, ease: "easeInOut" }}
        />
      ))}

      {bolts.map((bolt, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: bolt.x1 }}
          animate={{ opacity: [0, 0, 1, 0.7, 1, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: bolt.dur,
            delay: bolt.delay,
            ease: "easeInOut",
            times: [0, 0.3, 0.4, 0.5, 0.55, 0.65, 1],
          }}
        >
          <svg width="20" height="96" viewBox="0 0 20 96" fill="none">
            <polyline
              points={bolt.points}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter={`url(#glow-${i})`}
            />
            <defs>
              <filter id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
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
          key={`spark-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{ left: `${8 + i * 8}%`, top: `${10 + (i % 4) * 20}%`, opacity: 0 }}
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
