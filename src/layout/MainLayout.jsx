import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';



function MainLayout() {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <main className="outlet-layout">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
