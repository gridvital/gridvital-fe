import { X } from 'lucide-react';
import styles from './IOSInstallModal.module.css';

const IOSInstallModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.iosInstallModal_overlay} onClick={onClose}>
      <div className={styles.iosInstallModal_modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.iosInstallModal_closeBtn} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className={styles.iosInstallModal_shareIcon}>📤</div>
        <h3 className={styles.iosInstallModal_title}>iOS Device Detected</h3>
        <p className={styles.iosInstallModal_subtitle}>
          To install GridVital on your home screen:
        </p>
        <ol className={styles.iosInstallModal_steps}>
          <li>
            Tap the <strong>Share</strong> button{' '}
            <span className={styles.iosInstallModal_stepIcon}>📤</span> in Safari
          </li>
          <li>
            Scroll down and select{' '}
            <span className={styles.iosInstallModal_highlight}>
              ➕ Add to Home Screen
            </span>
          </li>
          <li>
            Tap <strong>Add</strong> in the top right corner
          </li>
        </ol>
        <p className={styles.iosInstallModal_note}>
          GridVital will appear on your home screen like a native app
        </p>
      </div>
    </div>
  );
};

export default IOSInstallModal;
