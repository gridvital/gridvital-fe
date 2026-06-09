import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer';
import { fetchDashboardData } from '../../../services/apis/dashboard.service';
import { selectRefreshTrigger } from '../../../store/dashboard/dashboard.selectors';
import LoadingDots from '../../../components/LoadingDots/LoadingDots';
import styles from './DesktopDashboard.module.css';

const statusClassMap = {
  completed: styles.DesktopDashboard_statusCompleted,
  cancelled: styles.DesktopDashboard_statusCancelled,
  'in consultation': styles.DesktopDashboard_statusConsultation,
  'in-consultation': styles.DesktopDashboard_statusConsultation,
  waiting: styles.DesktopDashboard_statusWaiting,
};

const DesktopDashboard = () => {
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
      <div className={styles.DesktopDashboard_panel}>
        <div className={styles.DesktopDashboard_metricsGrid}>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Live Token</span>
            <span className={styles.DesktopDashboard_metricValue}>{loading ? <LoadingDots /> : data?.liveTokenCounter}</span>
          </div>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Today's Visits</span>
            <span className={styles.DesktopDashboard_metricValue}>{loading ? <LoadingDots /> : data?.totalPatientsToday}</span>
          </div>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Monthly Total</span>
            <span className={styles.DesktopDashboard_metricValue}>{loading ? <LoadingDots /> : data?.monthlyTotalPatients}</span>
          </div>
          <div className={styles.DesktopDashboard_metricCard}>
            <span className={styles.DesktopDashboard_metricLabel}>Total Earnings</span>
            <span className={styles.DesktopDashboard_metricValue}>{loading ? <LoadingDots /> : data?.todayRevenue}</span>
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
                {data?.patients?.map(p => (
                  <tr key={p.token}>
                    <td className={styles.DesktopDashboard_tokenCell}>{p.token}</td>
                    <td>{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.complaints}</td>
                    <td>
                      <span className={`${styles.DesktopDashboard_statusBadge} ${statusClassMap[p.status?.toLowerCase()] || styles.DesktopDashboard_statusWaiting}`}>
                        {p.status}
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
