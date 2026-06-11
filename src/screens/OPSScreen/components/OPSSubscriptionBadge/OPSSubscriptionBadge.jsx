import styles from "./OPSSubscriptionBadge.module.css";

const config = {
  FREE_TRIAL: { label: "Free Trial", className: styles.OPSSubscriptionBadge_trial },
  PAID_SUBSCRIBED: { label: "Paid", className: styles.OPSSubscriptionBadge_paid },
  EXPIRED: { label: "Expired", className: styles.OPSSubscriptionBadge_expired },
};

const OPSSubscriptionBadge = ({ type, size }) => {
  const cfg = config[type] || { label: type, className: styles.OPSSubscriptionBadge_trial };

  return (
    <span
      className={`${styles.OPSSubscriptionBadge_badge} ${cfg.className} ${
        size === "lg" ? styles.OPSSubscriptionBadge_lg : ""
      }`}
    >
      {cfg.label}
    </span>
  );
};

export default OPSSubscriptionBadge;
