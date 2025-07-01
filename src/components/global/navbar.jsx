import { Bell, User, ScanQrCode } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbar}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className={styles.logoPlaceholder}>
            <img
              src={logo}
              alt="Logo de ProAudio Channels"
              className="img-fluid"
            />
          </div>
        </Link>

        <div className="navbar-nav ms-auto d-flex flex-row align-items-center">
          <div className="nav-item me-3">
            <NavLink to="/scan-item" className="btn btn-outline-light btn-sm">
              <ScanQrCode />
            </NavLink>
          </div>
          <div className="nav-item me-3">
            <button className="btn btn-dark">
              <Bell className={styles.icon} />
            </button>
          </div>
          <div className="nav-item me-3">
            <button className="btn btn-dark">
              <User className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
