import { Trash2, MapPin, ChevronRight } from "lucide-react";
import OPSSubscriptionBadge from "../OPSSubscriptionBadge/OPSSubscriptionBadge";
import styles from "./OPSClinicCard.module.css";

const OPSClinicCard = ({ clinic, onClick, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.OPSClinicCard_card} onClick={onClick}>
      <div className={styles.OPSClinicCard_top}>
        <div className={styles.OPSClinicCard_nameRow}>
          <span className={styles.OPSClinicCard_name}>
            {clinic.clinicName}
          </span>
          <OPSSubscriptionBadge type={clinic.subscriptionType} />
        </div>
        <button
          className={styles.OPSClinicCard_deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(clinic);
          }}
          aria-label="Delete clinic"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <span className={styles.OPSClinicCard_doctor}>
        {clinic.doctorName}
      </span>
      <div className={styles.OPSClinicCard_meta}>
        <span className={styles.OPSClinicCard_id}>{clinic.clinicDisplayId}</span>
        {clinic.city && (
          <>
            <span className={styles.OPSClinicCard_dot}>•</span>
            <MapPin size={11} className={styles.OPSClinicCard_pinIcon} />
            <span className={styles.OPSClinicCard_city}>{clinic.city}</span>
          </>
        )}
        <span className={styles.OPSClinicCard_dot}>•</span>
        <span className={styles.OPSClinicCard_date}>{formatDate(clinic.createdAt)}</span>
        <div className={styles.OPSClinicCard_chevron}>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default OPSClinicCard;
