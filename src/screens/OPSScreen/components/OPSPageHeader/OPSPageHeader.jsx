import { ArrowLeft, LogOut } from "lucide-react";
import styles from "./OPSPageHeader.module.css";

const OPSPageHeader = ({ title, onBack, showLogout, onLogout, rightAction }) => {
  return (
    <div className={styles.OPSPageHeader_header}>
      <div className={styles.OPSPageHeader_left}>
        {onBack && (
          <button
            className={styles.OPSPageHeader_backBtn}
            onClick={onBack}
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </button>
        )}
      </div>
      <h1 className={styles.OPSPageHeader_title}>{title}</h1>
      <div className={styles.OPSPageHeader_right}>
        {rightAction}
        {showLogout && (
          <button
            className={styles.OPSPageHeader_logoutBtn}
            onClick={onLogout}
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default OPSPageHeader;
