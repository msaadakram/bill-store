/**
 * Sanity Studio Schema Definitions
 *
 * These schema types define the content structure in Sanity CMS.
 * To use these, set up a Sanity Studio project and add these to your schema.
 *
 * Quick setup:
 *   npx sanity@latest init --project-plan free
 *   Then copy these schema types into your Studio's schemaTypes/ folder.
 */

// ── Post Schema ──
export const postSchema = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    },
    {
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
    },
    {
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "content",
      title: "Content Sections",
      type: "array",
      of: [
        { type: "contentIntro" },
        { type: "contentHeading" },
        { type: "contentParagraph" },
        { type: "contentList" },
        { type: "contentCallout" },
        { type: "contentTable" },
        { type: "contentDivider" },
      ],
    },
  ],
};

// ── Author Schema ──
export const authorSchema = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "title",
      title: "Title / Role",
      type: "string",
    },
    {
      name: "avatar",
      title: "Avatar Initials",
      type: "string",
      description: "1-2 character initials for avatar fallback",
    },
    {
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    },
  ],
};

// ── Category Schema ──
export const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};

// ── Content Block Schemas ──
export const contentIntro = {
  name: "contentIntro",
  title: "Introduction",
  type: "object",
  fields: [
    { name: "text", title: "Text", type: "text", rows: 4 },
  ],
};

export const contentHeading = {
  name: "contentHeading",
  title: "Heading",
  type: "object",
  fields: [
    {
      name: "level",
      title: "Level",
      type: "string",
      options: { list: ["h2", "h3"] },
    },
    { name: "heading", title: "Heading Text", type: "string" },
  ],
};

export const contentParagraph = {
  name: "contentParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    { name: "text", title: "Text", type: "text", rows: 6 },
  ],
};

export const contentList = {
  name: "contentList",
  title: "List",
  type: "object",
  fields: [
    {
      name: "style",
      title: "Style",
      type: "string",
      options: { list: ["ul", "ol"] },
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};

export const contentCallout = {
  name: "contentCallout",
  title: "Callout",
  type: "object",
  fields: [
    {
      name: "variant",
      title: "Variant",
      type: "string",
      options: { list: ["info", "success", "warning", "error", "tip"] },
    },
    { name: "text", title: "Text", type: "text", rows: 3 },
  ],
};

export const contentTable = {
  name: "contentTable",
  title: "Table",
  type: "object",
  fields: [
    {
      name: "headers",
      title: "Headers",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
};

export const contentDivider = {
  name: "contentDivider",
  title: "Divider",
  type: "object",
  fields: [
    {
      name: "style",
      title: "Style",
      type: "string",
      options: { list: ["line", "dots"] },
      initialValue: "line",
    },
  ],
};
