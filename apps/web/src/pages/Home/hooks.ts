import { useAuthStore } from '@/stores/auth';
import { BASE_URL } from '@shared/utils/const';
import { useQuery } from 'react-query';

interface MetricsStats {
  total_minutes: number;
}

export function useMetricStats() {
  const authToken = useAuthStore.getState().token as string;

  return useQuery<MetricsStats, Error>(
    'metricStats',
    async () =>
      fetch(BASE_URL + '/metrics/', {
        headers: { Authorization: authToken },
      }).then((res) => res.json()),
    {
      refetchInterval: 60_000,
    }
  );
}
