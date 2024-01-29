import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import App from '@/App';
import { routes } from './const';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.Home} element={<App />}>
      <Route path={routes.Settings} element={<div>Settings</div>} />
    </Route>
  )
);
