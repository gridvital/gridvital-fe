import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer';
import { fetchDashboardData } from '../../../services/apis/dashboard.service';
import { selectRefreshTrigger } from '../../../store/dashboard/dashboard.selectors';
import LoadingDots from '../../../components/LoadingDots/LoadingDots';
import styles from './MobileDashboard.module.css';

const statusClassMap = {
  completed: styles.MobileDashboard_statusCompleted,
  cancelled: styles.MobileDashboard_statusCancelled,
  'in consultation': styles.MobileDashboard_statusConsultation,
  'in-consultation': styles.MobileDashboard_statusConsultation,
  waiting: styles.MobileDashboard_statusWaiting,
};

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState('queue');
  const refreshTrigger = useSelector(selectRefreshTrigger);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchDashboardData();
        setData(res.data);
      } catch {
        // handle error silently
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshTrigger]);

  return (
    <LayoutContainer>
      <div className={styles.MobileDashboard_content}>
        <div className={styles.MobileDashboard_metricsGrid}>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Live Token</span>
            <span className={styles.MobileDashboard_metricValue}>{loading ? <LoadingDots /> : data?.liveTokenCounter}</span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Today's Visits</span>
            <span className={styles.MobileDashboard_metricValue}>{loading ? <LoadingDots /> : data?.totalPatientsToday}</span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Monthly Total</span>
            <span className={styles.MobileDashboard_metricValue}>{loading ? <LoadingDots /> : data?.monthlyTotalPatients}</span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>Total Earnings</span>
            <span className={styles.MobileDashboard_metricValue}>{loading ? <LoadingDots /> : data?.todayRevenue}</span>
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
            {data?.patients?.map(p => (
              <div key={p.token} className={styles.MobileDashboard_patientCard}>
                <div className={styles.MobileDashboard_patientCardTop}>
                  <span className={styles.MobileDashboard_patientToken}>{p.token}</span>
                  <span className={`${styles.MobileDashboard_patientStatus} ${statusClassMap[p.status?.toLowerCase()] || styles.MobileDashboard_statusWaiting}`}>
                    {p.status}
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
