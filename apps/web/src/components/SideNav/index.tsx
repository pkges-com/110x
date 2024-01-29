import { Nav, NavProps } from '@/components/ui/nav';
import { tabs } from './const';
import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

export default function SideNav() {
  const { pathname } = useLocation();
  const links: NavProps['links'] = useMemo(() => {
    return tabs.map((tab) => {
      const variant = matchPath(tab.path, pathname) ? 'default' : 'ghost';

      return {
        ...tab,
        variant,
      };
    });
  }, [pathname]);

  return <Nav links={links} isCollapsed={false} />;
}
