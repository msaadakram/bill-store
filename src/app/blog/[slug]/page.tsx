"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Clock,
  Eye,
  ChevronRight,
  Calendar,
  Tag,
  ArrowLeft,
  ArrowRight,
  Zap,
  BookOpen,
} from "lucide-react";
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
} from "@/data/blogData";
import { categoryColors } from "@/lib/constants/categories";
import { formatViews } from "@/lib/utils/formatting";
import { usePostMeta } from "@/lib/hooks/useMetaTags";

/* ── Extracted components ── */
import { RenderSection } from "./_components/RenderSection";
import { TableOfContents } from "./_components/TableOfContents";
import { RelatedPostCard } from "./_components/RelatedPostCard";
import { ActionButtons } from "./_components/ActionButtons";
import { ReadingProgress } from "./_components/ReadingProgress";
import { ScrollToTop } from "./_components/ScrollToTop";
import { EstimatedReadBar } from "./_components/EstimatedReadBar";
import { PostNotFound } from "./_components/PostNotFound";

/* ═══════════════════════════════════════════════════════
   ══ MAIN BLOG POST PAGE — Modern & Fully Responsive ══
   ═══════════════════════════════════════════════════════ */
export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const post = getBlogPost(slug || "");
  const heroRef = useRef<HTMLDivElement>(null);
  usePostMeta(post);

  // Parallax for hero image
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.06]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) return <PostNotFound />;

  const relatedPosts = getRelatedPosts(post.id, post.category, 3);
  const colors = categoryColors[post.category] || categoryColors["Guides & Tips"];
  const currentIdx = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  return (
    <>
      <ReadingProgress />
      <EstimatedReadBar readTime={post.readTime} />
      <ScrollToTop />

      <div className="min-h-screen bg-white">

        {/* ═══════════════ HERO HEADER ═══════════════ */}
        <header className="bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-5 sm:pt-8 pb-4">

            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-1.5 mb-4 sm:mb-5 text-[11px] sm:text-[13px] text-slate-500"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <Link href="/blog" className="hover:text-teal-600 transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-800 font-semibold truncate max-w-[160px] sm:max-w-none">{post.category}</span>
            </motion.nav>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-4 sm:mb-5"
            >
              <div
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.dot }} />
                <span className="text-[10px] sm:text-xs font-bold" style={{ color: colors.text }}>
                  {post.category}
                </span>
              </div>
            </motion.div>

            {/* Meta info row — fully responsive */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="mb-4 sm:mb-5"
            >
              {/* Desktop: single row with pipes */}
              <div className="hidden sm:flex items-center gap-x-4 text-slate-500 text-xs">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {post.publishDate}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {post.readTime} min read
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {formatViews(post.views)} views
                </span>
              </div>
              {/* Mobile: horizontal compact chips */}
              <div className="flex sm:hidden items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {post.publishDate}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {post.readTime}m read
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium">
                  <Eye className="w-3 h-3 text-slate-400" />
                  {formatViews(post.views)}
                </span>
              </div>
            </motion.div>

            {/* Big title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-slate-900 mb-5 sm:mb-6 font-serif"
              style={{
                fontSize: "clamp(22px, 5vw, 40px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {post.title}
            </motion.h1>

            {/* Author + Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="flex items-center justify-between gap-3 pb-5 border-b border-slate-100"
            >
              {/* Author card */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shrink-0 text-[10px] sm:text-xs font-extrabold shadow-md shadow-teal-600/15"
                  style={{ background: "linear-gradient(135deg, #3E8B8E, #7FB3B5)" }}
                >
                  {post.author.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-slate-900 text-[12px] sm:text-sm font-bold uppercase tracking-wide truncate">
                    {post.author.name}
                  </div>
                  <div className="text-slate-400 text-[10px] sm:text-xs truncate">
                    {post.author.title}
                  </div>
                </div>
              </div>

              <ActionButtons />
            </motion.div>

          </div>
        </header>

        {/* ═══════════════ HERO IMAGE — parallax ═══════════════ */}
        <div className="max-w-3xl mx-auto px-5 sm:px-6" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-48 sm:h-72 md:h-[400px] rounded-2xl overflow-hidden shadow-xl shadow-slate-300/30 mb-8 sm:mb-10"
          >
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              style={{ y: heroY, scale: heroScale }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            {post.updatedDate && post.updatedDate !== post.publishDate && (
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white border border-white/10 text-[10px] sm:text-[11px] font-semibold">
                Updated: {post.updatedDate}
              </div>
            )}
          </motion.div>
        </div>

        {/* ═══════════════ ARTICLE CONTENT ═══════════════ */}
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pb-16">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="font-reading"
          >
            {/* Table of Contents */}
            <TableOfContents sections={post.content} />

            {/* Article content */}
            <div className="space-y-5">
              {post.content.map((section, i) => (
                <RenderSection key={i} section={section} index={i} />
              ))}
            </div>

            {/* ── Tags ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-10 sm:mt-12 flex flex-wrap items-center gap-2"
            >
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mr-1">
                <Tag className="w-3.5 h-3.5" />
                <span className="font-semibold">Tags:</span>
              </div>
              {post.tags.map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all text-[11px] sm:text-xs font-medium inline-block"
                  >
                    #{tag}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Author Bio ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mt-8 bg-gradient-to-br from-slate-50 to-teal-50/20 rounded-2xl border border-slate-100 p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shrink-0 text-sm font-extrabold shadow-md shadow-teal-600/15"
                style={{ background: "linear-gradient(135deg, #3E8B8E, #7FB3B5)" }}
              >
                {post.author.avatar}
              </div>
              <div>
                <div className="text-slate-900 text-[14px] sm:text-[15px] font-bold">
                  {post.author.name}
                </div>
                <div className="text-teal-600 text-[11px] sm:text-xs font-semibold mb-2">
                  {post.author.title}
                </div>
                <p className="text-slate-500 text-[12px] sm:text-[13px]" style={{ lineHeight: 1.7 }}>
                  Expert in Pakistan&apos;s utility sector with years of experience covering electricity tariffs,
                  gas billing, and consumer rights. Passionate about helping Pakistani households manage their
                  utility expenses effectively.
                </p>
              </div>
            </motion.div>

            {/* ── Prev / Next Navigation ── */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {prevPost ? (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex items-start gap-3 p-3.5 sm:p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all h-full"
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-400 mt-0.5 shrink-0 group-hover:text-teal-600 group-hover:-translate-x-0.5 transition-all" />
                    <div className="min-w-0">
                      <div className="text-slate-400 text-[9px] sm:text-[10px] font-bold mb-1">PREVIOUS</div>
                      <div className="text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors text-[12px] sm:text-[13px] font-semibold" style={{ lineHeight: 1.5 }}>
                        {prevPost.title}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ) : <div />}
              {nextPost && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-start gap-3 p-3.5 sm:p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all text-right sm:flex-row-reverse h-full"
                  >
                    <ArrowRight className="w-5 h-5 text-slate-400 mt-0.5 shrink-0 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                    <div className="min-w-0">
                      <div className="text-slate-400 text-[9px] sm:text-[10px] font-bold mb-1">NEXT</div>
                      <div className="text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors text-[12px] sm:text-[13px] font-semibold" style={{ lineHeight: 1.5 }}>
                        {nextPost.title}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* ── Related Posts ── */}
            {relatedPosts.length > 0 && (
              <section className="mt-12 sm:mt-14" aria-label="Related articles">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 mb-5 sm:mb-6"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #CCFBF1, #99F6E4)" }}>
                    <BookOpen className="w-4 h-4 text-teal-700" />
                  </div>
                  <h2 className="text-slate-900 text-base sm:text-lg font-extrabold font-serif">Related Articles</h2>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedPosts.map((p, i) => (
                    <RelatedPostCard key={p.id} post={p} index={i} />
                  ))}
                </div>
              </section>
            )}
          </motion.article>
        </div>

        {/* ═══════════════ BOTTOM CTA ═══════════════ */}
        <section className="bg-slate-50 border-t border-slate-100 py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl p-6 sm:p-10 text-center"
              style={{ background: "linear-gradient(135deg, #0D9488 0%, #14B8A6 50%, #2DD4BF 100%)" }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-px rounded-full"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: 0,
                      height: "100%",
                      background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)",
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 + i * 0.5, delay: i * 0.7, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-5">
                  <Zap className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="text-white text-[10px] sm:text-xs font-bold">FREE &amp; INSTANT</span>
                </div>
                <h2 className="text-white mb-3 font-serif" style={{ fontSize: "clamp(20px, 3.5vw, 32px)", fontWeight: 800, lineHeight: 1.2 }}>
                  Ready to Check Your Utility Bill?
                </h2>
                <p className="text-teal-100 mb-8 max-w-xl mx-auto text-[13px] sm:text-base" style={{ lineHeight: 1.7 }}>
                  Apply what you&apos;ve just learned. Check your electricity, gas, or water bill online in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/lesco-bill")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-white text-teal-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-[13px] sm:text-sm font-bold"
                  >
                    <Zap className="w-4 h-4" />
                    Check LESCO Bill
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/bill/electricity")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-white/20 text-white border border-white/30 rounded-xl hover:bg-white/30 transition-all text-[13px] sm:text-sm font-semibold"
                  >
                    All Electricity Bills
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
