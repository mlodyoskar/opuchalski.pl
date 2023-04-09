import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';

const components = {
  Head,
  Image,
  Link,
};

interface Props {
  mdxSource: any;
}

export const MDXContent = ({ mdxSource }: Props) => {
  return <MDXRemote {...mdxSource} components={components} />;
};
