import Page from '@/components/Page';
import emptyState from '/public/empty-state.svg';
import { Link } from 'react-router-dom';
import { useMetricStats } from './hooks';

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full w-full">
    <div
      className="flex flex-col justify-center items-center min-w-[400px] min-h-[430px] bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("${emptyState}")` }}
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

const calculateHumanTimeSpend = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} ${remainingMinutes > 1 ? 'minutes' : 'minute'}`;
  }

  return `${hours} ${
    hours > 1 ? 'hours' : 'hour'
  } and ${remainingMinutes} minutes`;
};

export default function Home({ ...props }: HomeProps) {
  const { data, isLoading, error } = useMetricStats();

  return (
    <Page {...props}>
      {!data && isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>Error: {error.message}</div>}
      {data && data.total_minutes === 0 && <EmptyState />}
      {data && data.total_minutes > 0 && (
        <div>
          <p className="text-lg">
            You have been productive for{' '}
            <b>{calculateHumanTimeSpend(data.total_minutes)}</b>
            &nbsp;today
          </p>
        </div>
      )}
    </Page>
  );
}
