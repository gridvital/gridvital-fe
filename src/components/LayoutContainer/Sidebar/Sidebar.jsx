import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Settings, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Patient Logs', icon: ClipboardList, path: '/patient-logs' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
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
              className={`${styles.Sidebar_navItem} ${isActive(item.path) ? styles.Sidebar_navItemActive : ''}`}
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
