import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PrivacyPage.module.css';

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.privacyPage_wrapper}>
      <div className={styles.privacyPage_container}>
        <header className={styles.privacyPage_header}>
          <button className={styles.privacyPage_backLink} onClick={() => navigate('/home')}>
            &larr; Back to Home
          </button>
          <div className={styles.privacyPage_brandBlock}>
            <span className={styles.privacyPage_logo}>GridVital</span>
          </div>
          <h1 className={styles.privacyPage_title}>Privacy Policy &amp; Data Security Framework</h1>
          <p className={styles.privacyPage_timestamp}>Last Updated: June 2026</p>
        </header>

        <main className={styles.privacyPage_documentCard}>
          <p className={styles.privacyPage_intro}>
            GridVital (&quot;we&quot;, &quot;our&quot;, &quot;Platform&quot;) is committed to maintaining the highest benchmarks
            of data privacy, structural transparency, and digital encryption security. This Privacy
            Policy outlines exactly how we process, isolate, and safe-keep information when clinic
            doctors register their medical workspaces and when patients self-board via counter desk
            QR automation codes at gridvital.in.
          </p>

          <section className={styles.privacyPage_sectionBlock}>
            <h2 className={styles.privacyPage_sectionTitle}>
              1. Data Collected &amp; Processing Purpose
              <span className={styles.privacyPage_hindiSub}>(डेटा संग्रह और उपयोग का उद्देश्य)</span>
            </h2>
            <p className={styles.privacyPage_para}>
              We parse and store minimal, zero-bloat parameter inputs to execute live katar (queue)
              metrics successfully.
            </p>
            <ul className={styles.privacyPage_list}>
              <li className={styles.privacyPage_bulletItem}>
                <strong>From Registering Clinicians/Doctors:</strong> Profile data elements including
                Full Name, Certified Medical Council Registration Number, Contact Phone, Corporate
                Email, Clinic Workspace Address, State, City, and Custom Consultation Fees.
              </li>
              <li className={styles.privacyPage_bulletItem}>
                <strong>From Onboarding Patients (Via Desk QR Codes):</strong> Localized operational
                fields including Patient Name, Primary Contact Phone, Email Address, Gender, Age, and
                Chief Medical Complaints (&quot;Apni Bimari / Pareshani&quot;).
              </li>
              <li className={styles.privacyPage_bulletItem}>
                <strong>Processing Purpose:</strong> This data is utilized solely to compile live
                dashboard statistics, manage queue tokens (Waiting, In-Consultation, Completed),
                track dynamic calendar expiration clocks, and trigger transactional update
                communication sequences to the waiting patients.
              </li>
            </ul>
            <div className={styles.privacyPage_hindiNote}>
              <strong>Hindi Summary:</strong> GridVital केवल आवश्यक डेटा कलेक्ट करता है—जैसे डॉक्टरों के
              क्रेडेंशियल्स और मरीजों का नाम, फोन और बीमारी की शिकायत। यह डेटा केवल लाइव टोकन नंबर
              अलॉट करने, कतार प्रबंधित करने और डैशबोर्ड आंकड़े अपडेट करने के लिए उपयोग किया जाता है।
            </div>
          </section>

          <section className={styles.privacyPage_sectionBlock}>
            <h2 className={styles.privacyPage_sectionTitle}>
              2. Strict Non-Commercialization Guarantee
              <span className={styles.privacyPage_hindiSub}>(डेटा बेचने या शेयर न करने की गारंटी)</span>
            </h2>
            <div className={styles.privacyPage_guaranteeBox}>
              <ul className={styles.privacyPage_list}>
                <li className={styles.privacyPage_bulletItem}>
                  <strong>Zero Monetization Clause:</strong> GridVital strictly enforces an absolute,
                  zero-exception data isolation policy. We DO NOT rent, sell, trade, barter, or
                  distribute patient health complaints, contact metrics, or clinical diagnostics to
                  third-party data brokers, marketing intermediaries, or pharmaceutical production
                  chains.
                </li>
                <li className={styles.privacyPage_bulletItem}>
                  <strong>Operational Isolation:</strong> All patient rows mapped to a unique
                  clinicId are securely isolated inside our cloud storage instances, accessible
                  exclusively by the treating medical practitioner.
                </li>
              </ul>
              <div className={styles.privacyPage_hindiNote}>
                <strong>Hindi Summary:</strong> GridVital आपके या आपके मरीजों के मेडिकल डेटा को किसी भी
                थर्ड-पार्टी, मार्केटिंग एजेंसी या फार्मास्युटिकल कंपनी को कभी नहीं बेचता है। हर
                क्लीनिक का डेटा डेटाबेस में पूरी तरह से अलग और सुरक्षित (Isolate) रखा जाता है।
              </div>
            </div>
          </section>

          <section className={styles.privacyPage_sectionBlock}>
            <h2 className={styles.privacyPage_sectionTitle}>
              3. Subscription Access Boundaries &amp; Storage Logic
              <span className={styles.privacyPage_hindiSub}>(सब्सक्रिप्शन और डेटा सुरक्षा)</span>
            </h2>
            <ul className={styles.privacyPage_list}>
              <li className={styles.privacyPage_bulletItem}>
                <strong>Persistent Archival Framework:</strong> Even if a clinic&apos;s active trial
                window or manual premium plan expires (subscriptionType === &quot;EXPIRED&quot;), we do not
                immediately freeze or destroy the historical profile data logs. The doctor retains
                non-blocked Read-Access to look up past revenue aggregations and patient logs over
                their authenticated console.
              </li>
              <li className={styles.privacyPage_bulletItem}>
                <strong>Onboarding Halt Strategy:</strong> During subscription expiration cycles,
                our secure backend interceptors block transactional incoming write actions. No new
                patient rows can be appended via public QR portals, preventing unauthorized data
                processing under expired account states.
              </li>
            </ul>
            <div className={styles.privacyPage_hindiNote}>
              <strong>Hindi Summary:</strong> यदि आपका फ्री ट्रायल या प्लान समाप्त भी हो जाता है, तब भी
              पुराना डेटा डिलीट नहीं होता है। आप लॉग इन करके पुराने वित्तीय आंकड़े देख सकते हैं
              (Read-Access), लेकिन नया मरीज कतार में शामिल नहीं हो पाएगा (Write-Block)।
            </div>
          </section>

          <section className={styles.privacyPage_sectionBlock}>
            <h2 className={styles.privacyPage_sectionTitle}>
              4. Patient Rights &amp; The Cascading Purge Protocol
              <span className={styles.privacyPage_hindiSub}>(डेटा मिटाने का अधिकार)</span>
            </h2>
            <ul className={styles.privacyPage_list}>
              <li className={styles.privacyPage_bulletItem}>
                <strong>The Right to Erasure:</strong> In alignment with modern digital data
                protection guidelines, we believe medical practitioners retain absolute sovereign
                custody over their data records.
              </li>
              <li className={styles.privacyPage_bulletItem}>
                <strong>Hard Cascade Deletion:</strong> If an account profile is flagged for
                absolute closure or a hard purge is requested via our operations desk, GridVital
                triggers a clean database cleanup loop. This utility permanently wipes out the parent
                Clinic document, drops all relative Token history chains, and completely erases
                patient complaint indexes from primary cluster arrays.
              </li>
            </ul>
            <div className={styles.privacyPage_hindiNote}>
              <strong>Hindi Summary:</strong> डॉक्टरों के पास अपने डेटा को पूरी तरह से मिटाने का अधिकार
              है। जब हमारी सपोर्ट टीम द्वारा किसी क्लीनिक का डेटा डिलीट (Hard Purge) किया जाता है,
              तो उससे जुड़े सभी मरीजों के रिकॉर्ड, टोकन हिस्ट्री और शिकायतें डेटाबेस से हमेशा के
              लिए नष्ट कर दी जाती हैं।
            </div>
          </section>

          <section className={styles.privacyPage_sectionBlock}>
            <h2 className={styles.privacyPage_sectionTitle}>
              5. Data Security Measures &amp; Support Gateways
              <span className={styles.privacyPage_hindiSub}>(डेटा सुरक्षा और संपर्क)</span>
            </h2>
            <ul className={styles.privacyPage_list}>
              <li className={styles.privacyPage_bulletItem}>
                <strong>Security Architecture:</strong> All system API routes—both secured workspace
                controllers and public onboarding nodes—are run under encrypted Secure Socket Layers
                (HTTPS). Session management tokens are signed using cryptographic algorithms
                preventing structural database injection or cross-site tampering.
              </li>
              <li className={styles.privacyPage_bulletItem}>
                <strong>Grievance Desk:</strong> For privacy inquiries, structural audit questions,
                or data erasure requests, please contact our internal operations desk directly at{' '}
                <a href="mailto:support.gridvital@gmail.com" className={styles.privacyPage_inlineLink}>
                  support.gridvital@gmail.com
                </a>.
              </li>
            </ul>
            <div className={styles.privacyPage_hindiNote}>
              <strong>Hindi Summary:</strong> सभी डेटा ट्रांसमिशन HTTPS एन्क्रिप्टेड लेयर्स के माध्यम से
              होते हैं। किसी भी सुरक्षा ऑडिट या डेटा रिमूवल प्रश्नों के लिए आप सीधे
              support.gridvital@gmail.com पर ईमेल कर सकते हैं।
            </div>
          </section>
        </main>

        <footer className={styles.privacyPage_footer}>
          <p className={styles.privacyPage_footerText}>
            GridVital platform structures conform with global digital data management protocols. For
            direct privacy audits, write to{' '}
            <a href="mailto:support.gridvital@gmail.com" className={styles.privacyPage_footerLink}>
              support.gridvital@gmail.com
            </a>.
          </p>
          <p className={styles.privacyPage_footerCopyright}>
            &copy; 2026 GridVital
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPage;
