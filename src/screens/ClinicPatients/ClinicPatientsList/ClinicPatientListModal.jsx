import React, { useEffect, useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { fetchPatientAllDetails } from '../../../services/apis/dashboard.service';
import LoadingDots from '../../../components/LoadingDots/LoadingDots';
import styles from './ClinicPatientListModal.module.css';

const ClinicPatientListModal = ({ tokenId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prescriptionsOpen, setPrescriptionsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchPatientAllDetails({ tokenId });
        if (res?.success) setDetails(res.data);
      } catch {
        // handle silently
      } finally {
        setLoading(false);
      }
    })();
  }, [tokenId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const rows = details
    ? [
        { label: 'Name', value: details.name },
        { label: 'Age', value: details.age ?? '-' },
        { label: 'Gender', value: details.gender ?? '-' },
        { label: 'Token Number', value: `#${details.tokenNumber}` },
        { label: 'Status', value: details.status, status: true },
        { label: 'Visit Date', value: formatDate(details.visitDate), sub: formatTime(details.visitDate) },
        { label: 'Consent', value: details.isConsent ? 'Yes' : 'No' },
        { label: 'Chief Complaints', value: details.chiefComplaints || '-', paragraph: true },
      ]
    : [];

  return (
    <>
      <div className={styles.ClinicPatientListModal_overlay} onClick={onClose} />
      <div className={styles.ClinicPatientListModal_modal}>
        <div className={styles.ClinicPatientListModal_header}>
          <h2 className={styles.ClinicPatientListModal_title}>Patient Details</h2>
          <button className={styles.ClinicPatientListModal_closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className={styles.ClinicPatientListModal_loading}>
            <LoadingDots />
          </div>
        ) : details ? (
          <div className={styles.ClinicPatientListModal_body}>
            {rows.map((r) =>
              r.paragraph ? (
                <div key={r.label} className={styles.ClinicPatientListModal_paragraphRow}>
                  <span className={styles.ClinicPatientListModal_label}>{r.label}</span>
                  <p className={styles.ClinicPatientListModal_paragraph}>{r.value}</p>
                </div>
              ) : (
                <div key={r.label} className={styles.ClinicPatientListModal_row}>
                  <span className={styles.ClinicPatientListModal_label}>{r.label}</span>
                  <span
                    className={`${styles.ClinicPatientListModal_value} ${r.status ? styles.ClinicPatientListModal_statusBadge : ''}`}
                  >
                    {r.value}
                    {r.sub && <span className={styles.ClinicPatientListModal_sub}>{r.sub}</span>}
                  </span>
                </div>
              )
            )}

            {details.pastPrescriptions?.length > 0 && (
              <div className={styles.ClinicPatientListModal_paragraphRow}>
                <div
                  className={styles.ClinicPatientListModal_prescriptionHeader}
                  onClick={() => setPrescriptionsOpen(!prescriptionsOpen)}
                >
                  <span className={styles.ClinicPatientListModal_label}>Past Prescriptions</span>
                  <ChevronRight
                    size={14}
                    className={`${styles.ClinicPatientListModal_chevron} ${prescriptionsOpen ? styles.ClinicPatientListModal_chevronOpen : ''}`}
                  />
                </div>
                {prescriptionsOpen && (
                  <div className={styles.ClinicPatientListModal_prescriptionList}>
                    {details.pastPrescriptions.map((p, i) => (
                      <div key={i} className={styles.ClinicPatientListModal_prescriptionItem}>
                        <span className={styles.ClinicPatientListModal_prescriptionDate}>
                          {formatDate(p.date)} {formatTime(p.date)}
                        </span>
                        <span className={styles.ClinicPatientListModal_prescriptionText}>
                          {p.prescription}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.ClinicPatientListModal_error}>
            Failed to load patient details
          </div>
        )}
      </div>
    </>
  );
};

export default ClinicPatientListModal;
