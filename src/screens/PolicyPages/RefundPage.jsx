import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RefundPage.module.css';

const RefundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.refundPage_wrapper}>
      <div className={styles.refundPage_container}>
        <header className={styles.refundPage_header}>
          <button className={styles.refundPage_backLink} onClick={() => navigate('/home')}>
            &larr; Back to Home
          </button>
          <div className={styles.refundPage_brandBlock}>
            <span className={styles.refundPage_logo}>GridVital</span>
          </div>
          <h1 className={styles.refundPage_title}>Refund &amp; Cancellation Policy</h1>
          <p className={styles.refundPage_timestamp}>Last Updated: June 2026</p>
        </header>

        <main className={styles.refundPage_documentCard}>
          <p className={styles.refundPage_intro}>
            Thank you for choosing GridVital (gridvital.in). This Refund &amp; Cancellation Policy
            outlines the terms governing subscription activations, renewals, and offline manual
            transaction logs for clinic doctors and registered healthcare practitioners.
          </p>

          <section className={styles.refundPage_sectionBlock}>
            <h2 className={styles.refundPage_sectionTitle}>
              1. Manual Offline Payments &amp; Finality
              <span className={styles.refundPage_hindiSub}>(ऑफलाइन भुगतान और रिफंड नीति)</span>
            </h2>
            <div className={styles.refundPage_policyCallout}>
              <ul className={styles.refundPage_list}>
                <li className={styles.refundPage_bulletItem}>
                  <strong>Offline Processing:</strong> GridVital operates on a manual,
                  offline-to-online reconciliation workflow during its bootstrap phase. Subscriptions
                  are upgraded to PAID_SUBSCRIBED status only after offline payment confirmation (via
                  UPI, Direct Bank Transfer, or authorized channels).
                </li>
                <li className={styles.refundPage_bulletItem}>
                  <strong>Absolute Non-Refundability:</strong> Once a payment is verified and a
                  clinic&apos;s active validity period (subscriptionExpiresAt) is adjusted or extended in
                  our database system, all payments are final, non-negotiable, and 100%
                  non-refundable.
                </li>
              </ul>
              <div className={styles.refundPage_hindiNote}>
                <strong>Hindi Summary:</strong> GridVital पर सब्सक्रिप्शन मैन्युअल ऑफलाइन पेमेंट
                वेरिफिकेशन के बाद एक्टिवेट होता है। एक बार डेटाबेस में प्लान की वैधता अवधि (Expiry
                Date) बढ़ा दी जाती है, उसके बाद कोई भी भुगतान वापस (Refund) नहीं किया जाएगा।
              </div>
            </div>
          </section>

          <section className={styles.refundPage_sectionBlock}>
            <h2 className={styles.refundPage_sectionTitle}>
              2. Risk-Free Trial Period Policy
              <span className={styles.refundPage_hindiSub}>(फ्री ट्रायल और रिस्क-फ्री टेस्टिंग)</span>
            </h2>
            <ul className={styles.refundPage_list}>
              <li className={styles.refundPage_bulletItem}>
                <strong>No Upfront Financial Commitment:</strong> Every newly registered doctor
                receives an automated, default free trial window (10 days) upon account setup. This
                allows full evaluation of the live token dashboard counter and patient QR check-in
                capabilities.
              </li>
              <li className={styles.refundPage_bulletItem}>
                <strong>No Auto-Charge Risk:</strong> Since we do not collect credit card credentials
                or auto-debit configurations during setup, doctors are under no risk of automated
                hidden charges when the trial clock terminates.
              </li>
            </ul>
            <div className={styles.refundPage_hindiNote}>
              <strong>Hindi Summary:</strong> नए डॉक्टरों को 10 दिन का फ्री ट्रायल दिया जाता है ताकि
              आप बिना किसी पैसे के सॉफ्टवेयर का परीक्षण कर सकें। क्रेडिट कार्ड या ऑटो-डेबिट न होने
              के कारण ट्रायल खत्म होने पर कोई छुपा हुआ चार्ज नहीं काटा जाएगा।
            </div>
          </section>

          <section className={styles.refundPage_sectionBlock}>
            <h2 className={styles.refundPage_sectionTitle}>
              3. Grace Periods &amp; Onboarding Access Suspensions
              <span className={styles.refundPage_hindiSub}>(प्लान समाप्ति और कतार लॉक)</span>
            </h2>
            <p className={styles.refundPage_para}>
              If a subscription or free trial expires without a manual offline renewal confirmation,
              our system executes partial access rules:
            </p>
            <ol className={styles.refundPage_orderedList}>
              <li className={styles.refundPage_orderedItem}>
                <strong>Dashboard Read-Access Maintained:</strong> The doctor retains unblocked
                access to log in to their authenticated dashboard portal to view past metrics, daily
                history totals, and financial revenue audit charts.
              </li>
              <li className={styles.refundPage_orderedItem}>
                <strong>Patient Write-Block Implemented:</strong> The clinic&apos;s public patient
                registration portal (/api/patient/qr-register) is locked immediately. Patients
                scanning the counter QR code will see an automated status alert blocking entry until
                a renewal is posted.
              </li>
            </ol>
            <div className={styles.refundPage_hindiNote}>
              <strong>Hindi Summary:</strong> प्लान समाप्त होने पर, आपका डेटा सुरक्षित रहेगा और आप
              पुराना डैशबोर्ड देख सकते हैं (Read-Access), लेकिन क्यूआर कोड द्वारा मरीजों का नया
              ऑनलाइन रजिस्ट्रेशन तुरंत सस्पेंड कर दिया जाएगा (Write-Block)। भुगतान कन्फर्म होते ही
              यह लॉक तुरंत खोल दिया जाएगा।
            </div>
          </section>

          <section className={styles.refundPage_sectionBlock}>
            <h2 className={styles.refundPage_sectionTitle}>
              4. Cancellation by Platform
              <span className={styles.refundPage_hindiSub}>(अकाउंट ब्लॉक और डेटा डिलीट)</span>
            </h2>
            <ul className={styles.refundPage_list}>
              <li className={styles.refundPage_bulletItem}>
                <strong>Compliance Hard Enforcement:</strong> GridVital reserves the administrative
                right to cancel or suspend a clinic workspace instance immediately if discovered to
                be submitting fraudulent medical registration certifications or violating data
                security baselines.
              </li>
              <li className={styles.refundPage_bulletItem}>
                <strong>Pro-Rata Settlement:</strong> If an active paid subscription is cancelled
                prematurely by GridVital operators due to non-compliance or fraudulent identity, no
                refund balances will be disbursed.
              </li>
            </ul>
            <div className={styles.refundPage_hindiNote}>
              <strong>Hindi Summary:</strong> यदि कोई क्लीनिक फर्जी मेडिकल रजिस्ट्रेशन या नियमों के
              उल्लंघन में पाया जाता है, तो GridVital के पास उस अकाउंट को बिना किसी रिफंड के तुरंत
              रद्द (Cancel) करने का पूरा अधिकार सुरक्षित है।
            </div>
          </section>

          <section className={styles.refundPage_sectionBlock}>
            <h2 className={styles.refundPage_sectionTitle}>
              5. Dispute Resolution &amp; Billing Desk
              <span className={styles.refundPage_hindiSub}>(बिलिंग सहायता)</span>
            </h2>
            <ul className={styles.refundPage_list}>
              <li className={styles.refundPage_bulletItem}>
                <strong>Transaction Verification:</strong> For payment queries, wrong transaction
                credits, confirmation delays, or manual update timeline issues, please reach out to
                our team with a screenshot of the digital transaction receipt.
              </li>
              <li className={styles.refundPage_bulletItem}>
                <strong>Official Billing Support Channel:</strong> All billing escalations must be
                logged directly via our operations desk at{' '}
                <a href="mailto:support.gridvital@gmail.com" className={styles.refundPage_inlineLink}>
                  support.gridvital@gmail.com
                </a>.
              </li>
            </ul>
            <div className={styles.refundPage_hindiNote}>
              <strong>Hindi Summary:</strong> पेमेंट से जुड़े किसी भी विवाद, ट्रांजैक्शन स्क्रीनशॉट
              वेरिफिकेशन, या वैधता अपडेट न होने की स्थिति में आप सीधे support.gridvital@gmail.com पर
              संपर्क कर सकते हैं।
            </div>
          </section>
        </main>

        <footer className={styles.refundPage_footer}>
          <p className={styles.refundPage_footerText}>
            For any payment queries, transaction logs verification, or manual renewals assistance,
            write to{' '}
            <a href="mailto:support.gridvital@gmail.com" className={styles.refundPage_footerLink}>
              support.gridvital@gmail.com
            </a>.
          </p>
          <p className={styles.refundPage_footerCopyright}>
            &copy; 2026 GridVital
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RefundPage;
