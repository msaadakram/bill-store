"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { blogTeaserArticles } from "@/lib/constants/homeData";

/** Blog teaser grid with 3 article cards */
export function BlogTeaserSection() {
  const router = useRouter();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div
              className="inline-block px-3 py-1 rounded-lg bg-purple-50 text-purple-700 mb-3"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              KNOWLEDGE HUB
            </div>
            <h2
              className="text-slate-900 font-serif"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800 }}
            >
              Latest Guides & Tips
            </h2>
            <p
              className="text-slate-500 mt-2 max-w-md"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              Expert articles to help you manage utility bills, reduce costs, and stay informed.
            </p>
          </div>
          <button
            onClick={() => router.push("/blog")}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogTeaserArticles.map((article) => (
            <button
              key={article.slug}
              onClick={() => router.push(`/blog/${article.slug}`)}
              className="group text-left bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div
                  className="absolute top-3 left-3 px-2 py-1 rounded-lg border"
                  style={{
                    backgroundColor: `${article.catBg}ee`,
                    color: article.catColor,
                    borderColor: article.catColor + "30",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {article.category}
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors"
                  style={{ fontSize: "15px", fontWeight: 700, lineHeight: 1.45 }}
                >
                  {article.title}
                </h3>
                <p
                  className="text-slate-500 line-clamp-2 mb-4"
                  style={{ fontSize: "13px", lineHeight: 1.6 }}
                >
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-1.5 text-slate-400"
                    style={{ fontSize: "12px" }}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime} min read
                  </div>
                  <div
                    className="flex items-center gap-1 text-teal-600 group-hover:gap-2 transition-all"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  >
                    Read more
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
