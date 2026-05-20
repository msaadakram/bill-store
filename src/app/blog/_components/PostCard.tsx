"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock, Eye } from "lucide-react";
import type { BlogPost } from "@/data/blogData";
import { categoryColors } from "@/lib/constants/categories";

/** Standard blog post card used in the listing grid */
export function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const colors = categoryColors[post.category] || categoryColors["Guides & Tips"];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
          {/* Image */}
          <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold"
              style={{ backgroundColor: `${colors.bg}ee`, color: colors.text, borderColor: colors.border }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.dot }} />
              {post.category}
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col flex-1 p-4 md:p-5">
            <h3
              className="text-slate-900 mb-2 leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors text-[15px] font-bold"
              style={{ letterSpacing: "-0.01em" }}
            >
              {post.title}
            </h3>
            <p className="text-slate-500 line-clamp-2 flex-1 mb-4 text-[13px]" style={{ lineHeight: 1.65 }}>
              {post.excerpt}
            </p>
            {/* Meta row */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 text-[8px] font-extrabold"
                  style={{ background: "linear-gradient(135deg, #3E8B8E, #7FB3B5)" }}
                >
                  {post.author.avatar}
                </div>
                <span className="text-slate-600 truncate text-xs font-semibold" style={{ maxWidth: "100px" }}>
                  {post.author.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 shrink-0 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}m
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {(post.views / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
