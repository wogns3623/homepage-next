import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface OpenGraph {
  title: string;
  type: string;
  image: string;
  url: string;
  description?: string;
}

export interface Post {
  slug: string;
  categories: string[];
  title: string;
  summary?: string;
  author?: string;
  date: number;
  openGraph: OpenGraph;
  content: MDXRemoteSerializeResult;
  tags?: string[];
}
