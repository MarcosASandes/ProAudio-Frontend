import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout() {
  return (
    

    <div className="app-layout">
      <Sidebar />
      <div className="content-layout">
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default MainLayout;
