/*import { useState, useRef, useEffect } from "react";
import { Bell, User, ScanQrCode } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";
import useLogout from "../../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState("Anónimo");
  const [userMail, setUserMail] = useState("anonimo@example.com");
  const [userToken, setUserToken] = useState();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

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
    const storedToken = localStorage.getItem("userToken");

    if (storedName) setUserName(storedName);
    if (storedMail) setUserMail(storedMail);
    if (storedToken) setUserToken(storedToken);
  }, []);

  const logoutAndRedirect = async () => {
    await logoutUser(userToken);
    localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");

    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  };

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
                <button onClick={() => navigate("/change/password")} className={styles.userButton}>
                  Cambiar contraseña
                </button>
                <button
                  onClick={logoutAndRedirect}
                  className={styles.userButton}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}*/

/*--------------------------------------- */

/*import { useState, useRef, useEffect } from "react";
import { Bell, User, ScanQrCode, Eye } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";
import useLogout from "../../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [userName, setUserName] = useState("Anónimo");
  const [userMail, setUserMail] = useState("anonimo@example.com");
  const [userToken, setUserToken] = useState();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

  const userMenuRef = useRef();
  const userIconRef = useRef();
  const notifMenuRef = useRef();
  const notifIconRef = useRef();

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
    setShowNotificationsMenu(false);
  };

  const toggleNotificationsMenu = () => {
    setShowNotificationsMenu((prev) => !prev);
    setShowUserMenu(false);
  };

  // Cierra el menú si se hace clic fuera del ícono o del menú (para usuario y notificaciones)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }

      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(e.target) &&
        notifIconRef.current &&
        !notifIconRef.current.contains(e.target)
      ) {
        setShowNotificationsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Lee los datos del localStorage al cargar
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedMail = localStorage.getItem("userMail");
    const storedToken = localStorage.getItem("userToken");

    if (storedName) setUserName(storedName);
    if (storedMail) setUserMail(storedMail);
    if (storedToken) setUserToken(storedToken);
  }, []);

  const logoutAndRedirect = async () => {
    await logoutUser(userToken);
    localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");

    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  };

  // Datos de ejemplo para el listado de notificaciones
  const notifications = [
    {
      notification_id: 1,
      title: "Proyecto no pagado!",
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 2,
      title: "Nuevo cliente registrado",
      created_at: "2025-08-10T15:00:00",
    },
    {
      notification_id: 3,
      title: "Actualización de proyecto",
      created_at: "2025-08-11T09:45:20",
    },
  ];

  // Función para formatear fecha a algo legible (solo fecha)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbar}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className={styles.logoPlaceholder}>
            <img src={logo} alt="ProAudio Channels Logo" className="img-fluid" />
          </div>
        </Link>

        <div className="navbar-nav ms-auto d-flex flex-row align-items-center position-relative">
          <div className="nav-item me-3">
            <NavLink to="/scan-item" className="btn btn-outline-light btn-sm">
              <ScanQrCode />
            </NavLink>
          </div>

          
          <div className="nav-item me-3 position-relative">
            <button
              className="btn btn-dark"
              onClick={toggleNotificationsMenu}
              ref={notifIconRef}
              aria-label="Notificaciones"
            >
              <Bell className={styles.icon} />
            </button>

            {showNotificationsMenu && (
              <div className={styles.notificationsDropdown} ref={notifMenuRef}>
                <div className={styles.notificationsHeader}>
                  <span>Notificaciones</span>
                  <div className={styles.notificationsHeaderButtons}>
                    <button className={styles.notificationActionButton}>
                      Marcar como leídas
                    </button>
                    <button className={styles.notificationActionButton}>
                      Ver todas
                    </button>
                  </div>
                </div>

                <div className={styles.notificationsList}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.notification_id}
                      className={styles.notificationRow}
                      tabIndex={0} // para accesibilidad, que sea focusable
                      role="button"
                      // Aquí irá la lógica futura para redirigir o marcar como leída
                      onClick={() => {}}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          // simula click con teclado
                          e.preventDefault();
                          // futura lógica
                        }
                      }}
                    >
                      <div className={styles.notificationDetails}>
                        <span>ID: {notif.notification_id}</span>
                        <span>{notif.title}</span>
                      </div>
                      <span className={styles.notificationDate}>
                        {formatDate(notif.created_at)}
                      </span>
                      <Eye className={styles.notificationEyeIcon} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        
          <div className="nav-item me-3 position-relative">
            <button
              onClick={toggleUserMenu}
              className={`btn btn-dark ${showUserMenu ? styles.iconActive : ""}`}
              ref={userIconRef}
              aria-label="Usuario"
            >
              <User className={styles.icon} />
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown} ref={userMenuRef}>
                <div className={styles.arrowUp}></div>

                <div className={styles.userName}>{userName}</div>
                <div className={styles.userEmail}>{userMail}</div>
                <button
                  onClick={() => navigate("/change/password")}
                  className={styles.userButton}
                >
                  Cambiar contraseña
                </button>
                <button onClick={logoutAndRedirect} className={styles.userButton}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}*/

/*------------------------------------------ */

/* VERSION MAS ESTABLE

import { useState, useRef, useEffect } from "react";
import { Bell, User, ScanQrCode, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";
import useLogout from "../../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [userName, setUserName] = useState("Anónimo");
  const [userMail, setUserMail] = useState("anonimo@example.com");
  const [userToken, setUserToken] = useState();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

  const userMenuRef = useRef();
  const userIconRef = useRef();
  const notifMenuRef = useRef();
  const notifIconRef = useRef();

  // Estado para manejar ojo "parpadeando" por id
  const [eyeBlinkingIds, setEyeBlinkingIds] = useState({});

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
    setShowNotificationsMenu(false);
  };

  const toggleNotificationsMenu = () => {
    setShowNotificationsMenu((prev) => !prev);
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }

      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(e.target) &&
        notifIconRef.current &&
        !notifIconRef.current.contains(e.target)
      ) {
        setShowNotificationsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedMail = localStorage.getItem("userMail");
    const storedToken = localStorage.getItem("userToken");

    if (storedName) setUserName(storedName);
    if (storedMail) setUserMail(storedMail);
    if (storedToken) setUserToken(storedToken);
  }, []);

  const logoutAndRedirect = async () => {
    await logoutUser(userToken);
    localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");

    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  };

  const notifications = [
    {
      notification_id: 1,
      title: "Proyecto no pagado!",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: false,
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 2,
      title: "Entrega retrasada",
      description:
        "El envío programado para la fecha acordada no ha sido despachado debido a problemas logísticos.",
      is_solved: false,
      is_seen: true,
      created_at: "2025-06-28T15:10:45",
    },
    {
      notification_id: 3,
      title: "Nuevo comentario",
      description:
        "Un cliente ha dejado un nuevo comentario en el proyecto 'Reforma de oficinas'.",
      is_solved: true,
      is_seen: false,
      created_at: "2025-08-01T09:45:12",
    },
    {
      notification_id: 4,
      title: "Actualización de contrato",
      description:
        "Se han realizado cambios en las cláusulas del contrato. Revísalos antes de la fecha límite.",
      is_solved: false,
      is_seen: false,
      created_at: "2025-08-10T17:22:05",
    },
    {
      notification_id: 5,
      title: "Pago recibido",
      description:
        "El pago correspondiente al proyecto 'Desarrollo Web Corporativo' ha sido acreditado con éxito.",
      is_solved: true,
      is_seen: true,
      created_at: "2025-07-30T11:05:59",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Maneja click en icono ojo para parpadear
  const handleEyeClick = (id, e) => {
    e.stopPropagation(); // evitar que dispare onClick fila
    setEyeBlinkingIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setEyeBlinkingIds((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 700); // dura 700ms ojo cerrado
  };

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

          <div className="nav-item me-3 position-relative">
            <button
              className="btn btn-dark"
              onClick={toggleNotificationsMenu}
              ref={notifIconRef}
              aria-label="Notificaciones"
            >
              <Bell className={styles.icon} />
            </button>

            {showNotificationsMenu && (
              <div className={styles.notificationsDropdown} ref={notifMenuRef}>
                <div className={styles.notificationsHeader}>
                  <span>Notificaciones</span>
                  <div className={styles.notificationsHeaderButtons}>
                    <button className={styles.notificationActionButtonSmall}>
                      Marcar como leídas
                    </button>
                    <button className={styles.notificationActionButtonPurple}>
                      Ver todas
                    </button>
                  </div>
                </div>

                <div className={styles.notificationsList}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.notification_id}
                      className={styles.notificationRow}
                      tabIndex={0}
                      role="button"
                      onClick={() => {}}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div className={styles.notificationDetails}>
                        <span>ID: {notif.notification_id}</span> - 
                        <span>{notif.title}</span>
                      </div>
                      <span className={styles.notificationDate}>
                        {formatDate(notif.created_at)}
                      </span>

                      {eyeBlinkingIds[notif.notification_id] ? (
                        <EyeOff
                          className={`${styles.notificationEyeIcon} ${styles.notificationEyeBlink}`}
                          onClick={(e) =>
                            handleEyeClick(notif.notification_id, e)
                          }
                        />
                      ) : (
                        <Eye
                          className={styles.notificationEyeIcon}
                          onClick={(e) =>
                            handleEyeClick(notif.notification_id, e)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="nav-item me-3 position-relative">
            <button
              onClick={toggleUserMenu}
              className={`btn btn-dark ${
                showUserMenu ? styles.iconActive : ""
              }`}
              ref={userIconRef}
              aria-label="Usuario"
            >
              <User className={styles.icon} />
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown} ref={userMenuRef}>
                <div className={styles.arrowUp}></div>

                <div className={styles.userName}>{userName}</div>
                <div className={styles.userEmail}>{userMail}</div>
                <button
                  onClick={() => navigate("/change/password")}
                  className={styles.userButton}
                >
                  Cambiar contraseña
                </button>
                <button
                  onClick={logoutAndRedirect}
                  className={styles.userButton}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}*/

/*-------------------------- */

/*import { useState, useRef, useEffect } from "react";
import { Bell, User, ScanQrCode, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";
import useLogout from "../../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [userName, setUserName] = useState("Anónimo");
  const [userMail, setUserMail] = useState("anonimo@example.com");
  const [userToken, setUserToken] = useState();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

  const userMenuRef = useRef();
  const userIconRef = useRef();
  const notifMenuRef = useRef();
  const notifIconRef = useRef();

  // Estado para manejar ojo "parpadeando" por id
  const [eyeBlinkingIds, setEyeBlinkingIds] = useState({});

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
    setShowNotificationsMenu(false);
  };

  const toggleNotificationsMenu = () => {
    setShowNotificationsMenu((prev) => !prev);
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }

      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(e.target) &&
        notifIconRef.current &&
        !notifIconRef.current.contains(e.target)
      ) {
        setShowNotificationsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedMail = localStorage.getItem("userMail");
    const storedToken = localStorage.getItem("userToken");

    if (storedName) setUserName(storedName);
    if (storedMail) setUserMail(storedMail);
    if (storedToken) setUserToken(storedToken);
  }, []);

  const logoutAndRedirect = async () => {
    await logoutUser(userToken);
    localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");

    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  };

  const notifications = [
    {
      notification_id: 1,
      title: "Proyecto no pagado!",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: false,
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 2,
      title: "Entrega retrasada",
      description:
        "El envío programado para la fecha acordada no ha sido despachado debido a problemas logísticos.",
      is_solved: false,
      is_seen: true,
      created_at: "2025-06-28T15:10:45",
    },
    {
      notification_id: 3,
      title: "Nuevo comentario",
      description:
        "Un cliente ha dejado un nuevo comentario en el proyecto 'Reforma de oficinas'.",
      is_solved: true,
      is_seen: false,
      created_at: "2025-08-01T09:45:12",
    },
    {
      notification_id: 4,
      title: "Actualización de contrato",
      description:
        "Se han realizado cambios en las cláusulas del contrato. Revísalos antes de la fecha límite.",
      is_solved: false,
      is_seen: false,
      created_at: "2025-08-10T17:22:05",
    },
    {
      notification_id: 5,
      title: "Pago recibido",
      description:
        "El pago correspondiente al proyecto 'Desarrollo Web Corporativo' ha sido acreditado con éxito.",
      is_solved: true,
      is_seen: true,
      created_at: "2025-07-30T11:05:59",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Maneja click en icono ojo para parpadear
  const handleEyeClick = (id, e) => {
    e.stopPropagation(); // evitar que dispare onClick fila
    setEyeBlinkingIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setEyeBlinkingIds((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 700); // dura 700ms ojo cerrado
  };

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

          <div className="nav-item me-3 position-relative">
            <button
              className="btn btn-dark"
              onClick={toggleNotificationsMenu}
              ref={notifIconRef}
              aria-label="Notificaciones"
            >
              <Bell className={styles.icon} />
            </button>

            {showNotificationsMenu && (
              <div className={styles.notificationsDropdown} ref={notifMenuRef}>
                <div className={styles.notificationsHeader}>
                  <span>Notificaciones</span>

                  <button className={styles.notificationActionButtonPurple}>
                    Ver todas
                  </button>
                </div>

                <div className={styles.notificationsList}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.notification_id}
                      className={styles.notificationRow}
                      tabIndex={0}
                      role="button"
                      onClick={() => {}}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div className={styles.notificationDetails}>
                        <span>ID: {notif.notification_id}</span>
                        <span>{notif.title}</span>
                      </div>
                      <span className={styles.notificationDate}>
                        {formatDate(notif.created_at)}
                      </span>

                      {eyeBlinkingIds[notif.notification_id] ? (
                        <EyeOff
                          className={`${styles.notificationEyeIcon} ${styles.notificationEyeBlink}`}
                          onClick={(e) =>
                            handleEyeClick(notif.notification_id, e)
                          }
                        />
                      ) : (
                        <Eye
                          className={styles.notificationEyeIcon}
                          onClick={(e) =>
                            handleEyeClick(notif.notification_id, e)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                

                <div className={styles.notificationsFooter}>
                  <div className={styles.markAsReadLink}>Marcar como leídas</div>
                </div>
              </div>
            )}
          </div>

          <div className="nav-item me-3 position-relative">
            <button
              onClick={toggleUserMenu}
              className={`btn btn-dark ${
                showUserMenu ? styles.iconActive : ""
              }`}
              ref={userIconRef}
              aria-label="Usuario"
            >
              <User className={styles.icon} />
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown} ref={userMenuRef}>
                <div className={styles.arrowUp}></div>

                <div className={styles.userName}>{userName}</div>
                <div className={styles.userEmail}>{userMail}</div>
                <button
                  onClick={() => navigate("/change/password")}
                  className={styles.userButton}
                >
                  Cambiar contraseña
                </button>
                <button
                  onClick={logoutAndRedirect}
                  className={styles.userButton}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}*/

/*---------------------------- */

import { useState, useRef, useEffect } from "react";
import { Bell, User, ScanQrCode, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/proaudio-logo-2.png";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/layout/navbar.module.css";
import useLogout from "../../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";
import useMarkNotificationAsRead from "../../hooks/notifications/useMarkNotificationAsRead";
import useMarkMultipleNotificationsAsRead from "../../hooks/notifications/useMarkMultipleNotificationsAsRead";
import useGetRecentNotifications from "../../hooks/notifications/useGetRecentNotifications";
import {
  selectRecentNotifications,
  selectTotalNotifications,
} from "../../features/notifications/NotificationSelector";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [userName, setUserName] = useState("Anónimo");
  const [userMail, setUserMail] = useState("anonimo@example.com");
  const [userToken, setUserToken] = useState();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();
  const { markAsRead } = useMarkNotificationAsRead();
  const { markMultipleAsRead } = useMarkMultipleNotificationsAsRead();
  useGetRecentNotifications(1, 10, "desc", "Project", false);
  const notifications = useSelector(selectRecentNotifications);
  const totalNotifications = useSelector(selectTotalNotifications);

  const userMenuRef = useRef();
  const userIconRef = useRef();
  const notifMenuRef = useRef();
  const notifIconRef = useRef();

  // Estado para manejar ojo "parpadeando" por id
  const [eyeBlinkingIds, setEyeBlinkingIds] = useState({});

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
    setShowNotificationsMenu(false);
  };

  const toggleNotificationsMenu = () => {
    setShowNotificationsMenu((prev) => !prev);
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }

      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(e.target) &&
        notifIconRef.current &&
        !notifIconRef.current.contains(e.target)
      ) {
        setShowNotificationsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedMail = localStorage.getItem("userMail");
    const storedToken = localStorage.getItem("userToken");

    if (storedName) setUserName(storedName);
    if (storedMail) setUserMail(storedMail);
    if (storedToken) setUserToken(storedToken);
  }, []);

  const logoutAndRedirect = async () => {
    await logoutUser(userToken);
    localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");

    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Maneja click en icono ojo para parpadear
  const handleEyeClick = (id, e) => {
    e.stopPropagation(); // evita que se dispare onClick de la fila
    console.log("Notificación clickeada:", id); // solo para pruebas

    setEyeBlinkingIds((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setEyeBlinkingIds((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 700); // dura 700ms ojo cerrado
    //markAsRead(id);
  };

  const handleGoToDetails = (id) => {
    console.log("Ir a detalles de la notificación:", id);
    setShowNotificationsMenu(false);
    navigate(`/notification/${id}`);
  };

  const handleGoToList = (id) => {
    setShowNotificationsMenu(false);
    navigate(`/notifications`);
  };

  const handleMarkAllRead = () => {
    const notificationIds = notifications
      .filter((n) => !n.is_seen)
      .map((n) => n.notification_id);
    //markMultipleAsRead(notificationIds);
    console.log("Estas notif se pondrán en vistas: ", notificationIds);
  };

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

          <div className="nav-item me-3 position-relative">
            <button
              className={`btn btn-dark ${
                showNotificationsMenu ? styles.iconActive : ""
              }`}
              onClick={toggleNotificationsMenu}
              ref={notifIconRef}
              aria-label="Notificaciones"
            >
              <Bell className={styles.icon} />

              {(totalNotifications ?? 0) > 0 && (
                <span className={styles.notificationBadge}>
                  {totalNotifications}
                </span>
              )}
            </button>

            {showNotificationsMenu && (
              <div className={styles.notificationsDropdown} ref={notifMenuRef}>
                <div className={styles.notificationsHeader}>
                  <span>Notificaciones</span>

                  <button onClick={handleGoToList} className={styles.notificationActionButtonPurple}>
                    Ver todas
                  </button>
                </div>

                {/*<div className={styles.notificationsList}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.notification_id}
                      className={`${styles.notificationRow} ${
                        !notif.is_seen ? styles.notSeenNotification : ""
                      }`}
                      tabIndex={0}
                      role="button"
                      onClick={() => handleGoToDetails(notif.notification_id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div className={styles.notificationDetails}>
                        <span>ID: {notif.notification_id}</span> -
                        <span>{notif.title}</span>
                      </div>
                      <span className={styles.notificationDate}>
                        {formatDate(notif.created_at)}
                      </span>

                      {eyeBlinkingIds[notif.notification_id] ? (
                        <EyeOff
                          className={`${styles.notificationEyeIcon} ${styles.notificationEyeBlink}`}
                          onClick={(e) =>
                            handleEyeClick(notif.notification_id, e)
                          }
                        />
                      ) : (
                        <Eye
                          className={styles.notificationEyeIcon}
                          onClick={(e) =>
                            handleEyeClick(notif.notification_id, e)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>*/}

                <div className={styles.notificationsList}>
                  {notifications.length === 0 ? (
                    <div className={styles.noNotificationsMessage}>
                      No hay notificaciones pendientes
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.notification_id}
                        className={`${styles.notificationRow} ${
                          !notif.is_seen ? styles.notSeenNotification : ""
                        }`}
                        tabIndex={0}
                        role="button"
                        onClick={() => handleGoToDetails(notif.notification_id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className={styles.notificationDetails}>
                          <span>ID: {notif.notification_id}</span> -
                          <span>{notif.title}</span>
                        </div>
                        <span className={styles.notificationDate}>
                          {formatDate(notif.created_at)}
                        </span>

                        {eyeBlinkingIds[notif.notification_id] ? (
                          <EyeOff
                            className={`${styles.notificationEyeIcon} ${styles.notificationEyeBlink}`}
                            onClick={(e) =>
                              handleEyeClick(notif.notification_id, e)
                            }
                          />
                        ) : (
                          <Eye
                            className={styles.notificationEyeIcon}
                            onClick={(e) =>
                              handleEyeClick(notif.notification_id, e)
                            }
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.notificationsFooter}>
                  <div
                    onClick={handleMarkAllRead}
                    className={styles.markAsReadLink}
                  >
                    Marcar como leídas
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="nav-item me-3 position-relative">
            <button
              onClick={toggleUserMenu}
              className={`btn btn-dark ${
                showUserMenu ? styles.iconActive : ""
              }`}
              ref={userIconRef}
              aria-label="Usuario"
            >
              <User className={styles.icon} />
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown} ref={userMenuRef}>
                <div className={styles.arrowUp}></div>

                <div className={styles.userName}>{userName}</div>
                <div className={styles.userEmail}>{userMail}</div>
                <button
                  onClick={() => navigate("/change/password")}
                  className={styles.userButton}
                >
                  Cambiar contraseña
                </button>
                <button
                  onClick={logoutAndRedirect}
                  className={styles.userButton}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
