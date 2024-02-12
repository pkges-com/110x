import { ReactNode } from 'react';

interface SettingsTab {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export const settingsTabs: SettingsTab[] = [
  {
    label: 'Integrations',
    value: 'integrations',
  },
  {
    label: (
      <>
        Profile&nbsp;<sup>soon!</sup>
      </>
    ),
    value: 'profile',
    disabled: true,
  },
];
