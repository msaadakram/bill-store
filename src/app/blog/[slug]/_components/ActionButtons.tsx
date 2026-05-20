"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Bookmark, Copy, Check, Share2 } from "lucide-react";

/** Like / Bookmark / Copy Link / Share action buttons row */
export function ActionButtons() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ url: window.location.href, title: document.title }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const btnBase =
    "w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-200";

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setLiked(!liked)}
        className={`${btnBase} ${
          liked
            ? "bg-red-50 border-red-200 text-red-500 shadow-sm shadow-red-100"
            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
        }`}
        aria-label="Like article"
      >
        <Heart
          className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform ${liked ? "fill-red-500 scale-110" : ""}`}
        />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setBookmarked(!bookmarked)}
        className={`${btnBase} ${
          bookmarked
            ? "bg-teal-50 border-teal-200 text-teal-600 shadow-sm shadow-teal-100"
            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
        }`}
        aria-label="Bookmark article"
      >
        <Bookmark
          className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform ${bookmarked ? "fill-teal-600 scale-110" : ""}`}
        />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={handleCopy}
        className={`${btnBase} ${
          copied
            ? "bg-emerald-50 border-emerald-200 text-emerald-600"
            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
        }`}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        ) : (
          <Copy className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        )}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={handleShare}
        className={`${btnBase} bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600`}
        aria-label="Share article"
      >
        <Share2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </motion.button>
    </div>
  );
}
