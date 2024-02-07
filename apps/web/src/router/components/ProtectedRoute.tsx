import { Navigate, RouteProps } from 'react-router-dom';
import { routes } from '../const';
import { useAuthStore } from '@/stores/auth';

export const ProtectedRoute = ({ children }: RouteProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to={routes.Login} />;
  }

  return children;
};
