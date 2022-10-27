import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { POSTS_PATH } from '../utils/mdxUtils';

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH);
}

interface FrontMatter {
  title: string;
  description: string;
  date: string;
  image: string;
  featured: boolean;
  slug: string;
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  const frontMatter = { ...data, slug: realSlug } as unknown;

  return frontMatter as FrontMatter;
}

export function getAllPosts() {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
