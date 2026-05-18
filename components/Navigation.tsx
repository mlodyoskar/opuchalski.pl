'use client';

import Link from 'next/link';

const Navigation = () => (
  <nav className="flex w-full items-center justify-between" aria-label="Primary">
    <Link
      href="/"
      className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.34em] text-zinc-100 transition-colors hover:text-accent-light"
    >
      Oskar Puchalski
    </Link>
  </nav>
);

export default Navigation;
