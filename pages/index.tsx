import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { Button } from '../components/Button';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { PostType } from '../types/post';
import { FiArrowUpRight } from 'react-icons/fi';
import { PostsList } from '../components/PostsList';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <Layout>
      <h1 className="md:text-5xl md:leading-normal">
        Cześć, tu Oskar 👋 <br></br> Witaj na moim blogu. Znajdziesz tu
        informacje na tematy zarówno frontendowe, jaki i backendowe oraz tematy
        wokoło programistyczne
      </h1>
      <div>
        <Button>
          O mnie <FiArrowUpRight size="1.4rem" />
        </Button>
      </div>
      <section>
        <h2>Featured posts</h2>
        <PostsList posts={posts} />
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['date', 'description', 'slug', 'title']);

  return {
    props: { posts },
  };
};

export default Index;
