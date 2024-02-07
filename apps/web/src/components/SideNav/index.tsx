import { Nav, NavProps } from '@/components/ui/nav';
import { tabs } from './const';
import { useEffect, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useNavStore } from '@/stores/nav';
import { useAuthStore } from '@/stores/auth';

export default function SideNav() {
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);
  const [nav, setNav] = useNavStore((state) => [state.nav, state.setNav]);

  useEffect(() => {
    const tab = tabs.find((tab) => matchPath(tab.path, pathname));
    setNav(tab);
  }, [pathname]);

  const links: NavProps['links'] = useMemo(() => {
    return tabs.map((tab) => {
      const variant = tab.path === nav?.path ? 'default' : 'ghost';

      return {
        ...tab,
        variant,
      };
    });
  }, [nav]);

  return <Nav links={links} isCollapsed={user ? false : true} />;
}
