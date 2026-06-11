import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { opsDeleteClinic } from "../../../../services/apis/ops.service";
import styles from "./OPSDeleteConfirmModal.module.css";

const OPSDeleteConfirmModal = ({ clinic, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await opsDeleteClinic({ clinicId: clinic._id });
      if (res?.success) {
        onSuccess();
      } else {
        setError(res?.message || "Failed to delete clinic");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.OPSDeleteConfirmModal_overlay} onClick={loading ? undefined : onClose} />
      <div className={styles.OPSDeleteConfirmModal_dialog}>
        <button
          className={styles.OPSDeleteConfirmModal_closeBtn}
          onClick={onClose}
          disabled={loading}
        >
          <X size={18} />
        </button>
        <div className={styles.OPSDeleteConfirmModal_iconWrap}>
          <AlertTriangle size={32} />
        </div>
        <h2 className={styles.OPSDeleteConfirmModal_title}>Delete Clinic?</h2>
        <p className={styles.OPSDeleteConfirmModal_text}>
          This will permanently delete the clinic <strong>{clinic.clinicName}</strong> ({clinic.clinicDisplayId}),
          all patient records, and all visit tokens. This action cannot be undone.
        </p>
        {error && (
          <p className={styles.OPSDeleteConfirmModal_error}>{error}</p>
        )}
        <div className={styles.OPSDeleteConfirmModal_buttons}>
          <button
            className={styles.OPSDeleteConfirmModal_cancelBtn}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={styles.OPSDeleteConfirmModal_deleteBtn}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OPSDeleteConfirmModal;
