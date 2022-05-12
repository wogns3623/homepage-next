import VercelLogo from '@public/images/vercel.svg';

export default function Footer() {
  return (
    <footer className='flex h-24 w-full items-center justify-center border-t'>
      <a
        className='flex items-center justify-center'
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'>
        Powered by <VercelLogo viewBox='0 0 283 64' className='ml-2 h-4 w-min' />
      </a>
    </footer>
  );
}
