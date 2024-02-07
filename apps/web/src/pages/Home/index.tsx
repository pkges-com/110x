import Page from '@/components/Page';

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Home({ ...props }: HomeProps) {
  return (
    <Page {...props}>
      <h1>Home</h1>
    </Page>
  );
}
