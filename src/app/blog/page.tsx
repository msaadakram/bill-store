"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  Eye,
  ChevronRight,
  Search,
  X,
  Tag,
  ArrowRight,
  Zap,
  BookOpen,
  Star,
  TrendingUp,
  Filter,
} from "lucide-react";
import {
  blogPosts,
  blogCategories,
  getFeaturedPost,
  getCategoryCount,
  type BlogCategory,
} from "@/data/blogData";
import { categoryColors, categoryIcons } from "@/lib/constants/categories";
import { useBlogMeta } from "@/lib/hooks/useMetaTags";

/* ── Extracted components ── */
import { FeaturedPostCard } from "./_components/FeaturedPostCard";
import { PostCard } from "./_components/PostCard";
import { NewsletterCard } from "./_components/NewsletterCard";

/* ═══════════════════════════════════════
   ══ MAIN BLOG PAGE ════════════════════
   ═══════════════════════════════════════ */
export default function Blog() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  );
}

function BlogContent() {
  useBlogMeta();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("tag") ?? "");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  const featuredPost = getFeaturedPost();
  const categoryCounts = getCategoryCount();

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter((p) => !p.featured)
      .filter((p) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        return matchSearch && matchCat;
      });
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const topPosts = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 4);
  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).slice(0, 16);

  const handleCategoryChange = (cat: BlogCategory | "All") => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setShowFilterSheet(false);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 md:pt-14 md:pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-5 text-slate-500 text-[13px]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold">Blog</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-4">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700 text-xs font-bold">UTILITY KNOWLEDGE HUB</span>
              </div>
              <h1 className="text-slate-900 mb-3" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                Guides, Tips &amp; Insights on{" "}
                <span style={{
                  background: "linear-gradient(135deg, #0D9488, #14B8A6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Pakistan&apos;s Utility Bills
                </span>
              </h1>
              <p className="text-slate-500 text-[15px]" style={{ lineHeight: 1.7 }}>
                Expert articles to help you check bills faster, understand tariffs, reduce consumption, and never pay a late fee again.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { label: "Articles", value: blogPosts.length + "+" },
                { label: "Categories", value: blogCategories.length },
                { label: "Monthly Readers", value: "50K+" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div className="text-slate-900 text-lg font-extrabold leading-none">{s.value}</div>
                  <div className="text-slate-400 mt-0.5 text-[11px] font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 max-w-2xl">
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm focus-within:border-teal-300 focus-within:shadow-md transition-all">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles — e.g. LESCO, gas bill, energy saving..."
                className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400 min-w-0 text-sm"
                aria-label="Search blog articles"
              />
              {search && (
                <button onClick={() => handleSearch("")} className="text-slate-400 hover:text-slate-600 shrink-0">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <section className="sticky top-16 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setShowFilterSheet(true)}
              className="md:hidden shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold"
            >
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1">
              {(["All", ...blogCategories] as (BlogCategory | "All")[]).map((cat) => {
                const isActive = activeCategory === cat;
                const colors = cat !== "All" ? categoryColors[cat] : null;
                const count = cat === "All" ? blogPosts.length : (categoryCounts[cat as BlogCategory] || 0);
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 text-xs"
                    style={{
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? (colors?.bg || "#ECFEFF") : "white",
                      color: isActive ? (colors?.text || "#0E7490") : "#64748B",
                      borderColor: isActive ? (colors?.border || "#A5F3FC") : "#E2E8F0",
                    }}
                  >
                    {cat !== "All" && <span>{categoryIcons[cat]}</span>}
                    <span className="whitespace-nowrap">{cat}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                      style={{
                        backgroundColor: isActive ? (colors?.dot || "#3E8B8E") + "20" : "#F1F5F9",
                        color: isActive ? (colors?.dot || "#3E8B8E") : "#94A3B8",
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Filter Sheet ── */}
      <AnimatePresence>
        {showFilterSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setShowFilterSheet(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-slate-900 text-base font-bold">Filter by Category</h2>
                  <button onClick={() => setShowFilterSheet(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                <div className="space-y-1">
                  {(["All", ...blogCategories] as (BlogCategory | "All")[]).map((cat) => {
                    const isActive = activeCategory === cat;
                    const colors = cat !== "All" ? categoryColors[cat] : null;
                    const count = cat === "All" ? blogPosts.length : (categoryCounts[cat as BlogCategory] || 0);
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                        style={{
                          backgroundColor: isActive ? (colors?.bg || "#ECFEFF") : "transparent",
                          color: isActive ? (colors?.text || "#0E7490") : "#64748B",
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          {cat !== "All" && categoryIcons[cat]}
                          <span className="text-sm" style={{ fontWeight: isActive ? 700 : 500 }}>{cat}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                          style={{ backgroundColor: (colors?.dot || "#94A3B8") + "20", color: colors?.dot || "#94A3B8" }}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* ── Left: Posts ── */}
          <main className="flex-1 min-w-0">
            {/* Featured */}
            {featuredPost && activeCategory === "All" && !search && currentPage === 1 && (
              <section className="mb-8" aria-label="Featured article">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-slate-700 text-[13px] font-bold">FEATURED ARTICLE</span>
                </div>
                <FeaturedPostCard post={featuredPost} />
              </section>
            )}

            {/* Results header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-slate-900 text-sm font-bold">
                  {activeCategory === "All" ? "All Articles" : activeCategory}
                </span>
                <span className="text-slate-400 ml-2 text-[13px]">
                  ({filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"})
                </span>
              </div>
              {search && (
                <button
                  onClick={() => handleSearch("")}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors text-xs font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear search
                </button>
              )}
            </div>

            {/* Posts grid */}
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {paginatedPosts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-700 mb-1 text-base font-bold">No articles found</p>
                <p className="text-slate-400 mb-5 text-sm">Try a different search term or category</p>
                <button
                  onClick={() => { handleSearch(""); handleCategoryChange("All"); }}
                  className="px-5 py-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 hover:bg-teal-100 transition-colors text-[13px] font-semibold"
                >
                  Show all articles
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2" role="navigation" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-[13px] font-semibold"
                  aria-label="Previous page"
                >
                  &larr; Prev
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-9 h-9 rounded-lg border transition-all text-[13px]"
                      style={{
                        fontWeight: page === currentPage ? 700 : 500,
                        backgroundColor: page === currentPage ? "#0D9488" : "white",
                        color: page === currentPage ? "white" : "#64748B",
                        borderColor: page === currentPage ? "#0D9488" : "#E2E8F0",
                      }}
                      aria-label={`Page ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-[13px] font-semibold"
                  aria-label="Next page"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </main>

          {/* ── Right: Sidebar ── */}
          <aside className="lg:w-72 xl:w-80 space-y-5 shrink-0">
            {/* Popular Posts */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <h2 className="text-slate-900 text-sm font-bold">Most Popular</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {topPosts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors group"
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-white mt-0.5 text-[10px] font-extrabold"
                      style={{
                        background: i === 0 ? "linear-gradient(135deg, #F59E0B, #EF4444)" : i === 1 ? "linear-gradient(135deg, #64748B, #94A3B8)" : "linear-gradient(135deg, #92400E, #B45309)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors text-xs font-semibold" style={{ lineHeight: 1.5 }}>
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-slate-400 text-[10px]">
                        <Eye className="w-3 h-3" />
                        {(post.views / 1000).toFixed(0)}K views
                        <span>&middot;</span>
                        <Clock className="w-3 h-3" />
                        {post.readTime}m
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                <Filter className="w-4 h-4 text-teal-600" />
                <h2 className="text-slate-900 text-sm font-bold">Categories</h2>
              </div>
              <div className="p-3 space-y-1">
                {blogCategories.map((cat) => {
                  const colors = categoryColors[cat];
                  const count = categoryCounts[cat] || 0;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all"
                      style={{
                        backgroundColor: isActive ? colors.bg : "transparent",
                        color: isActive ? colors.text : "#64748B",
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span style={{ color: isActive ? colors.dot : "#CBD5E1" }}>
                          {categoryIcons[cat]}
                        </span>
                        <span className="text-[13px]" style={{ fontWeight: isActive ? 700 : 500 }}>{cat}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                        style={{ backgroundColor: colors.dot + "20", color: colors.dot }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                <Tag className="w-4 h-4 text-teal-600" />
                <h2 className="text-slate-900 text-sm font-bold">Popular Tags</h2>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all text-[11px] font-medium"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <NewsletterCard />

            {/* Quick CTA */}
            <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}>
              <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <h3 className="text-white mb-1 text-sm font-bold">Check Your Bill Now</h3>
              <p className="text-teal-100 mb-4 text-xs" style={{ lineHeight: 1.6 }}>
                Ready to check? Get your bill details in under 10 seconds.
              </p>
              <Link
                href="/bill/electricity"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-teal-700 hover:shadow-lg transition-all text-xs font-bold"
              >
                <Zap className="w-3.5 h-3.5" />
                Check Bill Free
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
