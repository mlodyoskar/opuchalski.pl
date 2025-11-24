import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { POSTS_PATH, postFilePaths } from '../../../utils/mdxUtils';
import { Card } from '../../../components/Card';
import { WEBSITE_HOST_URL } from '../../../lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

const components = {
  Image,
  Link,
};

async function getPost(slug: string) {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(postFilePath)) {
    return null;
  }
  const source = fs.readFileSync(postFilePath, 'utf8');
  const { content, data } = matter(source);

  return {
    content,
    frontMatter: data,
    timeToRead: readingTime(content).minutes,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }
  const { frontMatter } = post;
  return {
    title: `${frontMatter.title} • opuchalski.pl`,
    description: frontMatter.description,
    openGraph: {
      title: `${frontMatter.title} • opuchalski.pl`,
      description: frontMatter.description,
      url: `${WEBSITE_HOST_URL}/posts/${slug}`,
      type: 'article',
      images: [
        {
          url: `${WEBSITE_HOST_URL}/images/${slug}/opengraph.png`,
        },
      ],
      publishedTime: frontMatter.date,
    },
  };
}

export async function generateStaticParams() {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ slug }));

  return paths;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { content, frontMatter } = post;

  return (
    <article className="flex flex-col md:items-center">
      <h1 className="mb-6 text-center text-4xl leading-tight text-white sm:text-5xl sm:leading-tight">
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
      <div className="prose prose-lg prose-dark mb-4 max-w-[700px]">
        <MDXRemote
          source={content}
          components={components as any}
          options={{
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
            },
          }}
        />
      </div>
      <footer className="w-full max-w-[700px]">
        <Card>
          <p className="m-0 text-xl">
            Znalazłeś błąd lub literówkę? <br></br> Napisz do mnie, albo zrób PR
            na{' '}
            <a
              href={`https://github.com/mlodyoskar/opuchalski.pl/blob/main/posts/${slug}.mdx`}
              className="font-bold"
            >
              GitHubie!
            </a>
          </p>
        </Card>
      </footer>
    </article>
  );
}
