"use client";

import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import type { BlogPost } from "@/data/blogData";
import { categoryColors } from "@/lib/constants/categories";

/** Full-width featured article card with hero image background */
export function FeaturedPostCard({ post }: { post: BlogPost }) {
  const colors = categoryColors[post.category] || categoryColors["Guides & Tips"];
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Category badge */}
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold"
          style={{ backgroundColor: `${colors.bg}ee`, color: colors.text, borderColor: colors.border }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.dot }} />
          {post.category}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-9">
          <h2
            className="text-white mb-3 leading-tight line-clamp-2 group-hover:underline decoration-white/30 underline-offset-4"
            style={{ fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            {post.title}
          </h2>
          <p className="text-white/75 line-clamp-2 mb-4 text-[13px] sm:text-[15px]" style={{ lineHeight: 1.6 }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 text-[9px] font-extrabold"
                style={{ background: "linear-gradient(135deg, #3E8B8E, #7FB3B5)" }}
              >
                {post.author.avatar}
              </div>
              <span className="font-semibold">{post.author.name}</span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {(post.views / 1000).toFixed(0)}K views
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
