import { ReactNode, useState } from 'react';

import { useRouter } from 'next/router';

import { cls } from '@utils';

import { CustomLink } from '@components/common';

interface BaseHeaderMenuItem {
  label?: ReactNode;
  description?: string;
  type?: 'group';
  href?: string;
  subMenuItems?: Array<HeaderMenuItem>;
}

interface GroupHeaderMenuItem extends BaseHeaderMenuItem {
  type: 'group';
  subMenuItems: Array<HeaderMenuItem>;
}

interface NormalHeaderMenuItem extends BaseHeaderMenuItem {
  type?: undefined;
}

type HeaderMenuItem = NormalHeaderMenuItem | GroupHeaderMenuItem;

const menuItems: Array<HeaderMenuItem> = [
  {
    label: 'Products',
    href: '/products',
    subMenuItems: [
      {
        type: 'group',
        label: 'Hyperconverged Infrastructure',
        href: '/products/ablestack',
        subMenuItems: [
          { label: 'Cube - OS', href: '/products/ablestack#Cube', description: 'AbleStack Cube' },
          {
            label: 'Glue - Distributed Storage',
            href: '/products/ablestack#Glue',
            description: 'AbleStack Glue',
          },
          {
            label: 'Cell - Hypervisor',
            href: '/products/ablestack#Cell',
            description: 'AbleStack Cell',
          },
          {
            label: 'Mold - Hypervisor Management & Orchestration',
            href: '/products/ablestack#Mold',
            description: 'AbleStack Mold',
          },
          {
            label: 'Koral - Kubernetes Cluster',
            href: '/products/ablestack#Koral',
            description: 'Use Kubernetes on Mold in minutes',
          },
        ],
      },
      {
        type: 'group',
        label: 'Storage',
        href: '/products/storage',
        subMenuItems: [
          {
            label: 'Volume - Block Storage',
            href: '/products/storage#Volume',
          },
          {
            label: 'Files - File System',
            href: '/products/storage#Files',
          },
          {
            label: 'Object - Object Storage',
            href: '/products/storage#Object',
          },
        ],
      },
      {
        type: 'group',
        label: 'Management',
        href: '/products/management',
        subMenuItems: [
          {
            label: 'Wall - Monitoring platform',
            href: '/products/management#Wall',
          },
          {
            label: 'Genie - Continuous Delivery',
            href: '/products/management#Genie',
            description: 'Configure Continuous Delivery using YAML & Python',
          },
          {
            label: 'Station - Platform as a Service',
            href: '/products/management#Station',
          },
        ],
      },
      {
        type: 'group',
        label: 'Network & Security',
        href: '/products/network',
        subMenuItems: [
          {
            label: 'Track - Virtual Networking',
            href: '/products/network#Track',
            description: 'AbleStack Track',
          },
          {
            label: 'Atom - Micro Segmentation',
            href: '/products/network#Atom',
            description: 'AbleStack Atom',
          },
        ],
      },
      {
        type: 'group',
        label: 'End user tools',
        href: '/products/end-user-tools',
        subMenuItems: [
          {
            label: 'Works - Desktop as a Service',
            href: '/products/end-user-tools#Works',
            description: 'Provide a desktop environment on browser platform',
          },
          {
            label: 'Mommoss - collaboration tool for experts',
            href: '/products/end-user-tools#Mommoss',
            description: 'Collaborate with experts in a team',
          },
        ],
      },
      {
        type: 'group',
        label: 'Hardware',
        href: '/products/hardware',
        subMenuItems: [
          {
            label: 'AbleStack Appliance',
            href: '/products/hardware',
          },
        ],
      },
    ],
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Stories', href: '/stories' },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog', href: '/blog' },
  { label: 'Service/Support', href: '/service-support' },
];

export default function Header() {
  const { asPath } = useRouter();
  const [subMenuExpanded, setSubMenuExpanded] = useState<boolean>(false);

  return (
    <header className={cls`fixed z-20 flex h-12 w-full justify-center`}>
      <div
        className={cls`relative z-20 box-border flex h-full max-w-screen-xl flex-1 justify-between bg-white px-4 shadow-md ${
          !subMenuExpanded && 'rounded-b-lg'
        }`}>
        {/* Logo */}
        <div className=''>
          <MenuItem href='/'>
            <h1>LOGO</h1>
          </MenuItem>
        </div>

        <nav className='flex flex-1 px-12'>
          <ul className='flex flex-1 justify-between'>
            {menuItems.map(item => (
              <li
                className=''
                onMouseOver={() => setSubMenuExpanded(Boolean(item.subMenuItems))}
                onMouseOut={() => setSubMenuExpanded(false)}
                key={item.href}>
                <MenuItem {...item} selected={asPath === item.href} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Header right section */}
        <div>{/* Dark mode switch */}</div>
      </div>
    </header>
  );
}

type MenuItemProps = HeaderMenuItem & {
  selected?: boolean;
  children?: ReactNode;
  className?: string;
};

function MenuItem({ label, href, children, subMenuItems, selected, className }: MenuItemProps) {
  return (
    <div className={cls`group flex h-full w-full place-items-center ${className}`}>
      <CustomLink
        href={href}
        className={cls`flex h-full w-full place-items-center px-2 ${{
          'text-blue-500': selected,
        }}`}>
        {label ?? children}
      </CustomLink>

      {/* Sub menu */}
      {subMenuItems && <SubMenu items={subMenuItems} className='' />}
    </div>
  );
}

interface SubMenuProps {
  items: Array<HeaderMenuItem>;
  className?: string;
}

function SubMenu({ items, className }: SubMenuProps) {
  const subMenuBlock = (subItem: HeaderMenuItem) => (
    <li key={subItem.href} className='space-y-2'>
      <CustomLink href={subItem.href}>
        <p className=''>{subItem.label}</p>

        {subItem.description && <p className='text-xs text-slate-300'>{subItem.description}</p>}
      </CustomLink>
    </li>
  );

  return (
    <ul
      className={cls`absolute top-full left-0 -z-10 hidden w-full grid-cols-3 gap-y-16 gap-x-8 rounded-b-lg border-t-1 border-t-slate-200 bg-white  px-32 py-8 shadow-md group-hover:grid ${className}`}>
      {items.map(item => {
        if (item.type === 'group') {
          return (
            <li key={item.href} className='flex flex-col'>
              <ul className='space-y-4'>
                {/* group section header */}
                <li>
                  <CustomLink href={item.href} className='text-sm text-slate-400'>
                    {item.label}
                  </CustomLink>
                </li>

                {item.subMenuItems.map(subMenuBlock)}
              </ul>
            </li>
          );
        } else {
          return (
            <li key={item.href}>
              <MenuItem {...item} />
            </li>
          );
        }
      })}
    </ul>
  );
}
