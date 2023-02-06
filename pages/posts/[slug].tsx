import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Layout, WEBSITE_HOST_URL } from '../../components/Layout';
import { MetaProps } from '../../types/layout';
import { PostType } from '../../types/post';
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
import readingTime from 'reading-time';
import React from 'react';
import { Card } from '../../components/Card';

const components = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
  slug: string;
  timeToRead: number;
};

const PostPage = ({ source, frontMatter, slug }: PostPageProps) => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} • opuchalski.pl`,
    description: frontMatter.description,
    image: `${WEBSITE_HOST_URL}/images/${slug}/opengraph.png`,
    date: frontMatter.date,
    type: 'article',
  };

  return (
    <Layout customMeta={customMeta}>
      <article className="flex flex-col md:items-center">
        <h1 className="mb-6 text-center text-4xl  leading-tight  text-gray-900 dark:text-white sm:text-5xl">
          {frontMatter.title}
        </h1>

        {frontMatter.image && (
          <Image
            alt=""
            className="rounded-xl"
            width={700}
            height={400}
            src={frontMatter.image}
          />
        )}
        <div className="prose prose-lg mb-4 max-w-[700px] dark:prose-dark">
          <MDXRemote {...source} components={components} />
        </div>
        <Card>
          <p className="m-0 text-lg">
            Znalazłeś gdzieś błąd lub literówkę? <br></br> Napisz do mnie, albo
            zrób PR na{' '}
            <a
              href={`https://github.com/mlodyoskar/opuchalski.pl/blob/main/posts/${slug}.mdx`}
              className="font-bold text-[#5686F5]  "
            >
              GitHubie!
            </a>
          </p>
        </Card>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);

  const timeToRead = readingTime(content).minutes;

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params?.slug,
      timeToRead,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
