import styles from "./OPSLoadingSpinner.module.css";

const OPSLoadingSpinner = ({ fullPage }) => {
  if (fullPage) {
    return (
      <div className={styles.OPSLoadingSpinner_fullPage}>
        <div className={styles.OPSLoadingSpinner_spinner} />
      </div>
    );
  }

  return (
    <div className={styles.OPSLoadingSpinner_wrapper}>
      <div className={styles.OPSLoadingSpinner_spinner} />
    </div>
  );
};

export default OPSLoadingSpinner;
