import { ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';

export interface CustomLinkProps extends Omit<LinkProps, 'href'> {
  href?: LinkProps['href'];
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function CustomLink({
  href,
  children,
  className,
  style,
  ...linkProps
}: CustomLinkProps) {
  // Must add passHref to Link
  if (href) {
    return (
      <Link href={href} passHref {...linkProps}>
        <a className={`hover:text-blue-400 ${className}`} style={style}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <div className={`hover:text-blue-400 ${className}`} style={style}>
        {children}
      </div>
    );
  }
}
