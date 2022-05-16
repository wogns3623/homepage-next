import { ReactNode, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useDarkMode } from '@hooks/common';

import { CustomLink, Switch } from '@components/common';

import Moon from '@public/icons/moon.svg';
import Sun from '@public/icons/sun.svg';
import Logo from '@public/images/logo.png';

import { HeaderMenuItem, MenuItem, SubMenu } from './Menu';

const menuItems: Array<HeaderMenuItem> = [
  {
    label: '제품',
    href: '/products',
    subMenuItems: [
      {
        label: 'AbleStack 하이퍼컨버지드 인프라',
        href: '/products/ablestack',
      },
      {
        label: 'Ablestack 하이퍼컨버지드 어플라이언스',
        href: '/products/ablestack-appliance',
      },
      {
        label: 'Ablestack 가상데스크탑인프라',
        href: '/products/ablestack-vdi',
      },
    ],
  },
  {
    label: '솔루션',
    href: '/solutions',
    subMenuItems: [
      {
        label: '프라이빗 클라우드',
        href: '/solutions/private-cloud',
      },
      {
        label: '가상화/클라우드',
        href: '/solutions/virtualization',
      },
      {
        label: '감시 시스템',
        href: '/solutions/monitoring',
      },
      {
        label: '해외지사/원격근무',
        href: '/solutions/remote-work',
      },
      {
        label: '엣지 컴퓨팅',
        href: '/solutions/edge-computing',
      },
      {
        label: '클라우드네이티브',
        href: '/solutions/cloudnative',
      },
    ],
  },
  {
    label: '성공사례',
    href: '/stories',
  },
  {
    label: '회사소개',
    href: '/about-us',
    subMenuItems: [
      {
        label: '채널 협력',
        href: '/about-us/partners',
      },
      {
        label: '문의하기',
        href: '/about-us#contact',
      },
      {
        label: '찾아오시는길',
        href: '/about-us#path',
      },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];

export default function Header() {
  const { asPath } = useRouter();
  const [subMenuItems, setSubMenuItems] = useState<Array<HeaderMenuItem> | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <header className='fixed z-20 flex h-16 w-full justify-center'>
      <nav
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => {
          setIsMenuOpen(false);
          setSubMenuItems(undefined);
        }}
        className='group relative flex h-fit max-w-screen-xl flex-1 flex-col rounded-b-lg bg-white shadow-md transition-transform dark:border-0.5 dark:border-t-0 dark:border-none dark:bg-stone-900 dark:text-white dark:shadow-stone-700'>
        {/* Main menu section */}
        <section className='flex h-16 w-full items-center'>
          {/* Logo */}
          <div className=''>
            <CustomLink href='/'>
              <div className='h-32 w-52'>
                <div className='relative h-full max-w-full'>
                  <Image
                    src={Logo}
                    alt='Ablecloud logo'
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(56%) sepia(22%) saturate(2062%) hue-rotate(158deg) brightness(104%) contrast(75%)',
                    }}
                    layout='fill'
                    objectFit='contain'
                    quality={100}
                  />
                </div>
              </div>
            </CustomLink>
          </div>

          <div className='flex h-full flex-1'>
            <ul className='flex h-full flex-1 justify-between'>
              {menuItems.map(item => (
                <li
                  className='flex-1'
                  onMouseEnter={() => setSubMenuItems(item.subMenuItems)}
                  key={item.href}>
                  <MenuItem {...item} selected={asPath === item.href} />
                </li>
              ))}
            </ul>
          </div>

          {/* Header right section */}
          <div className='flex items-center justify-center space-x-4 px-8'>
            {/* <Switch
              className='bg-slate-600'
              value={Boolean(darkMode)}
              setValue={setDarkMode}
              checkedChildren={<Moon className='h-full w-full fill-slate-100' />}
              unCheckedChildren={<Sun className='h-full w-full fill-slate-100' />}
            /> */}

            {/* Demo button */}
            <CustomLink
              href='/demo'
              className='flex h-10 items-center justify-center rounded-full bg-sky-400 py-4 px-8 text-white hover:text-white'>
              Demo
            </CustomLink>
          </div>
        </section>

        {/* Sub menu section */}
        {isMenuOpen && subMenuItems && (
          <section className='flex h-full w-full items-center border-t-0.5 border-slate-200 dark:border-stone-700'>
            <SubMenu items={subMenuItems} />
          </section>
        )}
      </nav>
    </header>
  );
}
