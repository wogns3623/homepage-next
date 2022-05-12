import { Layout as AntdLayout } from 'antd';

import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutProps } from './Layout.types';

const { Content } = AntdLayout;

export default function Layout({ children, router }: LayoutProps) {
  return (
    <section className='flex min-h-screen flex-col items-center dark:bg-stone-900'>
      <Header />

      <main className='my-24 flex h-fit w-full flex-1 flex-col items-center px-32'>{children}</main>

      <Footer />
    </section>
  );
}
