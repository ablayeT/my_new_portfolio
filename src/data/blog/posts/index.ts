// src/data/blog/posts/index.ts
import type { BlogPost, BlogPostInput } from "../types";
import { estimateReadTime } from "../utils";

import { postMitre } from "./mitre-attack";
import { postPurple } from "./purple-methodology";
import { postPython } from "./python-automation";
import { postElk } from "./elk-stack";
import { postWebSec } from "./web-security";
import { postHunting } from "./threat-hunting";

const inputs: BlogPostInput[] = [
  postMitre,
  postPurple,
  postPython,
  postElk,
  postWebSec,
  postHunting,
];

const posts: BlogPost[] = inputs
  .map((p) => ({ ...p, readTime: estimateReadTime(p.content) }))
  .sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return posts;
}
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
export function getPrevNext(slug: string) {
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? posts[i - 1] : undefined,
    next: i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}
