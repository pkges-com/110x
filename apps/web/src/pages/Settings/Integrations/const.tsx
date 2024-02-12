import { ReactNode } from 'react';
import { FaChrome } from 'react-icons/fa6';
import { TbBrandVscode } from 'react-icons/tb';
import { SiIntellijidea } from 'react-icons/si';

export interface IntegrationType {
  title: string;
  icon: ReactNode;
  url?: string;
}

export const integrations: IntegrationType[] = [
  {
    title: 'VSCode',
    icon: <TbBrandVscode size={40} />,
    url: 'https://slack.com',
  },

  {
    title: 'Chrome Extension',
    icon: <FaChrome size={40} />,
    url: 'https://slack.com',
  },

  {
    title: 'IntelliJ',
    icon: <SiIntellijidea size={40} />,
  },
];
