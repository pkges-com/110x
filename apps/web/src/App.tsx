import '../app/globals.css';
import SideNav from './components/SideNav';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="main-layout p-8 w-[100vw]">
      <Header />
      <SideNav />
      <Outlet />
    </div>
  );
}

export default App;
