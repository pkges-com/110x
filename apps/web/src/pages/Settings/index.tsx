import Page from '@/components/Page';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { settingsTabs } from './const';
import { Integrations } from './Integrations';

interface SettingsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Settings({ ...props }: SettingsProps) {
  return (
    <Page {...props}>
      <Tabs defaultValue={settingsTabs[0].value}>
        <TabsList className="flex w-full max-w-[400px]">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className="flex-1"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Integrations />
      </Tabs>
    </Page>
  );
}
