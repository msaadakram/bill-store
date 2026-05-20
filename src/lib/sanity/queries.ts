import { groq } from "next-sanity";

/* ── Blog Post Queries ── */

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "category": category->title,
    mainImage,
    publishedAt,
    updatedAt,
    readTime,
    views,
    featured,
    author->{
      name,
      title,
      avatar,
      image
    },
    tags,
    metaTitle,
    metaDescription,
    content[] {
      _type,
      _key,
      style,
      children,
      heading,
      text,
      items,
      variant,
      headers,
      rows,
      listItem,
      markDefs
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "category": category->title,
    mainImage,
    publishedAt,
    updatedAt,
    readTime,
    views,
    featured,
    author->{
      name,
      title,
      avatar,
      image
    },
    tags,
    metaTitle,
    metaDescription,
    content[] {
      _type,
      _key,
      style,
      children,
      heading,
      text,
      items,
      variant,
      headers,
      rows,
      listItem,
      markDefs
    }
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $id && category->title == $category] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    "category": category->title,
    mainImage,
    publishedAt,
    readTime,
    views,
    author->{
      name,
      avatar
    },
    tags
  }
`;

export const featuredPostQuery = groq`
  *[_type == "post" && featured == true][0] {
    _id,
    title,
    slug,
    excerpt,
    "category": category->title,
    mainImage,
    publishedAt,
    readTime,
    views,
    author->{
      name,
      title,
      avatar
    },
    tags
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "count": count(*[_type == "post" && references(^._id)])
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;
