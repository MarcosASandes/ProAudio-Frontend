import { Bell, User, ScanQrCode } from "lucide-react";
import logo from "../assets/proaudio-logo-2.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className="logo-placeholder">
            <img
              src={logo}
              alt="Logo de ProAudio Channels"
              className="img-fluid"
            />
          </div>
        </Link>

        <div className="navbar-nav ms-auto d-flex flex-row align-items-center">
          {/*<div className="nav-item me-3">
            <button className="btn btn-outline-light btn-sm">
              <ScanQrCode />
            </button>
          </div>*/}

          <div className="nav-item me-3">
            <NavLink to="/scan-item" className="btn btn-outline-light btn-sm">
              <ScanQrCode />
            </NavLink>
          </div>
          <div className="nav-item me-3">
            <button className="btn btn-dark">
              <Bell className="icon" />
            </button>
          </div>
          <div className="nav-item me-3">
            <button className="btn btn-dark">
              <User className="icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
