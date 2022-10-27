import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <Link
        href="/"
        className="py-4 pr-6 text-xl text-gray-900 dark:text-white "
      >
        opuchalski.pl
      </Link>
    </nav>
  );
};

export default Navigation;
