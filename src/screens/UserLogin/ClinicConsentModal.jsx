import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./ClinicConsentModal.module.css";

const ClinicConsentModal = ({ show, onAccept, onDecline }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={styles.ClinicConsentModal_overlay}
      onClick={onDecline}
    >
      <div
        className={styles.ClinicConsentModal_box}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.ClinicConsentModal_header}>
          <h2 className={styles.ClinicConsentModal_title}>
            Terms & Consent Agreement
          </h2>
          <button
            className={styles.ClinicConsentModal_closeBtn}
            onClick={onDecline}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.ClinicConsentModal_scrollBox}>
          {/* Section 1 */}
          <div className={styles.ClinicConsentModal_section}>
            <h3 className={styles.ClinicConsentModal_sectionHeading}>
              1. Data Custodianship & Privacy (डेटा स्वामित्व और गोपनीयता)
            </h3>
            <p className={styles.ClinicConsentModal_text}>
              <strong>English:</strong> GridVital operates strictly as a
              technological data routing and scheduling infrastructure. All
              patient records, histories, and consulting logs compiled on the
              platform remain the exclusive property of the registering
              Clinic/Doctor. GridVital will process this data under strict
              security compliance protocols as per prevailing digital data
              protection guidelines.
            </p>
            <p className={styles.ClinicConsentModal_hindiText}>
              <strong>Hindi:</strong> GridVital केवल एक डिजिटल इंफ्रास्ट्रक्चर
              प्लेटफॉर्म है। इस प्लेटफॉर्म पर रजिस्टर होने वाले मरीजों का डेटा,
              टोकन हिस्ट्री और कंसल्टेशन लॉग्स पर पूरी तरह से आपका
              (क्लीनिक/डॉक्टर का) मालिकाना हक रहेगा। GridVital इस डेटा को पूरी
              सुरक्षा के साथ प्रोसेस करेगा।
            </p>
          </div>

          {/* Section 2 */}
          <div className={styles.ClinicConsentModal_section}>
            <h3 className={styles.ClinicConsentModal_sectionHeading}>
              2. Absolute Clinical Liability (पूर्ण चिकित्सा और कानूनी
              जिम्मेदारी)
            </h3>
            <p className={styles.ClinicConsentModal_text}>
              <strong>English:</strong> GridVital is purely an automated token
              management and digital appointment workflow platform. It does not
              provide medical advice, diagnosis, or clinical validation. The
              entire responsibility for patient diagnosis, treatment, physical or
              digital examination, and legal verification of all written
              prescription medicines lies solely and absolutely with the
              practicing registered medical practitioner (Doctor).
            </p>
            <p className={styles.ClinicConsentModal_hindiText}>
              <strong>Hindi:</strong> GridVital केवल एक ऑटोमेटेड टोकन
              मैनेजमेंट और अपॉइंटमेंट शेड्यूलिंग प्लेटफॉर्म है। यह किसी भी
              प्रकार की चिकित्सीय सलाह (Medical Advice) या डायग्नोसिस नहीं
              देता है। मरीजों के इलाज, जांच, परामर्श और पर्चे (Prescription)
              पर लिखी दवाओं की पूरी कानूनी और नैतिक जिम्मेदारी पूरी तरह से
              डॉक्टर की होगी। सॉफ्टवेयर किसी भी क्लिनिकल एरर या डिस्प्यूट के
              लिए जिम्मेदार नहीं होगा।
            </p>
          </div>

          {/* Section 3 */}
          <div className={styles.ClinicConsentModal_section}>
            <h3 className={styles.ClinicConsentModal_sectionHeading}>
              3. Authenticity of Credentials (दस्तावेजों की प्रामाणिकता)
            </h3>
            <p className={styles.ClinicConsentModal_text}>
              <strong>English:</strong> By checking this consent box, you verify
              that you are a certified medical professional registered with the
              relevant Medical Council. You confirm that the Registration
              License Number, Doctor Name, Clinic Name, and statutory fee
              parameters provided during the profile setup are authentic, true,
              and active.
            </p>
            <p className={styles.ClinicConsentModal_hindiText}>
              <strong>Hindi:</strong> इस कंसेंट बॉक्स को टिक करके आप यह
              प्रमाणित करते हैं कि आप एक मान्यता प्राप्त रजिस्टर्ड मेडिकल
              प्रैक्टिशनर (डॉक्टर) हैं। आपके द्वारा प्रोफाइल सेटअप में भरा गया
              मेडिकल काउंसिल रजिस्ट्रेशन नंबर, आपका नाम और क्लीनिक का विवरण
              पूरी तरह से सत्य और वैध है।
            </p>
          </div>

          {/* Section 4 */}
          <div className={styles.ClinicConsentModal_section}>
            <h3 className={styles.ClinicConsentModal_sectionHeading}>
              4. Patient Communication Consent (मरीज संचार सहमति)
            </h3>
            <p className={styles.ClinicConsentModal_text}>
              <strong>English:</strong> The clinic acknowledges that the
              communication pathways (including but not limited to Digital SMS
              or Transactional Status Messages) are triggered purely to update
              the queue lifecycle metrics to the onboarded patients.
            </p>
            <p className={styles.ClinicConsentModal_hindiText}>
              <strong>Hindi:</strong> क्लीनिक इस बात से सहमत है कि सिस्टम द्वारा
              मरीजों को भेजे जाने वाले टोकन अलर्ट्स और मैसेजेस केवल उनके
              लाइव कतार (Queue Status) को अपडेट रखने के लिए हैं, इसका कोई
              व्यावसायिक दुरुपयोग नहीं किया जाएगा।
            </p>
          </div>
        </div>

        <div className={styles.ClinicConsentModal_footer}>
          <button
            className={styles.ClinicConsentModal_declineBtn}
            onClick={onDecline}
          >
            Cancel / Decline
          </button>
          <button
            className={styles.ClinicConsentModal_acceptBtn}
            onClick={onAccept}
          >
            I Consent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicConsentModal;
