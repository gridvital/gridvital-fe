import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./ClinicConsentModal.module.css";

const EN_SECTIONS = [
  {
    title: "1. Data Collection & Authorization Acknowledgement",
    body: `By completing this registration form, you explicitly authorize GridVital to safely collect, encrypt, store, and process your specific institutional metadata, including your Clinic Name, Practicing Doctor Name, Government/State Medical Council Registration Number, Contact Mobile Number, and Authorized Email Address. This corporate data string is processed strictly under secure transport layers for identity verification, account authentication, platform onboarding, and administrative system updates.`,
  },
  {
    title: "2. Verification of Medical Identity Credentials",
    body: `The registering healthcare practitioner guarantees that the submitted Medical Registration Number is valid, current, and legally authorized under active regulatory councils. GridVital operates purely as a technology pipeline and holds zero obligation to cross-verify professional licensing status. Any administrative, civil, or criminal penalties arising from the submission of fraudulent, expired, or third-party registration identities shall remain the exclusive liability of the registering entity.`,
  },
  {
    title: "3. Absolute Indemnity & Liability Exclusion Clause",
    body: `GridVital functions exclusively as a cloud-based automated token routing and workflow scheduling management infrastructure. It does not provide medical services, healthcare consultations, or official diagnostic opinions. Under no circumstances shall GridVital, its operational infrastructure, or its developers be held liable for any system downtime, communication failures, cloud storage lag, queue tracking delays, patient data management errors, or operational disruptions at the counter.`,
  },
  {
    title: "4. Absolute Medical and Clinical Accountability",
    body: `The registered clinical establishment and the practicing professional maintain 100% sole, non-delegable civil, criminal, operational, and financial liability for all clinical diagnoses, medical checkups, physical/digital tracking metrics, patient interaction disputes, and the complete statutory legitimacy of all drug prescriptions issued under these workspace credentials. The clinic also assumes total ownership of acquiring explicit verbal patient consent for any manual entry slots registered via the internal dashboard workspace.`,
  },
];

const HI_SECTIONS = [
  {
    title: "1. डेटा संग्रहण एवं उपयोग की स्पष्ट सहमति",
    body: `इस रजिस्ट्रेशन फॉर्म को पूरा करके, आप GridVital को अपने संस्थान का विवरण, जैसे— क्लीनिक का नाम, प्रैक्टिसिंग डॉक्टर का नाम, सरकारी/स्टेट मेडिकल काउंसिल रजिस्ट्रेशन नंबर, संपर्क मोबाइल नंबर और अधिकृत ईमेल आईडी को सुरक्षित रूप से कलेक्ट, स्टोर और प्रोसेस करने का अधिकार देते हैं। इस डेटा का उपयोग केवल आपकी प्रोफाइल की प्रामाणिकता जांचने, अकाउंट ऑथेंटिकेशन और प्रशासनिक सूचनाओं के लिए किया जाएगा।`,
  },
  {
    title: "2. चिकित्सा क्रेडेंशियल्स और लाइसेंस की सत्यता",
    body: `रजिस्टर करने वाले चिकित्सा पेशेवर यह गारंटी देते हैं कि प्रदान किया गया मेडिकल रजिस्ट्रेशन नंबर पूरी तरह वैध (Valid), कानूनी रूप से सही और वर्तमान में सक्रिय है। किसी भी प्रकार के गलत, एक्सपायर्ड, या फर्जी रजिस्ट्रेशन विवरण दर्ज करने पर होने वाली किसी भी कानूनी या दंडात्मक कार्रवाई के लिए GridVital या उसके डेवलपर्स किसी भी रूप में उत्तरदायी नहीं होंगे।`,
  },
  {
    title: "3. पूर्ण दायित्व मुक्ति एवं हर्जाना निषेध नियम",
    body: `GridVital केवल एक क्लाउड-आधारित डिजिटल टोकन, अपॉइंटमेंट शेड्यूलिंग और कतार प्रबंधन (Queue Management) सॉफ्टवेयर इंफ्रास्ट्रक्चर है। यह कोई चिकित्सा संस्था नहीं है और न ही कोई चिकित्सीय सलाह देता है। सॉफ़्टवेयर में किसी भी प्रकार के तकनीकी डाउनटाइम (सर्वर रुकावट), इंटरनेट विफलता, कतार शेड्यूलिंग में देरी, डेटा एंट्री की गलती, या एसएमएस/सैटलाइट नोटिफिकेशन में विलंभ के लिए GridVital कंपनी या इसके डेवलपर्स का कोई कानूनी उत्तरदायित्व नहीं होगा।`,
  },
  {
    title: "4. पूर्ण चिकित्सीय एवं व्यावहारिक जिम्मेदारी",
    body: `इस सॉफ़्टवेयर क्रेडेंशियल के तहत किए जाने वाले मरीजों के इलाज, बीमारी के निदान (Diagnosis), क्लीनिक में होने वाले किसी भी मरीज विवाद, और पर्चे (Prescription) पर लिखी दवाओं की पूरी 100% दीवानी (Civil), आपराधिक (Criminal) और व्यावहारिक जिम्मेदारी सिर्फ और सिर्फ डॉक्टर/क्लीनिक की होगी। काउंटर डेस्क या केबिन से मैन्युअल टोकन जनरेट करते समय मरीज की मौखिक सहमति सुनिश्चित करने की जिम्मेदारी भी पूरी तरह क्लिनिक की है।`,
  },
];

const ClinicConsentModal = ({ show, onAccept, onDecline }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      setLang("en");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  const sections = lang === "en" ? EN_SECTIONS : HI_SECTIONS;

  return (
    <div className={styles.ClinicConsentModal_overlay} onClick={onDecline}>
      <div
        className={styles.ClinicConsentModal_box}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.ClinicConsentModal_header}>
          <h2 className={styles.ClinicConsentModal_title}>
            Enterprise Data Processing & Liability Framework
          </h2>
          <button
            className={styles.ClinicConsentModal_closeBtn}
            onClick={onDecline}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.ClinicConsentModal_langToggle}>
          <button
            className={`${styles.ClinicConsentModal_langBtn} ${lang === "en" ? styles.ClinicConsentModal_langBtnActive : ""}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
          <button
            className={`${styles.ClinicConsentModal_langBtn} ${lang === "hi" ? styles.ClinicConsentModal_langBtnActive : ""}`}
            onClick={() => setLang("hi")}
          >
            हिंदी
          </button>
        </div>

        <div className={styles.ClinicConsentModal_scrollBox}>
          {sections.map((section, i) => (
            <div key={i} className={styles.ClinicConsentModal_section}>
              <h3 className={styles.ClinicConsentModal_sectionHeading}>
                {section.title}
              </h3>
              <p className={styles.ClinicConsentModal_text}>{section.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.ClinicConsentModal_footer}>
          <button
            className={styles.ClinicConsentModal_declineBtn}
            onClick={onDecline}
          >
            Cancel
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
