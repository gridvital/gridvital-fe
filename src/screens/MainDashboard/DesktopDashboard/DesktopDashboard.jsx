import React from 'react';
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer';
import styles from './DesktopDashboard.module.css';

const patients = [
  { token: '#101', name: 'Rajesh Kumar', phone: '+91 98765 43210', complaints: 'Fever & Cold', status: 'completed' },
  { token: '#102', name: 'Priya Sharma', phone: '+91 87654 32109', complaints: 'Headache', status: 'pending' },
  { token: '#103', name: 'Amit Singh', phone: '+91 76543 21098', complaints: 'BP Checkup', status: 'completed' },
  { token: '#104', name: 'Sneha Patel', phone: '+91 65432 10987', complaints: 'Stomach Pain', status: 'pending' },
  { token: '#105', name: 'Vikram Joshi', phone: '+91 54321 09876', complaints: 'Skin Rash', status: 'completed' },
];

const DesktopDashboard = () => {
  return (
    <LayoutContainer>
      <div className={styles.DesktopDashboard_panel}>
        <div className={styles.DesktopDashboard_metricsGrid}>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Live Token</span>
            <span className={styles.DesktopDashboard_metricValue}>#104</span>
          </div>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Today's Visits</span>
            <span className={styles.DesktopDashboard_metricValue}>47</span>
          </div>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Monthly Total</span>
            <span className={styles.DesktopDashboard_metricValue}>1,284</span>
          </div>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Total Earnings</span>
            <span className={styles.DesktopDashboard_metricValue}>₹14,000</span>
          </div>
        </div>

        <div className={styles.DesktopDashboard_bottomWorkspace}>
          <div className={styles.DesktopDashboard_tableSection}>
            <table className={styles.DesktopDashboard_table}>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Complaints</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.token}>
                    <td className={styles.DesktopDashboard_tokenCell}>{p.token}</td>
                    <td>{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.complaints}</td>
                    <td>
                      <span className={`${styles.DesktopDashboard_statusBadge} ${p.status === 'completed' ? styles.DesktopDashboard_statusCompleted : styles.DesktopDashboard_statusPending}`}>
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.DesktopDashboard_controlPanel}>
            <h3 className={styles.DesktopDashboard_controlTitle}>Doctor's Control</h3>
            <button className={styles.DesktopDashboard_callNextBtn}>Call Next Patient</button>
            <button className={styles.DesktopDashboard_cancelTokenBtn}>Cancel Token</button>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default DesktopDashboard;
