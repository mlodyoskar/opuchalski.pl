import { GetStaticProps } from 'next';
import React from 'react';
import { Button } from '../components/Button';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { PostType } from '../types/post';
import { FiArrowUpRight, FiTwitter } from 'react-icons/fi';
import { PostsList } from '../components/PostsList';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import pl from 'date-fns/locale/pl';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  const featuredPosts = posts.filter((post) => post.featured);
  return (
    <Layout>
      <h1 className="md:text-5xl md:leading-normal">
        Cześć, tu Oskar 👋 <br></br> Witaj na moim blogu. Znajdziesz tu
        informacje na tematy zarówno frontendowe, jaki i backendowe oraz tematy
        wokoło programistyczne
      </h1>
      <div className="flex flex-wrap gap-4">
        <Button link="/about">
          O mnie <FiArrowUpRight size="1.4rem" />
        </Button>
        <Button link="/about">
          @puchalskioskar <FiTwitter size="1.4rem" />
        </Button>
      </div>
      <section className="mt-16">
        <h2 className="text-3xl">Wybrane posty</h2>
        <PostsList posts={featuredPosts} />
      </section>
      <section className="mt-16">
        <h2 className="text-3xl">Wszystkie posty</h2>
        <div className="my-2 flex flex-col gap-4">
          {posts.map(({ title, date, slug }) => {
            return (
              <Link key={slug} href={`/posts/${slug}`}>
                <a className="group flex h-14 items-center gap-8 rounded-xl px-1 py-2 transition-all  hover:bg-[#97b6fd1c]">
                  <p className="m-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {date && format(parseISO(date), 'dd MMM ', { locale: pl })}
                  </p>
                  <p className="m-0 text-lg font-semibold text-gray-900 group-hover:text-[#5686F5] dark:text-white">
                    {title}
                  </p>
                </a>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'date',
    'description',
    'slug',
    'title',
    'featured',
  ]);
  return {
    props: { posts },
  };
};

export default Index;
