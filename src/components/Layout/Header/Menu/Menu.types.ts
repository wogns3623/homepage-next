import { ReactNode } from 'react';

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

export type HeaderMenuItem = NormalHeaderMenuItem | GroupHeaderMenuItem;
