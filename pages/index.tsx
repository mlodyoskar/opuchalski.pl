import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { FiArrowUpRight } from 'react-icons/fi';
import { PostsList } from '../components/PostsList';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import pl from 'date-fns/locale/pl';
import { PostType } from '../types/post';

export const HomePage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const featuredPosts = posts.filter(
    (post) => post.featured
  ) as unknown as PostType[];
  return (
    <Layout>
      <h1 className="md:text-5xl md:leading-normal">
        Cześć, tu Oskar 👋 <br></br> Witaj na moim blogu. Znajdziesz tu
        informacje na temat programowania webowego i innych ciekawych rzeczy!
      </h1>
      <div className="flex flex-wrap gap-4">
        <Button link="/about">
          O mnie <FiArrowUpRight size="1.4rem" />
        </Button>
      </div>
      {featuredPosts.length >= 1 && (
        <section className="mt-16">
          <h2 className="text-3xl">Wybrane posty</h2>
          <PostsList posts={featuredPosts} />
        </section>
      )}
      {posts.length >= 1 && (
        <section className="mt-16">
          <h2 className="text-3xl">Wszystkie posty</h2>
          <div className="my-2 flex flex-col gap-4">
            {posts.map(({ title, date, slug }) => {
              return (
                <Link
                  key={slug}
                  href={`/posts/${slug}`}
                  className="md-gap-8 group flex h-14 items-center rounded-xl px-1 py-2 transition-all  hover:bg-[#97b6fd1c]"
                >
                  <p className="m-0 whitespace-nowrap px-4 text-sm text-gray-500 dark:text-gray-300">
                    {date && format(parseISO(date), 'dd MMM ', { locale: pl })}
                  </p>
                  <p className="m-0 text-lg font-semibold text-gray-900 group-hover:text-[#5686F5] dark:text-white">
                    {title}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
};

export default HomePage;
