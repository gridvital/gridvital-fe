import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  ClipboardList,
  CircleUser,
  LogOut,
} from "lucide-react";
import { logout } from "../../../store/auth/auth.slice";
import styles from "./Sidebar.module.css";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Patient", icon: ClipboardList, path: "/patient-list" },
  { label: "Profile", icon: CircleUser, path: "/Profile" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:auth");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={styles.Sidebar_panel}>
      <div className={styles.Sidebar_logo}>GridVital</div>
      <nav className={styles.Sidebar_nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`${styles.Sidebar_navItem} ${isActive(item.path) ? styles.Sidebar_navItemActive : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
      <div className={styles.Sidebar_logout} onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
