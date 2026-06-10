import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import { fetchTodayPatientsDetails, addPrescription } from '../../../services/apis/dashboard.service';
import LoadingDots from '../../../components/LoadingDots/LoadingDots';
import styles from './TodayPatientsDetails.module.css';

const IN_CONSULTATION_STATUSES = ['in consultation', 'in-consultation'];

const TodayPatientsDetails = ({ tokenId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState('');
  const [fees, setFees] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [prescriptionsOpen, setPrescriptionsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchTodayPatientsDetails({ tokenId });
        if (res?.success) setDetails(res.data);
      } catch {
        // handle silently
      } finally {
        setLoading(false);
      }
    })();
  }, [tokenId]);

  const isInConsultation = details && IN_CONSULTATION_STATUSES.includes(details.status?.toLowerCase());

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

  const handleSubmit = async () => {
    const hasPrescription = prescription.trim().length > 0;
    const hasFees = fees !== '' && fees !== null;

    if (!hasPrescription && !hasFees) {
      setSubmitError('Fill at least prescription or fee');
      return;
    }

    if (hasFees) {
      const feeNum = Number(fees);
      if (isNaN(feeNum) || feeNum < 0) {
        setSubmitError('Fee must be a valid positive number');
        return;
      }
    }

    setSubmitting(true);
    setSubmitError('');

    const payload = { tokenId };
    if (hasPrescription) payload.prescription = prescription.trim();
    if (hasFees) payload.fees = Number(fees);

    try {
      const res = await addPrescription(payload);
      if (res?.success) {
        setSubmitSuccess(true);
        setSuccessMessage(res.message || 'Saved successfully');
      } else {
        setSubmitError(res?.message || 'Failed to save');
      }
    } catch {
      setSubmitError('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const rows = details
    ? [
        { label: 'Name', value: details.name },
        { label: 'Age', value: details.age ?? '-' },
        { label: 'Gender', value: details.gender ?? '-' },
        ...(isInConsultation ? [] : [{ label: 'Token Number', value: `#${details.tokenNumber}` }]),
        ...(isInConsultation ? [] : [{ label: 'Status', value: details.status, status: true }]),
        { label: 'Visit Date', value: formatDate(details.visitDate), sub: formatTime(details.visitDate) },
        { label: 'Consent', value: details.isConsent ? 'Yes' : 'No' },
        { label: 'Chief Complaints', value: details.chiefComplaints || '-', paragraph: true },
      ]
    : [];

  return (
    <>
      <div className={styles.TodayPatientsDetails_overlay} onClick={onClose} />
      <div className={styles.TodayPatientsDetails_modal}>
        <div className={styles.TodayPatientsDetails_header}>
          <h2 className={styles.TodayPatientsDetails_title}>Patient Details</h2>
          <button className={styles.TodayPatientsDetails_closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className={styles.TodayPatientsDetails_loading}>
            <LoadingDots />
          </div>
        ) : details ? (
          <div className={styles.TodayPatientsDetails_body}>
            {rows.map((r) =>
              r.paragraph ? (
                <div key={r.label} className={styles.TodayPatientsDetails_paragraphRow}>
                  <span className={styles.TodayPatientsDetails_label}>{r.label}</span>
                  <p className={styles.TodayPatientsDetails_paragraph}>{r.value}</p>
                </div>
              ) : (
                <div key={r.label} className={styles.TodayPatientsDetails_row}>
                  <span className={styles.TodayPatientsDetails_label}>{r.label}</span>
                  <span
                    className={`${styles.TodayPatientsDetails_value} ${r.status ? styles.TodayPatientsDetails_statusBadge : ''}`}
                  >
                    {r.value}
                    {r.sub && <span className={styles.TodayPatientsDetails_sub}>{r.sub}</span>}
                  </span>
                </div>
              )
            )}

            {details.pastPrescriptions?.length > 0 && (
              <div className={styles.TodayPatientsDetails_paragraphRow}>
                <div
                  className={styles.TodayPatientsDetails_prescriptionHeader}
                  onClick={() => setPrescriptionsOpen(!prescriptionsOpen)}
                >
                  <span className={styles.TodayPatientsDetails_label}>Past Prescriptions</span>
                  <ChevronRight
                    size={14}
                    className={`${styles.TodayPatientsDetails_chevron} ${prescriptionsOpen ? styles.TodayPatientsDetails_chevronOpen : ''}`}
                  />
                </div>
                {prescriptionsOpen && (
                  <div className={styles.TodayPatientsDetails_prescriptionList}>
                    {details.pastPrescriptions.map((p, i) => (
                      <div key={i} className={styles.TodayPatientsDetails_prescriptionItem}>
                        <span className={styles.TodayPatientsDetails_prescriptionText}>
                          {p.prescription}
                        </span>
                        <span className={styles.TodayPatientsDetails_prescriptionDate}>
                          {formatDate(p.date)} {formatTime(p.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {isInConsultation && (
              <div className={styles.TodayPatientsDetails_formSection}>
                <h3 className={styles.TodayPatientsDetails_formTitle}>Prescription & Fee</h3>

                {submitSuccess && (
                  <div className={styles.TodayPatientsDetails_submitSuccess}>
                    <CheckCircle2 size={16} />
                    {successMessage}
                  </div>
                )}

                <div className={styles.TodayPatientsDetails_fieldGroup}>
                  <label className={styles.TodayPatientsDetails_fieldLabel}>Prescription</label>
                  <textarea
                    className={styles.TodayPatientsDetails_textarea}
                    placeholder="Enter prescription..."
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    disabled={submitting || submitSuccess}
                    rows={3}
                  />
                </div>

                <div className={styles.TodayPatientsDetails_fieldGroup}>
                  <label className={styles.TodayPatientsDetails_fieldLabel}>Doctor Fee (₹)</label>
                  <input
                    className={styles.TodayPatientsDetails_input}
                    type="number"
                    placeholder="Enter fee"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    disabled={submitting || submitSuccess}
                    min="0"
                  />
                </div>

                {submitError && (
                  <p className={styles.TodayPatientsDetails_submitError}>{submitError}</p>
                )}

                {!submitSuccess && (
                  <button
                    className={styles.TodayPatientsDetails_submitBtn}
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : 'Save Prescription & Fee'}
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.TodayPatientsDetails_error}>
            Failed to load patient details
          </div>
        )}
      </div>
    </>
  );
};

export default TodayPatientsDetails;
