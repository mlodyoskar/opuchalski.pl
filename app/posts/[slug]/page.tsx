import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Post, posts } from '@/velite';
import { notFound } from 'next/navigation';
import { WEBSITE_HOST_URL } from '../../../lib/constants';
import { MDXContent } from '../../../components/mdx-content';

type Props = {
  params: Promise<{ slug: string }>;
};

const components = {
  Image,
  Link,
};

const publishedPosts = posts.filter((post) => !post.draft);
const defaultOpenGraphImage = `${WEBSITE_HOST_URL}/images/preview.png`;

function getPostOpenGraphImage(post: Post) {
  if (!post.image) {
    return defaultOpenGraphImage;
  }

  return post.image.startsWith('http')
    ? post.image
    : `${WEBSITE_HOST_URL}${post.image}`;
}

async function getPost(slug: string) {
  const post = publishedPosts.find((p) => p.slug === slug);
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
          url: getPostOpenGraphImage(post),
        },
      ],
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  return publishedPosts.map((post) => ({
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
        <MDXContent code={post.content} components={components} />
      </div>
    </article>
  );
}
