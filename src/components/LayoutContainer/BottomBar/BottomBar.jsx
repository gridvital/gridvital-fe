import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, CircleUser } from "lucide-react";
import styles from "./BottomBar.module.css";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "patients",
    label: "Patients",
    icon: ClipboardList,
    path: "/patient-list",
  },
  { id: "settings", label: "Profile", icon: CircleUser, path: "/Profile" },
];

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  return (
    <nav className={styles.BottomBar_container}>
      <div className={styles.BottomBar_wrapper}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <div
              key={item.id}
              className={`${styles.BottomBar_item} ${isActive ? styles.BottomBar_itemActive : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className={styles.BottomBar_icon}>
                <Icon size={20} />
              </span>
              <span className={styles.BottomBar_label}>{item.label}</span>
              {isActive && <div className={styles.BottomBar_indicator} />}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomBar;
