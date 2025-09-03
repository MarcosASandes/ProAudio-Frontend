import Navbar from "../components/global/navbar";
import Sidebar from "../components/global/sidebar";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/layout/mainLayout.module.css";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content-layout">
        <Navbar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
