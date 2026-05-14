import { defineConfig, s } from 'velite';

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
          draft: s.boolean().default(false),
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
