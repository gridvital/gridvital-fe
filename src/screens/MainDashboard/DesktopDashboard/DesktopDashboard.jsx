import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Share2, Download, Printer } from 'lucide-react';
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer';
import { fetchDashboardData } from '../../../services/apis/dashboard.service';
import { selectRefreshTrigger } from '../../../store/dashboard/dashboard.selectors';
import { QRCodeSVG } from 'qrcode.react';
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
  const qrRef = useRef(null);

  const qrUrl = data?.clinicDisplayId
    ? `https://gridvital.in/book-appointment?clinicId=${data.clinicDisplayId}`
    : '';

  const handleDownload = useCallback(() => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 4;
    const size = 200 * scale;
    canvas.width = size;
    canvas.height = size;
    const img = new Image();
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      canvas.toBlob((pngBlob) => {
        const pngUrl = URL.createObjectURL(pngBlob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `qr-${data?.clinicDisplayId || 'appointment'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
    };
    img.src = url;
  }, [data?.clinicDisplayId]);

  const handlePrint = useCallback(() => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(
      `<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0">${svg.outerHTML}</body></html>`,
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Book Appointment', url: qrUrl });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(qrUrl);
    }
  }, [qrUrl]);

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
            <h3 className={styles.DesktopDashboard_controlTitle}>Book Appointment</h3>
            {loading ? (
              <div className={styles.DesktopDashboard_qrWrapper}>
                <LoadingDots />
              </div>
            ) : data?.clinicDisplayId ? (
              <>
                <div className={styles.DesktopDashboard_qrWrapper} ref={qrRef}>
                  <QRCodeSVG value={qrUrl} size={200} level="H" />
                </div>
                <div className={styles.DesktopDashboard_qrActions}>
                  <button className={styles.DesktopDashboard_qrActionBtn} onClick={handleShare} title="Share">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className={styles.DesktopDashboard_qrActionBtn} onClick={handleDownload} title="Download">
                    <Download size={16} />
                    Download
                  </button>
                  <button className={styles.DesktopDashboard_qrActionBtn} onClick={handlePrint} title="Print">
                    <Printer size={16} />
                    Print
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.DesktopDashboard_qrUnavailable}>
                <span>QR unavailable</span>
                <span>Clinic ID not configured</span>
              </div>
            )}
            <p className={styles.DesktopDashboard_qrLabel}>Scan to book appointment</p>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default DesktopDashboard;
