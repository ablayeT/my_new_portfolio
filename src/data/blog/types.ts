// src/data/blog/types.ts
export type Category =
  | "Framework"
  | "Méthodologie"
  | "Développement"
  | "SIEM"
  | "Web Security"
  | "Detection";

export type CalloutIntent = "info" | "warning" | "danger";

export type ContentParagraph = { type: "p"; text: string };
export type ContentH2 = { type: "h2"; text: string };
export type ContentH3 = { type: "h3"; text: string };
export type ContentQuote = { type: "quote"; text: string };
export type ContentUL = { type: "ul"; items: string[] };
export type ContentCode = { type: "code"; lang: string; code: string };
export type ContentHR = { type: "hr" };
export type ContentImage = {
  type: "img";
  src: string;
  alt?: string;
  caption?: string;
};
export type ContentTable = {
  type: "table";
  head?: string[];
  rows: (string | number)[][];
};
export type ContentSteps = {
  type: "steps";
  items: Array<{
    title: string;
    detail?: string;
    code?: string;
    lang?: string;
  }>;
};
export type ContentCallout = {
  type: "callout";
  intent: CalloutIntent;
  text: string;
  title?: string;
};

export type ContentBlock =
  | ContentParagraph
  | ContentH2
  | ContentH3
  | ContentQuote
  | ContentUL
  | ContentCode
  | ContentHR
  | ContentImage
  | ContentTable
  | ContentSteps
  | ContentCallout;

export interface BlogPostInput {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  category: Category;
  tags: string[];
  featured?: boolean;
  content: ContentBlock[];
}

export interface BlogPost extends BlogPostInput {
  readTime: string;
}
