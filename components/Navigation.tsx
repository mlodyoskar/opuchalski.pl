'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? 'underline decoration-wavy decoration-blue-500 decoration-2 underline-offset-8'
      : '';
  };

  return (
    <nav className="flex w-full items-center justify-between">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="opuchalski.pl - Strona główna"
          width={60}
          height={60}
          priority
          className="h-14 w-auto"
        />
      </Link>
      <div>
        <Link
          href="/portfolio"
          aria-current={pathname === '/portfolio' ? 'page' : undefined}
          className={`py-4 px-6 text-lg text-gray-300 transition-colors hover:text-white ${isActive(
            '/portfolio'
          )}`}
        >
          Portfolio
        </Link>
        <Link
          href="/about"
          aria-current={pathname === '/about' ? 'page' : undefined}
          className={`py-4 px-6 text-lg text-gray-300 transition-colors hover:text-white ${isActive(
            '/about'
          )}`}
        >
          O mnie
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
