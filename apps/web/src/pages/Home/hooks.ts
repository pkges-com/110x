import { useAuthStore } from '@/stores/auth';
import { BASE_URL } from '@shared/utils/const';
import { useQuery } from 'react-query';

interface Metric {
  name: string; // TODO: fix
  value: number;
}

export function useMetricStats() {
  const authToken = useAuthStore.getState().token as string;

  return useQuery<Metric[], Error>('metricStats', async () =>
    fetch(BASE_URL + '/metrics/', {
      headers: { Authorization: authToken },
    }).then((res) => res.json())
  );
}
