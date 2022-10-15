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
          className="transform rounded-xl border-2 border-gray-300 p-4 transition-all  hover:scale-[1.01] dark:border-gray-700"
          key={slug}
        >
          <h3
            className={`mb-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent ${gradients[iterator]}`}
          >
            {title}
          </h3>
          <p className="mb-3 text-lg text-gray-900 dark:text-white">
            {description}
          </p>
        </article>
      </a>
    </Link>
  );
};

export { PostCard };
