import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutProps } from './Layout.types';

export default function Layout({ children, router }: LayoutProps) {
  return (
    <section className='flex min-h-screen flex-col items-center dark:bg-stone-900'>
      <Header />

      <main className='flex h-fit w-full flex-1 flex-col items-center py-24 px-32'>{children}</main>

      <Footer />
    </section>
  );
}
