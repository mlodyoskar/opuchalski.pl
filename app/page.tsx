import Link from 'next/link';
import type { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { posts } from '@/velite';

const contactItems = [
  { label: 'Based in Poland', icon: 'home' },
  {
    label: 'oskarpuchalski17@gmail.com',
    href: 'mailto:oskarpuchalski17@gmail.com',
    icon: 'email',
  },
  {
    label: '@mlodyoskar',
    href: 'https://github.com/mlodyoskar',
    icon: 'github',
  },
];

type ContactIcon = (typeof contactItems)[number]['icon'];

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

function ContactIcon({ name }: { name: ContactIcon }) {
  const className = 'h-4 w-4';

  if (name === 'email') {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === 'github') {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.97c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.36-.01 2.46-.01 2.79 0 .27.18.59.69.49A10.17 10.17 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 10.5 9-7 9 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
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
                <span className="flex h-4 w-4 shrink-0 items-center justify-center text-accent">
                  <ContactIcon name={item.icon} />
                </span>
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
