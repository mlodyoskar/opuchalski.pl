import fs from 'fs';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'posts');

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const getPostFilePath = (slug: string) => {
  return path.join(POSTS_PATH, `${slug}.mdx`);
};
