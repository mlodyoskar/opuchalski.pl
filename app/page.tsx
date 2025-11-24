import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import pl from 'date-fns/locale/pl';
import { Post, posts } from '@/velite';

const PostItem = (props: Post) => {
  const { title, date, slug } = props;

  return (
    <Link
      href={`/posts/${slug}`}
      className="group -mx-6 block rounded-2xl p-6 transition-all duration-300 hover:bg-gray-800/50"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
          {title}
        </h3>
        <time className="shrink-0 font-mono text-sm text-gray-400">
          {date && format(parseISO(date), 'dd MMMM yyyy', { locale: pl })}
        </time>
      </div>
    </Link>
  );
};

export default async function HomePage() {
  const sortedPosts = posts.sort((a, b) =>
    new Date(a.date) > new Date(b.date) ? -1 : 1
  );

  return (
    <div className="flex min-h-[60vh] animate-fade-in-up flex-col justify-center py-12">
      <h1 className="mb-8 text-6xl font-bold leading-tight tracking-tighter text-white md:text-8xl">
        Cześć, <br />
        tu Oskar 👋
      </h1>
      <p className="max-w-2xl text-xl leading-relaxed text-gray-400 md:text-2xl">
        Witaj na moim blogu. Tworzę cyfrowe doświadczenia, piszę o programowaniu
        webowym i dzielę się wiedzą na temat nowoczesnych technologii.
      </p>

      <Link
        href="/about"
        className="inline-flex w-fit md:mt-10 mt-4 items-center rounded-full bg-white px-6 py-3 text-lg font-medium text-gray-900"
      >
        O mnie
        <svg
          className="ml-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>

      <section className="mt-24">
        <h2 className="mb-10 text-3xl font-bold text-white">Wybrane posty</h2>
        <div className="grid gap-8">
          {sortedPosts.map((post) => (
            <PostItem key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
