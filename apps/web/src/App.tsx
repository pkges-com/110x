import '../app/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import SideNav from './components/SideNav';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-layout p-8 w-[100vw]">
        <Header />
        <SideNav />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
