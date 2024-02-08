import Page from '@/components/Page';
import emptyState from '@/assets/empty-state.svg';
import { Link } from 'react-router-dom';

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full w-full">
    <div
      className="flex flex-col justify-center items-center min-w-[400px] min-h-[430px] bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${emptyState})` }}
    >
      <h2 className="text-2xl font-normal text-white">No metrics yet</h2>
      <p className="text-center mt-4">
        But hey! you can easily configure them
        <br />
        in the{' '}
        <Link to="/settings" className="text-gray-600 hover:text-gray-800">
          settings
        </Link>{' '}
        page
      </p>
    </div>
  </div>
);

export default function Home({ ...props }: HomeProps) {
  return (
    <Page {...props}>
      <EmptyState />
    </Page>
  );
}
