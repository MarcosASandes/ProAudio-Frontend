import { BarChart3, FileText, Folder, ShoppingCart, Users, Tags } from "lucide-react"
import { NavLink } from 'react-router-dom';

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-content">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Folder className="sidebar-icon" />
              <span className="sidebar-text">Proyectos</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <ShoppingCart className="sidebar-icon" />
              <span className="sidebar-text">Productos</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/clients" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Users className="sidebar-icon" />
              <span className="sidebar-text">Clientes</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tags" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Tags className="sidebar-icon" />
              <span className="sidebar-text">Etiquetas</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <BarChart3 className="sidebar-icon" />
              <span className="sidebar-text">Analíticas</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  )
}

