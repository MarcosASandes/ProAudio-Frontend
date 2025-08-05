/*import { useState, useRef, useEffect } from "react";
import { Bell, User, ScanQrCode } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef();
  const iconRef = useRef();

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  // Cierra el menú si se hace clic fuera del ícono o del menú
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbar}`}
    >
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
            <button
              onClick={toggleUserMenu}
              className={`btn btn-dark ${
                showUserMenu ? styles.iconActive : ""
              }`}
              ref={iconRef}
            >
              <User className={styles.icon} />
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown} ref={menuRef}>
                <div className={styles.arrowUp}></div>

                <div className={styles.userName}>Juan Pérez</div>
                <div className={styles.userEmail}>juan@example.com</div>
                <button className={styles.userButton}>Change Password</button>
                <button className={styles.userButton}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}*/

/*---------------------------------- */

import { useState, useRef, useEffect } from "react";
import { Bell, User, ScanQrCode } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState("Juan Pérez");
  const [userMail, setUserMail] = useState("juan@example.com");

  const menuRef = useRef();
  const iconRef = useRef();

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  // Cierra el menú si se hace clic fuera del ícono o del menú
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Lee los datos del localStorage al cargar
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedMail = localStorage.getItem("userMail");

    if (storedName) setUserName(storedName);
    if (storedMail) setUserMail(storedMail);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbar}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className={styles.logoPlaceholder}>
            <img
              src={logo}
              alt="ProAudio Channels Logo"
              className="img-fluid"
            />
          </div>
        </Link>

        <div className="navbar-nav ms-auto d-flex flex-row align-items-center position-relative">
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
          <div className="nav-item me-3 position-relative">
            <button
              onClick={toggleUserMenu}
              className={`btn btn-dark ${
                showUserMenu ? styles.iconActive : ""
              }`}
              ref={iconRef}
            >
              <User className={styles.icon} />
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown} ref={menuRef}>
                <div className={styles.arrowUp}></div>

                <div className={styles.userName}>{userName}</div>
                <div className={styles.userEmail}>{userMail}</div>
                <button className={styles.userButton}>Cambiar contraseña</button>
                <button className={styles.userButton}>Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
