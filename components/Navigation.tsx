import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  return (
    <nav>
      <Link href="/" className=" text-gray-900 dark:text-white ">
        <Image
          alt={"Oskar's blog logo"}
          src="/images/logo.svg"
          width={48}
          height={48}
        />
        {/* opuchalski.pl */}
      </Link>
    </nav>
  );
};

export { Navigation };
