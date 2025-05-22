import { BarChart3, FileText, Folder, ShoppingCart, Users, Tags } from "lucide-react"
import { Link } from 'react-router-dom';

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-content">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <Folder className="sidebar-icon" />
              <span className="sidebar-text">Proyectos</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              <ShoppingCart className="sidebar-icon" />
              <span className="sidebar-text">Productos</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clients">
              <Users className="sidebar-icon" />
              <span className="sidebar-text">Clientes</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tags">
              <Tags className="sidebar-icon" />
              <span className="sidebar-text">Etiquetas</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/analytics">
              <BarChart3 className="sidebar-icon" />
              <span className="sidebar-text">Analíticas</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
