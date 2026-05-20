"use client";

import { useEffect } from "react";
import type { BlogPost } from "@/data/blogData";

/**
 * Sets <head> meta tags and JSON-LD for a blog post.
 */
export function usePostMeta(post?: BlogPost) {
  useEffect(() => {
    if (!post) return;
    const added: HTMLElement[] = [];
    const prevTitle = document.title;
    document.title = post.metaTitle || post.title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) el = document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        const m = document.createElement("meta");
        m.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        m.setAttribute("content", content);
        document.head.appendChild(m);
        added.push(m);
      }
    };
    setMeta("description", post.metaDescription || post.excerpt);
    setMeta("og:title", post.metaTitle || post.title);
    setMeta("og:description", post.metaDescription || post.excerpt);
    setMeta("og:image", post.image);
    setMeta("og:type", "article");
    setMeta("article:published_time", post.publishDate);
    if (post.updatedDate) setMeta("article:modified_time", post.updatedDate);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: post.image,
      datePublished: post.publishDate,
      dateModified: post.updatedDate || post.publishDate,
      author: { "@type": "Person", name: post.author.name },
      description: post.excerpt,
    };
    let script = document.querySelector("#blog-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "blog-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
      added.push(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = prevTitle;
      added.forEach((el) => el.remove());
    };
  }, [post]);
}

/**
 * Sets <head> meta tags for the blog listing page.
 */
export function useBlogMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    const added: HTMLElement[] = [];
    document.title = "Blog — Utility Bill Guides, Tips & Insights | BillCheck PK";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) el = document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        const m = document.createElement("meta");
        m.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        m.setAttribute("content", content);
        document.head.appendChild(m);
        added.push(m);
      }
    };
    setMeta("description", "Expert guides and tips on checking and managing utility bills in Pakistan.");
    setMeta("og:title", "Blog — BillCheck Pakistan");
    setMeta("og:description", "Expert guides on electricity, gas, water and internet bills in Pakistan.");
    setMeta("og:type", "website");

    return () => {
      document.title = prevTitle;
      added.forEach((el) => el.remove());
    };
  }, []);
}
