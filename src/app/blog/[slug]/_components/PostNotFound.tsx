"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { BookOpen, ArrowLeft } from "lucide-react";

/** 404-style state shown when a blog post slug doesn't match any post */
export function PostNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-slate-300" />
        </div>
        <h1 className="text-slate-900 text-2xl font-extrabold mb-3 font-serif">
          Article Not Found
        </h1>
        <p className="text-slate-500 text-[15px] mb-6" style={{ lineHeight: 1.7 }}>
          The article you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/blog")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold"
          >
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
