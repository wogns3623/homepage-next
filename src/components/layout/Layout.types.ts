import { Router } from 'next/router';

export interface LayoutProps {
  children: React.ReactNode;
  router: Router;
}
