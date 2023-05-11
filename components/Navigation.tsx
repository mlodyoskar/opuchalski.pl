import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  return (
    <nav>
      <Link href="/">
        <span className="sr-only">opuchalski.pl</span>
        <Image alt="" src="/images/logo.svg" width={48} height={48} />
      </Link>
    </nav>
  );
};

export { Navigation };
