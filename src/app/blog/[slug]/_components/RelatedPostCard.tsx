"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock, Eye } from "lucide-react";
import type { BlogPost } from "@/data/blogData";
import { categoryColors } from "@/lib/constants/categories";
import { formatViews } from "@/lib/utils/formatting";

/** A card showing a related blog post in the article footer */
export function RelatedPostCard({ post, index }: { post: BlogPost; index: number }) {
  const colors = categoryColors[post.category] || categoryColors["Guides & Tips"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
          <div className="relative h-36 sm:h-44 overflow-hidden shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div
              className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[9px] sm:text-[10px] font-bold"
              style={{ backgroundColor: `${colors.bg}ee`, color: colors.text, borderColor: colors.border }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.dot }} />
              {post.category}
            </div>
          </div>
          <div className="p-3.5 sm:p-4 flex flex-col flex-1">
            <h3 className="text-slate-900 line-clamp-2 mb-2 group-hover:text-teal-700 transition-colors text-[13px] sm:text-[14px] font-bold leading-snug font-serif">
              {post.title}
            </h3>
            <p className="text-slate-500 line-clamp-2 flex-1 text-[11px] sm:text-xs" style={{ lineHeight: 1.6 }}>
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-50 text-slate-400 text-[10px] sm:text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}m
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(post.views)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
