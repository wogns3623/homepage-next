import { ReactNode } from 'react';

import { cls } from '@utils';

import { CustomLink } from '@components/common';

import { HeaderMenuItem } from './Menu.types';

export type MenuItemProps = HeaderMenuItem & {
  selected?: boolean;
  children?: ReactNode;
  className?: string;
};

export function MenuItem({
  label,
  href,
  children,
  subMenuItems,
  selected,
  className,
}: MenuItemProps) {
  return (
    <div className={cls`group flex h-full w-full items-center justify-center ${className}`}>
      <CustomLink
        href={href}
        className={cls`flex h-full w-full items-center justify-center px-2 align-middle ${{
          'text-blue-500': selected,
        }}`}>
        <div>{label ?? children}</div>
      </CustomLink>
    </div>
  );
}

export interface SubMenuProps {
  items: Array<HeaderMenuItem>;
  className?: string;
}

export function SubMenu({ items, className }: SubMenuProps) {
  const subMenuBlock = (subItem: HeaderMenuItem) => (
    <li key={subItem.href} className='space-y-2'>
      <CustomLink href={subItem.href}>
        <p className=''>{subItem.label}</p>

        {subItem.description && <p className='text-xs text-slate-300'>{subItem.description}</p>}
      </CustomLink>
    </li>
  );

  return (
    <ul className={cls`grid w-full grid-cols-3 rounded-b-lg dark:bg-stone-900 ${className}`}>
      {items.map(item => {
        if (item.type === 'group') {
          return (
            <li className='flex flex-col' key={item.href}>
              <ul className='space-y-4'>
                {/* group section header */}
                <li>
                  <CustomLink href={item.href} className='p-4 text-sm text-slate-400'>
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
              <MenuItem {...item} className='p-8' />
            </li>
          );
        }
      })}
    </ul>
  );
}
