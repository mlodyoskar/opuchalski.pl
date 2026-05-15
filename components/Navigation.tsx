'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => (
  <nav className="flex w-full items-center justify-between">
    <Link href="/">
      <Image
        src="/logo.png"
        alt="opuchalski.pl - Strona główna"
        width={56}
        height={56}
        priority
        className="h-14 w-14"
      />
    </Link>
  </nav>
);

export default Navigation;
