import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Layout, WEBSITE_HOST_URL } from '../../components/Layout';
import { MetaProps } from '../../types/layout';
import { getPostFilePath, postFilePaths } from '../../utils/mdxUtils';
import readingTime from 'reading-time';
import z from 'zod';
import { BlogPostPage } from 'components/pages/PostPage';

const PostSchema = z.object({
  title: z.string(),
  description: z.string(),
  releaseDate: z.string(),
  image: z.string(),
  featured: z.boolean(),
});

const PostPage = ({
  frontMatter,
  slug,
  source,
  timeToRead,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} • opuchalski.pl`,
    description: frontMatter.description,
    image: `${WEBSITE_HOST_URL}/images/${slug}/opengraph.png`,
    date: frontMatter.releaseDate,
    type: 'article',
  };

  return (
    <Layout customMeta={customMeta}>
      <BlogPostPage
        {...frontMatter}
        mdxSource={source}
        timeToRead={timeToRead}
        slug={slug}
      />
    </Layout>
  );
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const postFilePath = getPostFilePath(params.slug);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);
  const { minutes } = readingTime(content);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
    scope: data,
  });

  const frontMatterData = PostSchema.parse(data);

  return {
    props: {
      source: mdxSource,
      frontMatter: frontMatterData,
      slug: params?.slug,
      timeToRead: Math.round(minutes),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
