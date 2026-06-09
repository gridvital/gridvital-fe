import React, { useState } from 'react';
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer';
import styles from './MobileDashboard.module.css';

const patients = [
  { token: '#101', name: 'Rajesh Kumar', phone: '+91 98765 43210', complaints: 'Fever & Cold', status: 'completed' },
  { token: '#102', name: 'Priya Sharma', phone: '+91 87654 32109', complaints: 'Headache', status: 'pending' },
  { token: '#103', name: 'Amit Singh', phone: '+91 76543 21098', complaints: 'BP Checkup', status: 'completed' },
  { token: '#104', name: 'Sneha Patel', phone: '+91 65432 10987', complaints: 'Stomach Pain', status: 'pending' },
];

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState('queue');

  return (
    <LayoutContainer>
      <div className={styles.MobileDashboard_content}>
        <div className={styles.MobileDashboard_metricsGrid}>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Live Token</span>
            <span className={styles.MobileDashboard_metricValue}>#104</span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Today's Visits</span>
            <span className={styles.MobileDashboard_metricValue}>47</span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Monthly Total</span>
            <span className={styles.MobileDashboard_metricValue}>1,284</span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Total Earnings</span>
            <span className={styles.MobileDashboard_metricValue}>₹14,000</span>
          </div>
        </div>

        <div className={styles.MobileDashboard_tabBar}>
          <button
            className={`${styles.MobileDashboard_tab} ${activeTab === 'queue' ? styles.MobileDashboard_tabActive : ''}`}
            onClick={() => setActiveTab('queue')}
          >
            Live Queue List
          </button>
          <button
            className={`${styles.MobileDashboard_tab} ${activeTab === 'console' ? styles.MobileDashboard_tabActive : ''}`}
            onClick={() => setActiveTab('console')}
          >
            Quick Action Console
          </button>
        </div>

        {activeTab === 'queue' && (
          <div className={styles.MobileDashboard_queueList}>
            {patients.map(p => (
              <div key={p.token} className={styles.MobileDashboard_patientCard}>
                <div className={styles.MobileDashboard_patientCardTop}>
                  <span className={styles.MobileDashboard_patientToken}>{p.token}</span>
                  <span className={`${styles.MobileDashboard_patientStatus} ${p.status === 'completed' ? styles.MobileDashboard_statusCompleted : styles.MobileDashboard_statusPending}`}>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </div>
                <div className={styles.MobileDashboard_patientName}>{p.name}</div>
                <div className={styles.MobileDashboard_patientDetails}>
                  <span>{p.phone}</span>
                  <span className={styles.MobileDashboard_patientDetailsDot}>•</span>
                  <span>{p.complaints}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'console' && (
          <div className={styles.MobileDashboard_consolePanel}>
            <h3 className={styles.MobileDashboard_consoleTitle}>Doctor's Console</h3>
            <button className={styles.MobileDashboard_callNextBtn}>Call Next Patient</button>
            <button className={styles.MobileDashboard_cancelTokenBtn}>Cancel Token</button>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
};

export default MobileDashboard;
