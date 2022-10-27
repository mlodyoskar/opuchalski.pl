import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  link?: string;
}

const buttonStyles =
  'flex gap-2 items-center bg-primary-100 max-w-fit dark:border-0  dark:bg-primary-800 rounded py-2 lg:px-4 text-[#5686F5] text-lg hover:shadow-btn hover:shadow-primary-700 hover:transition-shadow hover:duration-300';

const Button = ({ children, link }: Props) => {
  if (link) {
    return (
      <Link
        href={link}
        className="flex max-w-fit items-center  gap-2 whitespace-nowrap  rounded bg-primary-100  py-2 px-4 text-lg text-[#5686F5] transition-shadow duration-500 hover:shadow-btn hover:shadow-primary-700 dark:border-0 dark:bg-primary-800 md:px-4"
      >
        {children}
      </Link>
    );
  } else {
    return <button className={buttonStyles}>{children}</button>;
  }
};

export { Button };
