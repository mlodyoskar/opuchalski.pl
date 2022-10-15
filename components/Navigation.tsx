import Link from 'next/link';
import React from 'react';

const Navigation = () => {
  return (
    <nav>
      <Link href="/">
        <a className="py-4 pr-6 text-xl text-gray-900 dark:text-white ">
          opuchalski.pl
        </a>
      </Link>
    </nav>
  );
};

export default Navigation;
