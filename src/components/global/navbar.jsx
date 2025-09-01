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
import { clearData } from "../../utils/localStorageUtilities";

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
  useGetRecentNotifications(1, 5, null, false, "", 15);
  const notifications = useSelector(selectRecentNotifications);
  const totalNotifications = useSelector(selectTotalNotifications);
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

  const userMenuRef = useRef();
  const userIconRef = useRef();
  const notifMenuRef = useRef();
  const notifIconRef = useRef();

  //estado para manejar ojo "parpadeando" por id
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
    /*localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userToken");*/
    clearData();

    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  
  const handleEyeClick = (id, e) => {
    e.stopPropagation(); //evita que se dispare onClick de la fila
    console.log("Notificación clickeada:", id);

    setEyeBlinkingIds((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setEyeBlinkingIds((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 700);
    markAsRead(id);
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
    markMultipleAsRead(notificationIds);
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
                  {totalNotifications > 99 ? "+99" : totalNotifications}
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
