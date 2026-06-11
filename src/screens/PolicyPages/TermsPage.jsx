import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TermsPage.module.css';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.termsPage_wrapper}>
      <div className={styles.termsPage_container}>
        <header className={styles.termsPage_header}>
          <button className={styles.termsPage_backLink} onClick={() => navigate('/home')}>
            &larr; Back to Home
          </button>
          <div className={styles.termsPage_brandBlock}>
            <span className={styles.termsPage_logo}>GridVital</span>
          </div>
          <h1 className={styles.termsPage_title}>Terms of Service &amp; Compliance Agreement</h1>
          <p className={styles.termsPage_timestamp}>Last Updated: June 2026</p>
        </header>

        <main className={styles.termsPage_documentSheet}>
          <p className={styles.termsPage_intro}>
            Welcome to GridVital. By accessing or registering your medical facility on our platform
            (gridvital.in), you (&quot;Clinic&quot;, &quot;Doctor&quot;, &quot;Registered Practitioner&quot;) agree to comply with
            and be bound by the following comprehensive terms and regulatory compliance guidelines.
          </p>

          <section className={styles.termsPage_sectionBlock}>
            <h2 className={styles.termsPage_sectionTitle}>
              1. The Operational Scope &amp; Role Disclaimer
              <span className={styles.termsPage_hindiSub}>(प्लेटफॉर्म की भूमिका)</span>
            </h2>
            <ul className={styles.termsPage_list}>
              <li>
                <strong>Infrastructure Provision Only:</strong> GridVital serves strictly and
                exclusively as a decentralized B2B software-as-a-service (SaaS) cloud infrastructure
                provider. The application delivers automated token management utilities, queue
                telemetry displays, and real-time counter desk self-onboarding check-in pages.
              </li>
              <li>
                <strong>No Medical Authority:</strong> GridVital does not provide clinical
                evaluations, medical triaging, diagnosis, health advice, or professional validation
                services.
              </li>
            </ul>
            <div className={styles.termsPage_hindiNote}>
              <strong>Hindi Summary:</strong> GridVital केवल एक ऑटोमेटेड टोकन और अपॉइंटमेंट
              शेड्यूलिंग सॉफ्टवेयर इन्फ्रास्ट्रक्चर है। यह कोई मेडिकल काउंसिल या चिकित्सा अधिकारी
              नहीं है, और न ही किसी तरह का क्लिनिकल इवैल्यूएशन प्रदान करता है।
            </div>
          </section>

          <section className={styles.termsPage_sectionBlock}>
            <h2 className={styles.termsPage_sectionTitle}>
              2. Absolute Clinical, Diagnostic, &amp; Legal Liability
              <span className={styles.termsPage_hindiSub}>(पूर्ण चिकित्सा जिम्मेदारी)</span>
            </h2>
            <div className={styles.termsPage_legalWarningBox}>
              <ul className={styles.termsPage_list}>
                <li>
                  <strong>Practitioner Custody:</strong> The entirely absolute responsibility for
                  medical decision-making, patient diagnostics, clinical treatment paths, physical or
                  digital symptom examination, emergency care, and the complete authenticity/legal
                  verification of all written prescription medicines lies solely, non-transferably,
                  and absolutely with the practicing registered medical professional (Doctor).
                </li>
                <li>
                  <strong>Indemnity Framework:</strong> Under no circumstances shall GridVital, its
                  parent entities, or operational infrastructure nodes be held legally liable or
                  responsible for medical malpractice, clinical errors, wrong diagnostic entries,
                  prescription disputes, or treatment complications arising inside the operating
                  workspace layout.
                </li>
              </ul>
              <div className={styles.termsPage_hindiNote}>
                <strong>Hindi Summary:</strong> मरीज के इलाज, बीमारी के निदान (Diagnosis), परामर्श,
                और पर्चे (Prescription) पर लिखी दवाओं की पूरी 100% कानूनी, नैतिक और व्यावहारिक
                जिम्मेदारी केवल डॉक्टर की होगी। सॉफ्टवेयर किसी भी प्रकार के क्लिनिकल एरर या
                डिस्प्यूट के लिए उत्तरदायी नहीं होगा।
              </div>
            </div>
          </section>

          <section className={styles.termsPage_sectionBlock}>
            <h2 className={styles.termsPage_sectionTitle}>
              3. Patient Data Custodianship &amp; Encryption Privacy
              <span className={styles.termsPage_hindiSub}>(डेटा गोपनीयता)</span>
            </h2>
            <ul className={styles.termsPage_list}>
              <li>
                <strong>Data Ownership:</strong> All primary onboarding records, contact credentials,
                health complaints, and token history metrics logs generated by onboarding patients at
                your desk remain the sole corporate and legal intellectual property of the registering
                Clinic/Doctor.
              </li>
              <li>
                <strong>Processing Consent:</strong> GridVital processes and routes this patient
                payload securely on behalf of the clinic to execute queue management. The system will
                securely isolate, archive, and manage data according to digital information routing
                standards. GridVital strictly does not lease, sell, or rent patient parameters to
                third-party distribution or pharmaceutical marketing chains.
              </li>
            </ul>
            <div className={styles.termsPage_hindiNote}>
              <strong>Hindi Summary:</strong> आपके क्लीनिक के काउंटर पर मरीजों द्वारा भरे गए डेटा और
              हिस्ट्री पर पूरी तरह से आपका (डॉक्टर का) मालिकाना हक रहेगा। GridVital इस डेटा को पूरी
              सुरक्षा के साथ प्रोसेस करता है और इसे किसी भी थर्ड-पार्टी या फार्मा कंपनी को बेचा
              नहीं जाता है।
            </div>
          </section>

          <section className={styles.termsPage_sectionBlock}>
            <h2 className={styles.termsPage_sectionTitle}>
              4. Manual Billing, Expiration Clocks, &amp; Access Control
              <span className={styles.termsPage_hindiSub}>(मैनुअल सब्सक्रिप्शन नियम)</span>
            </h2>
            <ul className={styles.termsPage_list}>
              <li>
                <strong>Trial Window:</strong> New practitioner nodes receive a free onboarding
                activation trial window (default: 10 days).
              </li>
              <li>
                <strong>Manual Upgrade Path:</strong> Upon trial termination, execution cycles are
                locked via dynamic time-validation layers. To transition to a premium license
                (&quot;PAID_SUBSCRIBED&quot;), the practitioner must manually pay the platform admins offline.
              </li>
              <li>
                <strong>Granular Lock Mechanics:</strong> If a subscription or free trial expires
                without dynamic renewal activation:
                <ol className={styles.termsPage_subList}>
                  <li>
                    <strong>Read-Access Granted:</strong> The doctor retains continuous, non-blocked
                    access to log in to their dashboard panel to view structural historical graphs,
                    analytics counters, and financial revenue audit trails.
                  </li>
                  <li>
                    <strong>Write-Block Enforced:</strong> The public patient check-in endpoint
                    (/api/patient/qr-register) is immediately suspended. Patients scanning the counter
                    QR code will receive an automated HTTP 402 error lock blocking entry until
                    subscription parameters are manually overwritten by system operators.
                  </li>
                </ol>
              </li>
              <li>
                <strong>Refund Finality:</strong> All manual offline service payments validated and
                credited to GridVital activation lines are final and non-refundable once the premium
                tier status goes live.
              </li>
            </ul>
            <div className={styles.termsPage_hindiNote}>
              <strong>Hindi Summary:</strong> ट्रायल या प्लान समाप्त होने पर, डॉक्टर अपना पिछला
              डैशबोर्ड, पुराने रिकॉर्ड्स और वित्तीय आंकड़े देख सकते हैं (Read-Access चालू रहेगा),
              लेकिन क्यूआर कोड द्वारा मरीजों का नया ऑनलाइन रजिस्ट्रेशन ब्लॉक कर दिया जाएगा
              (Write-Block चालू होगा)। ऑफलाइन पेमेंट कन्फर्म होने के बाद ही नई वैधता अवधि (Expiry
              Date) अपडेट की जाएगी, जो कि नॉन-रिफंडेबल होगी।
            </div>
          </section>

          <section className={styles.termsPage_sectionBlock}>
            <h2 className={styles.termsPage_sectionTitle}>
              5. Termination &amp; Hard Cascade Purge Protocol
              <span className={styles.termsPage_hindiSub}>(अकाउंट ब्लॉक और डेटा डिलीट)</span>
            </h2>
            <ul className={styles.termsPage_list}>
              <li>
                <strong>Verification Right:</strong> GridVital operators retain the absolute
                administrative right to temporarily audit or permanently suspend user profiles
                discovered to be utilizing fraudulent medical registration council certifications,
                invalid phone channels, or malfunctioning clinic identities.
              </li>
              <li>
                <strong>Absolute Erasure:</strong> Upon an explicit profile termination request or
                compliance purge triggered through our operations line, the system executes a clean
                absolute cascade delete layer—permanently purging the Clinic record, all child Token
                files, and linked queue statistics completely out of our primary database arrays.
              </li>
            </ul>
          </section>
        </main>

        <footer className={styles.termsPage_footer}>
          <p className={styles.termsPage_footerText}>
            For any legal inquiries or compliance clarification, please write to our operations desk
            at <a href="mailto:support.gridvital@gmail.com" className={styles.termsPage_footerLink}>support.gridvital@gmail.com</a>.
          </p>
          <p className={styles.termsPage_footerCopyright}>
            &copy; 2026 GridVital.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsPage;
