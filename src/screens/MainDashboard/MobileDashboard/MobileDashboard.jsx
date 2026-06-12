import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Share2, Download, Printer, Clock, Minus } from "lucide-react";
import LayoutContainer from "../../../components/LayoutContainer/LayoutContainer";
import {
  fetchDashboardData,
  fetchTodayPatients,
  currentConsulattionStatus,
} from "../../../services/apis/dashboard.service";
import { selectRefreshTrigger } from "../../../store/dashboard/dashboard.selectors";
import useSubscription from "../../../hooks/useSubscription";
import SubscriptionBanner from "../../../components/SubscriptionBanner/SubscriptionBanner";
import { QRCodeSVG } from "qrcode.react";
import LoadingDots from "../../../components/LoadingDots/LoadingDots";
import TodayPatientsDetails from "./TodayPatientsDetails";
import styles from "./MobileDashboard.module.css";

const statusClassMap = {
  completed: styles.MobileDashboard_statusCompleted,
  cancelled: styles.MobileDashboard_statusCancelled,
  "in consultation": styles.MobileDashboard_statusConsultation,
  "in-consultation": styles.MobileDashboard_statusConsultation,
  waiting: styles.MobileDashboard_statusWaiting,
};

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState("queue");
  const refreshTrigger = useSelector(selectRefreshTrigger);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [consultationStatus, setConsultationStatus] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const qrRef = useRef(null);
  const { subscription } = useSubscription();

  const qrUrl = data?.clinicDisplayId
    ? `https://gridvital.vercel.app/book-appointment?clinicId=${data.clinicDisplayId}`
    : "";

  const handleDownload = useCallback(() => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scale = 4;
    const size = 200 * scale;
    canvas.width = size;
    canvas.height = size;
    const img = new Image();
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      canvas.toBlob((pngBlob) => {
        const pngUrl = URL.createObjectURL(pngBlob);
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `qr-${data?.clinicDisplayId || "appointment"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
    };
    img.src = url;
  }, [data?.clinicDisplayId]);

  const handlePrint = useCallback(() => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const printWindow = window.open("", "_blank");
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
        await navigator.share({ title: "Book Appointment", url: qrUrl });
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
        const [dashboardRes, patientsRes, statusRes] = await Promise.all([
          fetchDashboardData(),
          fetchTodayPatients(),
          currentConsulattionStatus(),
        ]);
        setData(dashboardRes.data);
        setPatients(
          patientsRes?.success && Array.isArray(patientsRes.data)
            ? patientsRes.data
            : [],
        );
        setConsultationStatus(statusRes?.success ? statusRes.data : null);
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
        <SubscriptionBanner subscription={subscription} />
        {consultationStatus && (
          <div className={styles.MobileDashboard_consultationCard}>
            <div className={styles.MobileDashboard_consultationCurrent}>
              <div className={styles.MobileDashboard_consultationLabel}>
                <span className={styles.MobileDashboard_consultationDot} />
                Current
              </div>
              {consultationStatus.current ? (
                <div
                  className={styles.MobileDashboard_consultationPatient}
                  onClick={() =>
                    setSelectedTokenId(consultationStatus.current.tokenId)
                  }
                >
                  <span className={styles.MobileDashboard_consultationToken}>
                    #{consultationStatus.current.tokenNumber}
                  </span>
                  <span className={styles.MobileDashboard_consultationName}>
                    {consultationStatus.current.patientName}
                  </span>
                </div>
              ) : (
                <div className={styles.MobileDashboard_consultationEmpty}>
                  <Clock size={14} />
                  <span>Not Started</span>
                </div>
              )}
            </div>
            <div className={styles.MobileDashboard_consultationDivider} />
            <div className={styles.MobileDashboard_consultationNext}>
              <div className={styles.MobileDashboard_consultationLabel}>
                Next
              </div>
              {consultationStatus.next ? (
                <div
                  className={styles.MobileDashboard_consultationPatient}
                  onClick={() =>
                    setSelectedTokenId(consultationStatus.next.tokenId)
                  }
                >
                  <span className={styles.MobileDashboard_consultationToken}>
                    #{consultationStatus.next.tokenNumber}
                  </span>
                  <span className={styles.MobileDashboard_consultationName}>
                    {consultationStatus.next.patientName}
                  </span>
                </div>
              ) : (
                <div className={styles.MobileDashboard_consultationEmpty}>
                  <Minus size={14} />
                  <span>No Next</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.MobileDashboard_metricsGrid}>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>
              Live Token
            </span>
            <span className={styles.MobileDashboard_metricValue}>
              {loading ? <LoadingDots /> : data?.liveTokenCounter}
            </span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>
              Today's Visits
            </span>
            <span className={styles.MobileDashboard_metricValue}>
              {loading ? <LoadingDots /> : data?.totalPatientsToday}
            </span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>
              Monthly Total
            </span>
            <span className={styles.MobileDashboard_metricValue}>
              {loading ? <LoadingDots /> : data?.monthlyTotalPatients}
            </span>
          </div>
          <div className={styles.MobileDashboard_metricCard}>
            <span className={styles.MobileDashboard_metricLabel}>
              Total Earnings
            </span>
            <span className={styles.MobileDashboard_metricValue}>
              {loading ? <LoadingDots /> : data?.todayRevenue}
            </span>
          </div>
        </div>

        <div className={styles.MobileDashboard_tabBar}>
          <button
            className={`${styles.MobileDashboard_tab} ${activeTab === "queue" ? styles.MobileDashboard_tabActive : ""}`}
            onClick={() => setActiveTab("queue")}
          >
            Live Queue List
          </button>
          <button
            className={`${styles.MobileDashboard_tab} ${activeTab === "console" ? styles.MobileDashboard_tabActive : ""}`}
            onClick={() => setActiveTab("console")}
          >
            Quick Action Console
          </button>
        </div>

        {activeTab === "queue" && (
          <div className={styles.MobileDashboard_queueList}>
            {patients.length > 0 ? (
              patients.map((p) => (
                <div
                  key={p.id}
                  className={styles.MobileDashboard_patientCard}
                  onClick={() => setSelectedTokenId(p.id)}
                >
                  <div className={styles.MobileDashboard_patientCardTop}>
                    <span className={styles.MobileDashboard_patientToken}>
                      {p.token}
                    </span>
                    <span
                      className={`${styles.MobileDashboard_patientStatus} ${statusClassMap[p.status?.toLowerCase()] || styles.MobileDashboard_statusWaiting}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className={styles.MobileDashboard_patientName}>
                    {p.name}
                  </div>
                  <div className={styles.MobileDashboard_patientDetails}>
                    <span>{p.phone}</span>
                    <span className={styles.MobileDashboard_patientDetailsDot}>
                      •
                    </span>
                    <span>{p.complaints}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.MobileDashboard_emptyState}>
                No patients today
              </div>
            )}
          </div>
        )}

        {activeTab === "console" && (
          <div className={styles.MobileDashboard_consolePanel}>
            <h3 className={styles.MobileDashboard_consoleTitle}>
              Book Appointment
            </h3>
            {loading ? (
              <div className={styles.MobileDashboard_qrWrapper}>
                <LoadingDots />
              </div>
            ) : data?.clinicDisplayId ? (
              <>
                <div className={styles.MobileDashboard_qrWrapper} ref={qrRef}>
                  <QRCodeSVG value={qrUrl} size={180} level="H" />
                </div>
                <div className={styles.MobileDashboard_qrActions}>
                  <button
                    className={styles.MobileDashboard_qrActionBtn}
                    onClick={handleShare}
                    title="Share"
                  >
                    <Share2 size={15} />
                    Share
                  </button>
                  <button
                    className={styles.MobileDashboard_qrActionBtn}
                    onClick={handleDownload}
                    title="Download"
                  >
                    <Download size={15} />
                    Download
                  </button>
                  <button
                    className={styles.MobileDashboard_qrActionBtn}
                    onClick={handlePrint}
                    title="Print"
                  >
                    <Printer size={15} />
                    Print
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.MobileDashboard_qrUnavailable}>
                <span>QR unavailable</span>
                <span>Clinic ID not configured</span>
              </div>
            )}
            <p className={styles.MobileDashboard_qrLabel}>
              Scan to book appointment
            </p>
          </div>
        )}
      </div>

      {selectedTokenId && (
        <TodayPatientsDetails
          tokenId={selectedTokenId}
          onClose={() => setSelectedTokenId(null)}
        />
      )}
    </LayoutContainer>
  );
};

export default MobileDashboard;
