import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import App from '@/App';
import { routes } from './const';
import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.Home} element={<App />}>
      // set default page for / route
      <Route
        path={routes.Home}
        element={<ProtectedRoute children={<Home />} />}
      />
      <Route
        path={routes.Settings}
        element={<ProtectedRoute children={<Settings />} />}
      />
      <Route path={routes.Login} element={<Login />} />
      <Route path="*" element={<Navigate to={routes.Home} />} />
    </Route>
  )
);
