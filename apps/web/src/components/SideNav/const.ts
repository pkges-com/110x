import { IoCogOutline } from 'react-icons/io5';
import { TbActivity } from 'react-icons/tb';

import { NavProps } from '@/components/ui/nav';
import { routes } from '@/router/const';

export const tabs: NavProps['links'] = [
  {
    title: 'Dashboard',
    icon: TbActivity,
    path: routes.Home,
  },
  {
    title: 'Settings',
    icon: IoCogOutline,
    path: routes.Settings,
  },
];
