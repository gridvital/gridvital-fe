import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import gridVitalLogo from '../../../assets/images/logos/GridVitalLogo.png';
import { logout } from '../../../store/auth/auth.slice';
import { selectUserName } from '../../../store/auth/auth.selectors';
import styles from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return '👤';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.Navbar_header}>
      <div className={styles.Navbar_inner}>
        <div className={styles.Navbar_left}>
          <img src={gridVitalLogo} alt="GridVital" className={styles.Navbar_logo} />
        </div>
        <div className={styles.Navbar_right} ref={dropdownRef}>
          <div
            className={styles.Navbar_profileAvatar}
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            {getInitials(userName)}
          </div>
          {isProfileOpen && (
            <div className={styles.Navbar_profileDropdown}>
              <div className={styles.Navbar_profileItem} onClick={() => navigate('/profile')}>
                View Profile
              </div>
              <div className={styles.Navbar_profileItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
