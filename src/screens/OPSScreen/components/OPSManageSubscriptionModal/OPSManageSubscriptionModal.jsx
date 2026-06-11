import { useState } from "react";
import { X } from "lucide-react";
import { opsManageSubscription } from "../../../../services/apis/ops.service";
import styles from "./OPSManageSubscriptionModal.module.css";

const OPSManageSubscriptionModal = ({ clinic, onClose, onSuccess }) => {
  const defaultStart = clinic.subscriptionStartAt
    ? new Date(clinic.subscriptionStartAt).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
  const defaultEnd = clinic.subscriptionExpiresAt
    ? new Date(clinic.subscriptionExpiresAt).toISOString().slice(0, 10)
    : "";

  const [planType, setPlanType] = useState(clinic.subscriptionType || "FREE_TRIAL");
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [amountPaid, setAmountPaid] = useState(clinic.subscriptionAmount || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const isExpired = planType === "EXPIRED";

  const validate = () => {
    const errs = {};
    if (!isExpired) {
      if (!startDate) errs.startDate = "Start date is required";
      if (!endDate) errs.endDate = "End date is required";
      if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
        errs.endDate = "End date must be after start date";
      }
      if (amountPaid < 0) errs.amountPaid = "Amount cannot be negative";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      const payload = {
        clinicId: clinic._id,
        planType,
      };
      if (!isExpired) {
        payload.startDate = startDate;
        payload.endDate = endDate;
        payload.amountPaid = amountPaid;
      }
      const res = await opsManageSubscription(payload);
      if (res?.success) {
        onSuccess();
      } else {
        setError(res?.message || "Failed to update subscription");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.OPSManageSubscriptionModal_overlay} onClick={loading ? undefined : onClose} />
      <div className={styles.OPSManageSubscriptionModal_sheet}>
        <div className={styles.OPSManageSubscriptionModal_handle} />
        <div className={styles.OPSManageSubscriptionModal_header}>
          <h2 className={styles.OPSManageSubscriptionModal_title}>
            Manage Subscription
          </h2>
          <button
            className={styles.OPSManageSubscriptionModal_closeBtn}
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form className={styles.OPSManageSubscriptionModal_form} onSubmit={handleSubmit}>
          <div className={styles.OPSManageSubscriptionModal_field}>
            <label className={styles.OPSManageSubscriptionModal_label}>Plan Type</label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className={styles.OPSManageSubscriptionModal_select}
              disabled={loading}
            >
              <option value="FREE_TRIAL">Free Trial</option>
              <option value="PAID_SUBSCRIBED">Paid Subscribed</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>

          {!isExpired && (
            <>
              <div className={styles.OPSManageSubscriptionModal_row}>
                <div className={styles.OPSManageSubscriptionModal_field}>
                  <label className={styles.OPSManageSubscriptionModal_label}>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`${styles.OPSManageSubscriptionModal_input} ${
                      fieldErrors.startDate ? styles.OPSManageSubscriptionModal_inputError : ""
                    }`}
                    disabled={loading}
                  />
                  {fieldErrors.startDate && (
                    <span className={styles.OPSManageSubscriptionModal_fieldError}>
                      {fieldErrors.startDate}
                    </span>
                  )}
                </div>
                <div className={styles.OPSManageSubscriptionModal_field}>
                  <label className={styles.OPSManageSubscriptionModal_label}>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`${styles.OPSManageSubscriptionModal_input} ${
                      fieldErrors.endDate ? styles.OPSManageSubscriptionModal_inputError : ""
                    }`}
                    disabled={loading}
                  />
                  {fieldErrors.endDate && (
                    <span className={styles.OPSManageSubscriptionModal_fieldError}>
                      {fieldErrors.endDate}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.OPSManageSubscriptionModal_field}>
                <label className={styles.OPSManageSubscriptionModal_label}>
                  Amount Paid (₹)
                </label>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(Number(e.target.value))}
                  className={`${styles.OPSManageSubscriptionModal_input} ${
                    fieldErrors.amountPaid ? styles.OPSManageSubscriptionModal_inputError : ""
                  }`}
                  min="0"
                  disabled={loading}
                />
                {fieldErrors.amountPaid && (
                  <span className={styles.OPSManageSubscriptionModal_fieldError}>
                    {fieldErrors.amountPaid}
                  </span>
                )}
              </div>
            </>
          )}

          {error && (
            <div className={styles.OPSManageSubscriptionModal_apiError}>{error}</div>
          )}

          <button
            type="submit"
            className={styles.OPSManageSubscriptionModal_submitBtn}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className={styles.OPSManageSubscriptionModal_cancelBtn}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default OPSManageSubscriptionModal;
