import { useMemo, useState } from 'react';

import type { AppProps } from 'next/app';
import Image from 'next/image';

import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from 'mdx/types';

import { DarkModeProvider } from '@hooks/common/useDarkMode';

import { Layout } from '@components/layout';
import '@styles/globals.css';

const ResponsiveImage = (props: any) => <Image alt={props.alt} layout='responsive' {...props} />;

const components: MDXComponents = {
  img: ResponsiveImage,
};

export default function CustomApp({ Component, pageProps, router }: AppProps) {
  return (
    <MDXProvider components={components}>
      {/* <DarkModeProvider> */}
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
      {/* </DarkModeProvider> */}
    </MDXProvider>
  );
}
