import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  link?: string;
}

const buttonStyles =
  'flex gap-2 items-center bg-primary-100 max-w-fit dark:border-0  dark:bg-primary-800 rounded py-2 px-4 text-[#5686F5] text-lg hover:shadow-btn hover:shadow-primary-700 hover:transition-shadow hover:duration-300';

const Button = ({ children, link }: Props) => {
  if (link) {
    return (
      <Link href={link}>
        <a className="flex gap-2 items-center bg-primary-100 max-w-fit dark:border-0  dark:bg-primary-800 rounded py-2 px-4 text-[#5686F5] text-lg hover:shadow-btn hover:shadow-primary-700 transition-shadow duration-500">
          {children}
        </a>
      </Link>
    );
  } else {
    return <button className={buttonStyles}>{children}</button>;
  }
};

export { Button };
