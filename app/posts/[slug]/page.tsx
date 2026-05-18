import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Post, posts } from '@/velite';
import { notFound } from 'next/navigation';
import { WEBSITE_HOST_URL } from '../../../lib/constants';
import { MDXContent } from '../../../components/mdx-content';
import PostTldr from '../../../components/PostTldr';

type Props = {
  params: Promise<{ slug: string }>;
};

const components = {
  Image,
  Link,
  PostTldr,
};

const sectionDivider =
  'relative after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-white/[0.08]';

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
    <article className="mx-auto max-w-6xl px-6 md:px-8" lang={post.language}>
      <header className={`${sectionDivider} py-12 md:py-16`}>
        <Link
          href="/#writing"
          className="mb-10 inline-flex items-center gap-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-zinc-500 transition-colors hover:text-accent-light"
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          Writing
        </Link>

        <div className="grid gap-10 md:grid-cols-[10rem_1fr] md:items-start">
          <div className="space-y-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            <p className="mb-0 text-zinc-300">Article</p>
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'MMM dd, yyyy')}
            </time>
          </div>

          <div className="max-w-3xl">
            <h1 className="mb-0 font-mono text-3xl font-normal leading-[1.35] tracking-normal text-zinc-50 sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 mb-0 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
              {post.description}
            </p>
          </div>
        </div>
      </header>

      {post.image && (
        <div className={`${sectionDivider} py-8 md:py-10`}>
          <div className="relative overflow-hidden border border-white/[0.1] bg-[#11110f]">
            <Image
              alt={post.imageAlt || `${post.title} article image`}
              className="h-auto w-full"
              width={1200}
              height={686}
              priority
              src={post.image}
            />
          </div>
        </div>
      )}

      <div className="grid gap-10 py-10 md:grid-cols-[10rem_minmax(0,700px)] md:py-14">
        <aside className="hidden border-t border-white/[0.08] pt-5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 md:block">
          Read
        </aside>
        <div className="prose prose-lg post-prose mb-4 max-w-none">
          <MDXContent code={post.content} components={components} />
        </div>
      </div>
    </article>
  );
}
