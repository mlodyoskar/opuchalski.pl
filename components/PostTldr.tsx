import type { ReactNode } from 'react';

interface PostTldrProps {
  children: ReactNode;
  title: string;
  eyebrow?: string;
  id?: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function PostTldr({
  children,
  title,
  eyebrow = 'TL;DR',
  id,
}: PostTldrProps) {
  const headingId = id ?? `post-tldr-${slugify(title)}`;

  return (
    <section className="post-tldr" aria-labelledby={headingId}>
      <p className="post-tldr__eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      <div className="post-tldr__content">{children}</div>
    </section>
  );
}
