import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/velite';
import { notFound } from 'next/navigation';
import { WEBSITE_HOST_URL } from '../../../lib/constants';
import { Card } from '../../../components/Card';
import { MDXContent } from '../../../components/mdx-content';

type Props = {
  params: Promise<{ slug: string }>;
};

const components = {
  Image,
  Link,
};

async function getPost(slug: string) {
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} • opuchalski.pl`,
    description: post.description,
    openGraph: {
      title: `${post.title} • opuchalski.pl`,
      description: post.description,
      url: `${WEBSITE_HOST_URL}/posts/${slug}`,
      type: 'article',
      images: [
        {
          url: `${WEBSITE_HOST_URL}/images/${slug}/opengraph.png`,
        },
      ],
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col md:items-center">
      <h1 className="mb-6 text-center text-4xl leading-tight text-white sm:text-5xl sm:leading-tight">
        {post.title}
      </h1>

      {post.image && (
        <Image
          alt=""
          className="rounded-xl"
          width={700}
          height={400}
          src={post.image}
        />
      )}
      <div className="prose prose-lg prose-dark mb-4 max-w-[700px]">
        <MDXContent code={post.content} components={components as any} />
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
