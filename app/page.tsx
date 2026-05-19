import Link from 'next/link';
import type { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { posts } from '@/velite';

const contactItems = [
  { label: 'Based in Poland' },
  {
    label: 'oskarpuchalski17@gmail.com',
    href: 'mailto:oskarpuchalski17@gmail.com',
  },
  { label: '@mlodyoskar', href: 'https://github.com/mlodyoskar' },
];

const sectionDivider =
  'relative after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-white/[0.08]';

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-zinc-200">
      {children}
    </h2>
  );
}

function AboutVisual() {
  return (
    <div className="relative aspect-square w-full overflow-hidden border border-white/[0.1] bg-[#11110f]">
      <img
        src="/images/about-avatar.webp"
        alt="Abstract orange portrait silhouette representing Oskar Puchalski"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default async function HomePage() {
  const sortedPosts = posts
    .filter((post) => !post.draft)
    .toSorted((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 2xl:max-w-[92rem] 2xl:px-12">
      <section className={`${sectionDivider} py-16 md:py-20 2xl:py-24`}>
        <div className="2xl:ml-[6vw]">
          <div className="mb-8 flex items-center gap-5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-zinc-300">
            <span>Frontend / Product Engineer</span>
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
          </div>

          <h1 className="mb-0 max-w-2xl font-mono text-3xl font-normal leading-[1.4] tracking-normal text-zinc-50 sm:text-4xl md:text-5xl 2xl:max-w-3xl">
            I build products and write about building them.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 md:text-base 2xl:max-w-2xl">
            Focused on frontend systems, product quality, performance, and
            developer experience. I care about craft, clarity, and shipping work
            that makes a difference.
          </p>
        </div>
      </section>

      <section
        id="writing"
        className={`${sectionDivider} py-12 md:py-16 2xl:py-20`}
      >
        <div className="mb-8 flex items-center justify-between gap-6">
          <SectionLabel>Latest Writing</SectionLabel>
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
            {String(sortedPosts.length).padStart(2, '0')} posts
          </span>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group grid items-center gap-3 py-5 text-zinc-300 transition-colors hover:text-zinc-50 md:grid-cols-[8.75rem_1fr_4rem] 2xl:grid-cols-[9.5rem_minmax(0,1fr)_5rem]"
            >
              <time className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
                {format(parseISO(post.date), 'MMM dd, yyyy')}
              </time>
              <span className="font-mono text-base leading-6">
                {post.title}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent opacity-80 transition-transform group-hover:translate-x-1 md:text-right">
                Read
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${sectionDivider} py-12 md:py-16 2xl:py-20`}>
        <SectionLabel>About</SectionLabel>

        <div className="mt-6 grid gap-10 md:grid-cols-[14rem_1fr_18rem] md:items-start 2xl:grid-cols-[16rem_minmax(0,1fr)_22rem] 2xl:gap-16">
          <div className="max-w-52">
            <AboutVisual />
          </div>

          <div className="max-w-2xl text-sm leading-7 text-zinc-400">
            <p className="font-medium text-zinc-300">
              I am Oskar, a frontend engineer based in Poland.
            </p>
            <p>
              I specialize in building fast, accessible, and delightful web
              experiences. When I am not coding, I am either reading, writing,
              or running long distances.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-zinc-400">
            {contactItems.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <span
                  className="h-4 w-4 shrink-0 border border-white/[0.16]"
                  aria-hidden="true"
                />
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-zinc-400 transition-colors hover:text-accent-light"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="flex flex-col gap-5 py-9 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-zinc-200">
            Oskar Puchalski
          </p>
          <p className="mb-0">&copy; 2026 All rights reserved.</p>
        </div>
        <div className="flex gap-5">
          <a href="https://github.com/mlodyoskar">GitHub</a>
          <a href="mailto:oskarpuchalski17@gmail.com">Email</a>
        </div>
      </footer>
    </div>
  );
}
