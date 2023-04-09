import { Card } from 'components/Card';
import Image from 'next/image';
import { MDXContent } from 'components/MDXContent';

interface Props {
  title: string;
  releaseDate: string;
  timeToRead: number;
  image: string;
  mdxSource: any;
  slug: string;
}

export const BlogPostPage = ({
  title,
  releaseDate,
  timeToRead,
  image,
  mdxSource,
  slug,
}: Props) => {
  const minuteForm = timeToRead === 1 ? 'minuta' : 'minut';
  const formattedDate = new Date(releaseDate).toLocaleDateString('pl-PL', {
    dateStyle: 'medium',
  });

  return (
    <article className="flex flex-col md:items-center">
      <h1 className="mb-2 text-center text-4xl leading-tight text-gray-900 dark:text-white sm:text-5xl sm:leading-tight">
        {title}
      </h1>
      <p className="text-sm text-center text-gray-300 ">
        {formattedDate} | {timeToRead} {minuteForm} czytania
      </p>

      <Image
        alt=""
        className="rounded-xl mt-4"
        width={700}
        height={400}
        src={image}
      />

      <div className="prose prose-lg mb-4 max-w-[700px] dark:prose-dark">
        <MDXContent mdxSource={mdxSource} />
      </div>
      <footer className="w-full max-w-[700px]">
        <Card>
          <p className="m-0 text-xl">
            Znalazłeś błąd lub literówkę? <br></br> Napisz do mnie, albo zrób PR
            na{' '}
            <a
              href={`https://github.com/mlodyoskar/opuchalski.pl/blob/main/posts/${slug}.mdx`}
              className="font-bold"
            >
              GitHubie!
            </a>
          </p>
        </Card>
      </footer>
    </article>
  );
};
