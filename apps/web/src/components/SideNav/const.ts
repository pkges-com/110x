import { LuUsers2, LuArchive } from 'react-icons/lu';

import { NavProps } from '@/components/ui/nav';
import { routes } from '@/router/const';

export const tabs: NavProps['links'] = [
  {
    title: 'Home',
    icon: LuUsers2,
    path: routes.Home,
  },
  {
    title: 'Settings',
    icon: LuArchive,
    path: routes.Settings,
  },
];
