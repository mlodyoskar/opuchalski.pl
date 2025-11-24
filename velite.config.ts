import { defineConfig, s } from 'velite';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          description: s.string().max(200),
          slug: s.path(),
          date: s.isodate(),
          image: s.string().optional(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          slug: data.slug.replace(/^posts\//, ''),
          permalink: `/posts/${data.slug.replace(/^posts\//, '')}`,
        })),
    },
  },
  // mdx: {
  //   rehypePlugins: [
  //     rehypeSlug,
  //     rehypeCodeTitles,
  //     rehypePrism,
  //     [
  //       rehypeAutolinkHeadings,
  //       {
  //         properties: {
  //           className: ['anchor'],
  //         },
  //       },
  //     ],
  //   ],
  //   remarkPlugins: [remarkGfm],
  // },
});
