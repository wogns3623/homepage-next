import Link from 'next/link';
import { Router } from 'next/router';

import { Menu, MenuProps, Switch } from 'antd';

// import { useDarkMode } from '@hooks/common/useDarkMode';

const centerItems: MenuProps['items'] = [
  {
    label: <Link href='/products'>Products</Link>,
    key: '/products',
    children: [
      { label: <Link href='/products/ablestack'>Ablestack</Link>, key: '/products/ablestack' },
    ],
  },
  { label: <Link href='/solutions'>Solutions</Link>, key: '/solutions' },
  { label: <Link href='/stories'>Stories</Link>, key: '/stories' },
  { label: <Link href='/partners'>Partners</Link>, key: '/partners' },
  { label: <Link href='/blog'>Blog</Link>, key: '/blog' },
  {
    label: <Link href='/service-support'>Service/Support</Link>,
    key: '/service-support',
  },
];

export default function Header({ router, className }: { router: Router; className?: string }) {
  // const { isDarkMode, setIsDarkMode } = useDarkMode();
  return (
    <header className={['fixed flex w-full justify-center', className].join(' ')}>
      <div className='flex h-full max-w-screen-xl flex-1 items-center justify-between space-x-4 rounded-b-lg bg-white px-4 shadow-md'>
        <Link href='/'>
          <h1>LOGO</h1>
        </Link>

        <Menu
          selectedKeys={[router.asPath]}
          items={centerItems}
          mode='horizontal'
          className='flex h-full flex-1 justify-center'
        />

        <div>
          {/* dark mode switch */}
          {/* <Switch
            className='bg-slate-600'
            checked={Boolean(isDarkMode)}
            checkedChildren='🌜'
            unCheckedChildren='🌞'
            onChange={checked => {
              setIsDarkMode(checked);
            }}
          /> */}
        </div>
      </div>
    </header>
  );
}
