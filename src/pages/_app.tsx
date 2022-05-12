import { useMemo, useState } from 'react';

import type { AppProps } from 'next/app';

import { DarkModeProvider } from '@hooks/common/useDarkMode';

import { Layout } from '@components/Layout';
import '@styles/globals.css';

export default function CustomApp({ Component, pageProps, router }: AppProps) {
  return (
    <DarkModeProvider>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </DarkModeProvider>
  );
}
