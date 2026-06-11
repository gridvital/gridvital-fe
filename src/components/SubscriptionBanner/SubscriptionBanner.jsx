import { AlertTriangle, Clock } from "lucide-react";
import styles from "./SubscriptionBanner.module.css";

const SubscriptionBanner = ({ subscription, loading }) => {
  if (loading || !subscription) return null;

  const { subscriptionType, daysRemaining, subscriptionExpiresAt } = subscription;

  if (subscriptionType === "PAID_SUBSCRIBED") return null;
  if (subscriptionType === "FREE_TRIAL" && daysRemaining > 3) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isExpired = subscriptionType === "EXPIRED";

  return (
    <div
      className={`${styles.SubscriptionBanner_banner} ${
        isExpired
          ? styles.SubscriptionBanner_expired
          : styles.SubscriptionBanner_warning
      }`}
    >
      <div className={styles.SubscriptionBanner_icon}>
        {isExpired ? <AlertTriangle size={20} /> : <Clock size={20} />}
      </div>
      <div className={styles.SubscriptionBanner_content}>
        <p className={styles.SubscriptionBanner_title}>
          {isExpired
            ? "Subscription Expired"
            : `Trial ends in ${daysRemaining} day${daysRemaining !== 1 ? "s" : ""}`}
        </p>
        <p className={styles.SubscriptionBanner_subtitle}>
          {isExpired
            ? "Your subscription has expired. Please renew to continue using all features."
            : `Expires on ${formatDate(subscriptionExpiresAt)}`}
        </p>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
