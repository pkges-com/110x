import Page from '@/components/Page';

interface SettingsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Settings({ ...props }: SettingsProps) {
  return (
    <Page {...props}>
      <h1>Settings</h1>
    </Page>
  );
}
