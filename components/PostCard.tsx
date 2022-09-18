import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  slug: string;
  iterator?: number;
}

const gradients = [
  'from-blue-700 via-violet-400 to-violet-900',
  'from-green-300 via-blue-500 to-purple-600',
  'from-cyan-500 via-indigo-400 to-rose-400',
] as const;

const PostCard = ({ title, description, slug, iterator = 1 }: Props) => {
  return (
    <Link key={slug} href={`/posts/${slug}`}>
      <a className="">
        <article
          className="hover:scale-[1.01] transform transition-all border-2 dark:border-gray-700 border-gray-300  rounded-xl p-4"
          key={slug}
        >
          <h3
            className={`mb-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradients[iterator]}`}
          >
            {title}
          </h3>
          <p className="mb-3 text-lg dark:text-white text-gray-900">
            {description}
          </p>
        </article>
      </a>
    </Link>
  );
};

export { PostCard };
