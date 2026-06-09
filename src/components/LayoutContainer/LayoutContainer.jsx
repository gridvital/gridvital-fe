import React from 'react';
import useDeviceCheck from '../../utils/useDeviceCheck';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import BottomBar from './BottomBar/BottomBar';
import styles from './LayoutContainer.module.css';

const LayoutContainer = ({ children }) => {
  const { isDesktopUtils } = useDeviceCheck();

  return (
    <div className={styles.LayoutContainer_wrapper}>
      <Navbar />
      <div className={styles.LayoutContainer_body}>
        <Sidebar />
        <main className={styles.LayoutContainer_main}>
          {children}
        </main>
      </div>
      {!isDesktopUtils && <BottomBar />}
    </div>
  );
};

export default LayoutContainer;
