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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <Meta.OpenGraph {...post.openGraph} />
      </Head>

      <article className='prose flex h-full w-full flex-col dark:prose-invert lg:prose-xl lg:prose-p:my-2'>
        <header className='flex flex-col space-y-4 pb-8'>
          {/* breadcrumb */}
          <nav className='flex items-center last:after:content-[""]'>
            {post.categories.map(category => (
              <span key={category} className='after:content-[" > "]'>
                {category}
              </span>
            ))}
          </nav>

          <h1>{post.title}</h1>

          {post.summary && <p>{post.summary}</p>}

          <div className='flex space-x-4 self-end'>
            {post.author && <p>{post.author}</p>}

            <p className='not-prose'>{new Date(post.date).toISOString()}</p>
          </div>
        </header>

        <section className='w-full flex-1'>
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
