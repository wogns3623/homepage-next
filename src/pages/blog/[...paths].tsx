import { Suspense, useMemo } from 'react';

import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MDXRemote } from 'next-mdx-remote';

import { getAllPostFilePaths, getPost } from '@helpers/post';
import { Post } from '@types';

import { Meta } from '@components/head';

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    console.log('page fallback', post, post && post.slug);
    return <div>Loading...</div>;
  }

  console.log('page rendered', post.slug);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <Meta.OpenGraph {...post.openGraph} />
      </Head>

      <article className='flex h-full w-full flex-col items-center'>
        <header className='space-y-8 py-16'>
          {/* breadcrumb */}
          <nav className='flex items-center last:after:content-[""]'>
            {post.categories.map(category => (
              <p key={category} className='after:content-[" > "]'>
                {category}
              </p>
            ))}
          </nav>

          <h1>{post.title}</h1>

          {post.summary && <p>{post.summary}</p>}

          <div className='flex space-x-4'>
            {post.author && <p>{post.author}</p>}

            <p>{new Date(post.date).toISOString()}</p>
          </div>
        </header>

        <section className='w-full flex-1 bg-slate-200 '>
          <MDXRemote {...post.content} />
        </section>

        <footer>
          {/* more readable posts */}
          {/* pagenation */}
        </footer>
      </article>
    </>
  );
}

type PostPageParams = {
  paths: string[];
};

export const getStaticProps: GetStaticProps<PostPageProps, PostPageParams> = async ({
  params: { paths } = { paths: [] },
}) => {
  try {
    const post = await getPost(paths);

    return { props: { post } };
  } catch (e) {
    console.log(e);
    return { props: {}, notFound: true };
  }
};

export async function getStaticPaths() {
  const postPaths = await getAllPostFilePaths();

  console.log('generated postPaths', postPaths);

  return {
    paths: postPaths.map(postPath => {
      return {
        params: {
          paths: postPath,
        },
      };
    }),
    fallback: false,
  };
}
