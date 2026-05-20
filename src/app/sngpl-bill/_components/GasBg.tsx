"use client";

import { motion } from "motion/react";

export function GasBg() {
  const flames = [
    { x1: "10%", y1: "0%", delay: 0, dur: 3.5 },
    { x1: "30%", y1: "0%", delay: 1.2, dur: 4 },
    { x1: "55%", y1: "0%", delay: 0.6, dur: 3.2 },
    { x1: "75%", y1: "0%", delay: 1.8, dur: 3.8 },
    { x1: "90%", y1: "0%", delay: 0.3, dur: 4.2 },
  ];

  const orbs = [
    { cx: "20%", cy: "30%", r: 60, delay: 0.5 },
    { cx: "70%", cy: "20%", r: 80, delay: 1.5 },
    { cx: "45%", cy: "60%", r: 50, delay: 2.5 },
    { cx: "85%", cy: "55%", r: 40, delay: 0.8 },
  ];

  const beams = [
    { x: "15%", delay: 0.2 },
    { x: "38%", delay: 1.1 },
    { x: "60%", delay: 0.7 },
    { x: "82%", delay: 1.5 },
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
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(147,197,253,0.08) 40%, transparent 70%)",
            transform: "translate(-50%,-50%)",
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.8, delay: orb.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Flame-like wavy shapes */}
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
          <svg width="24" height="100" viewBox="0 0 24 100" fill="none">
            <path
              d="M12 0 C6 15, 4 25, 8 35 C12 45, 2 50, 6 60 C10 70, 3 75, 5 85 C7 95, 10 98, 12 100"
              stroke="rgba(147,197,253,0.5)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M12 0 C18 15, 20 25, 16 35 C12 45, 22 50, 18 60 C14 70, 21 75, 19 85 C17 95, 14 98, 12 100"
              stroke="rgba(59,130,246,0.4)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}

      {/* Vertical blue gradient beams */}
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-0.5 rounded-full"
          style={{
            left: beam.x,
            background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.3), rgba(147,197,253,0.15), transparent)",
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 + i * 0.6, delay: beam.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Rising flame sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${8 + i * 8}%`,
            top: `${10 + (i % 4) * 20}%`,
            opacity: 0,
            background: i % 3 === 0 ? "#93C5FD" : i % 3 === 1 ? "#3B82F6" : "#BFDBFE",
          }}
          animate={{ opacity: [0, 0.9, 0], y: [0, -20, -40], scale: [0.5, 1.2, 0] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.8, delay: i * 0.35, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(59,130,246,0.06) 50%, transparent 70%)",
          backgroundSize: "300% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-100% 0%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </div>
  );
}
