import { Layout as AntdLayout } from 'antd';

import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutProps } from './Layout.types';

const { Content } = AntdLayout;

export default function Layout({ children, router }: LayoutProps) {
  return (
    <AntdLayout className='flex min-h-screen flex-col items-center'>
      <Header />

      <Content className='flex flex-1 flex-col items-center pt-16 pb-2 text-center'>
        {children}
      </Content>

      <Footer />
    </AntdLayout>
  );
}
