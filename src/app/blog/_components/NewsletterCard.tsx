"use client";

import { useState } from "react";
import { Rss, CheckCircle2 } from "lucide-react";

/** Dark newsletter subscription card for the blog sidebar */
export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1F2E 0%, #2C3444 100%)" }}
    >
      <div className="p-5">
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center mb-3">
          <Rss className="w-5 h-5 text-teal-400" />
        </div>
        <h3 className="text-white mb-1 text-[15px] font-bold">Stay Updated</h3>
        <p className="text-slate-400 mb-4 text-xs" style={{ lineHeight: 1.6 }}>
          Get the latest utility tips, tariff updates, and bill-saving strategies in your inbox.
        </p>
        {submitted ? (
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-[13px] font-semibold">You&apos;re subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-teal-500/50 focus:bg-white/15 transition-all mb-2 text-[13px]"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-white transition-all hover:opacity-90 text-[13px] font-semibold"
              style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}
            >
              Subscribe Free
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
