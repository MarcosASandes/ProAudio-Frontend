import { BarChart3, Folder, ShoppingCart, Users, Tags } from "lucide-react";
import { NavLink } from 'react-router-dom';
import styles from "../../styles/layout/sidebar.module.css";

export default function Sidebar({ collapsed }) {
  const sidebarClasses = `${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''}`;

  return (
    <aside className={sidebarClasses}>
      <div className={styles.sidebarContent}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <Folder className={styles.sidebarIcon} />
              <span className={styles.sidebarText}>Proyectos</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <ShoppingCart className={styles.sidebarIcon} />
              <span className={styles.sidebarText}>Productos</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <Users className={styles.sidebarIcon} />
              <span className={styles.sidebarText}>Clientes</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/tags"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <Tags className={styles.sidebarIcon} />
              <span className={styles.sidebarText}>Etiquetas</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <BarChart3 className={styles.sidebarIcon} />
              <span className={styles.sidebarText}>Analíticas</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

