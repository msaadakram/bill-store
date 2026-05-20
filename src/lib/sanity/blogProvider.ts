/**
 * Blog Data Provider
 *
 * Fetches blog data from Sanity CMS when configured,
 * falls back to static data from blogData.ts.
 */
import { client, useSanity } from "./client";
import {
  allPostsQuery,
  postBySlugQuery,
  relatedPostsQuery,
  featuredPostQuery,
} from "./queries";
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
  getFeaturedPost,
  getCategoryCount,
  blogCategories,
} from "@/data/blogData";
import type { BlogPost, BlogCategory } from "@/data/blogData";

/* ── Fetch all posts ── */
export async function fetchAllPosts(): Promise<BlogPost[]> {
  if (!useSanity) return blogPosts;

  try {
    const sanityPosts = await client.fetch(allPostsQuery);
    return mapSanityPosts(sanityPosts);
  } catch (error) {
    console.warn("Failed to fetch from Sanity, using static data:", error);
    return blogPosts;
  }
}

/* ── Fetch single post by slug ── */
export async function fetchPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!useSanity) return getBlogPost(slug);

  try {
    const sanityPost = await client.fetch(postBySlugQuery, { slug });
    if (!sanityPost) return getBlogPost(slug); // fallback
    return mapSanityPost(sanityPost);
  } catch (error) {
    console.warn("Failed to fetch post from Sanity, using static data:", error);
    return getBlogPost(slug);
  }
}

/* ── Fetch related posts ── */
export async function fetchRelatedPosts(
  id: string,
  category: BlogCategory,
  count = 3
): Promise<BlogPost[]> {
  if (!useSanity) return getRelatedPosts(id, category, count);

  try {
    const sanityPosts = await client.fetch(relatedPostsQuery, { id, category });
    return mapSanityPosts(sanityPosts).slice(0, count);
  } catch (error) {
    console.warn("Failed to fetch related posts from Sanity:", error);
    return getRelatedPosts(id, category, count);
  }
}

/* ── Fetch featured post ── */
export async function fetchFeaturedPost(): Promise<BlogPost | undefined> {
  if (!useSanity) return getFeaturedPost();

  try {
    const post = await client.fetch(featuredPostQuery);
    if (!post) return getFeaturedPost();
    return mapSanityPost(post);
  } catch (error) {
    console.warn("Failed to fetch featured post from Sanity:", error);
    return getFeaturedPost();
  }
}

/* ── Get categories (static for now) ── */
export function fetchCategories() {
  return { categories: blogCategories, counts: getCategoryCount() };
}

/* ── Sanity → BlogPost mappers ── */
function mapSanityPost(sanity: any): BlogPost {
  return {
    id: sanity._id,
    slug: sanity.slug?.current || sanity.slug,
    title: sanity.title,
    metaTitle: sanity.metaTitle || sanity.title,
    metaDescription: sanity.metaDescription || sanity.excerpt,
    excerpt: sanity.excerpt,
    category: sanity.category || "Guides & Tips",
    tags: sanity.tags || [],
    author: {
      name: sanity.author?.name || "Unknown",
      title: sanity.author?.title || "Author",
      avatar: sanity.author?.avatar || sanity.author?.name?.charAt(0) || "A",
    },
    publishDate: sanity.publishedAt
      ? new Date(sanity.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Unknown",
    updatedDate: sanity.updatedAt
      ? new Date(sanity.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    readTime: sanity.readTime || 5,
    image: sanity.mainImage?.asset?._ref
      ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${sanity.mainImage.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`
      : "/placeholder.jpg",
    featured: sanity.featured || false,
    views: sanity.views || 0,
    content: mapSanityContent(sanity.content || []),
  };
}

function mapSanityPosts(posts: any[]): BlogPost[] {
  if (!Array.isArray(posts)) return [];
  return posts.map(mapSanityPost);
}

function mapSanityContent(content: any[]): BlogPost["content"] {
  if (!Array.isArray(content)) return [];

  return content.map((block: any) => {
    switch (block._type) {
      case "contentIntro":
        return { type: "intro" as const, text: block.text };
      case "contentHeading":
        return { type: block.level as "h2" | "h3", heading: block.heading };
      case "contentParagraph":
        return { type: "p" as const, text: block.text };
      case "contentList":
        return { type: block.style as "ul" | "ol", items: block.items };
      case "contentCallout":
        return block.variant === "tip"
          ? { type: "tip" as const, text: block.text }
          : block.variant === "warning"
          ? { type: "warning" as const, text: block.text }
          : { type: "callout" as const, variant: block.variant, text: block.text };
      case "contentTable":
        return {
          type: "table" as const,
          headers: block.headers,
          rows: block.rows?.map((r: any) => r.cells) || [],
        };
      case "contentDivider":
        return { type: "divider" as const };
      default:
        return { type: "p" as const, text: "" };
    }
  });
}
