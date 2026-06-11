import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.contactPage_wrapper}>
      <div className={styles.contactPage_container}>
        <header className={styles.contactPage_header}>
          <button className={styles.contactPage_backLink} onClick={() => navigate('/home')}>
            &larr; Back to Home
          </button>
          <div className={styles.contactPage_brandBlock}>
            <span className={styles.contactPage_logo}>GridVital</span>
          </div>
          <h1 className={styles.contactPage_title}>Operations &amp; Support Desk</h1>
          <p className={styles.contactPage_subtitle}>
            Connect with our internal teams to manage your clinic infrastructure.
          </p>
        </header>

        <main className={styles.contactPage_main}>
          <section className={styles.contactPage_channelsGrid}>
            <div className={styles.contactPage_channelCard}>
              <div className={styles.contactPage_cardIconWrap}>
                <span className={styles.contactPage_cardEmoji}>&#x1F6E0;&#xFE0F;</span>
              </div>
              <h2 className={styles.contactPage_cardTitle}>Technical &amp; App Support</h2>
              <p className={styles.contactPage_cardCopy}>
                For assistance regarding dashboard counters, real-time &quot;Call Next&quot; delays,
                token numbering configurations, or layout responsiveness issues on mobile/tablet
                viewports.
              </p>
              <p className={styles.contactPage_cardLabel}>Official Channel</p>
              <a href="mailto:support.gridvital@gmail.com" className={styles.contactPage_mailLink}>
                support.gridvital@gmail.com
              </a>
              <p className={styles.contactPage_cardResponse}>
                Response baseline: 12 to 24 hours
              </p>
            </div>

            <div className={styles.contactPage_channelCard}>
              <div className={styles.contactPage_cardIconWrap}>
                <span className={styles.contactPage_cardEmoji}>&#x1F4B3;</span>
              </div>
              <h2 className={styles.contactPage_cardTitle}>Billing &amp; Subscription</h2>
              <p className={styles.contactPage_cardCopy}>
                To verify offline transaction logs (UPI/Bank transfers), submit payment screenshot
                tokens, activate premium workspace timelines (PAID_SUBSCRIBED), or resolve trial
                expiration blocks.
              </p>
              <p className={styles.contactPage_cardLabel}>Official Channel</p>
              <a href="mailto:support.gridvital@gmail.com" className={styles.contactPage_mailLink}>
                support.gridvital@gmail.com
              </a>
              <p className={styles.contactPage_cardResponse}>
                Include your clinicDisplayId (e.g., GV-0001)
              </p>
            </div>

            <div className={styles.contactPage_channelCard}>
              <div className={styles.contactPage_cardIconWrap}>
                <span className={styles.contactPage_cardEmoji}>&#x1F512;</span>
              </div>
              <h2 className={styles.contactPage_cardTitle}>Privacy &amp; Account Purges</h2>
              <p className={styles.contactPage_cardCopy}>
                For triggering legal credential verifications, updating registered Medical Council
                certificates, or executing a hard cascading purge to permanently erase your clinic
                account and historical token logs.
              </p>
              <p className={styles.contactPage_cardLabel}>Official Channel</p>
              <a href="mailto:support.gridvital@gmail.com" className={styles.contactPage_mailLink}>
                support.gridvital@gmail.com
              </a>
            </div>
          </section>

          <section className={styles.contactPage_statutoryBanner}>
            <div className={styles.contactPage_statutoryIcon}>
              <span>&#x2696;&#xFE0F;</span>
            </div>
            <h2 className={styles.contactPage_statutoryTitle}>
              Grievance Redressal Officer
            </h2>
            <p className={styles.contactPage_statutoryCopy}>
              In accordance with the Information Technology Act and Digital Personal Data Protection
              guidelines, any corporate compliance disputes or unresolved data issues can be directed
              to our designated Grievance Desk.
            </p>
            <div className={styles.contactPage_statutoryDetails}>
              <p className={styles.contactPage_statutoryLine}>
                <strong>Attention to:</strong> Operations Lead, GridVital
              </p>
              <p className={styles.contactPage_statutoryLine}>
                <strong>Escalation Hub:</strong>{' '}
                <a href="mailto:support.gridvital@gmail.com" className={styles.contactPage_mailLink}>
                  support.gridvital@gmail.com
                </a>
              </p>
              <p className={styles.contactPage_statutoryLine}>
                <span className={styles.contactPage_locationIcon}>&#x1F4CD;</span>{' '}
                <strong>Registered Administrative Node:</strong> Mumbai, Maharashtra, India.
              </p>
            </div>
            <div className={styles.contactPage_hindiNote}>
              <strong>Hindi Summary:</strong> आईटी एक्ट और डिजिटल डेटा प्रोटेक्शन नियमों के तहत,
              किसी भी प्रकार की कानूनी शिकायत या डेटा ऑडिट के लिए आप सीधे support.gridvital@gmail.com पर
              संपर्क कर सकते हैं। हमारा मुख्य प्रशासनिक नोड मुंबई, भारत में स्थित है।
            </div>
          </section>
        </main>

        <footer className={styles.contactPage_footer}>
          <p className={styles.contactPage_footerText}>
            Our administrative operations conform natively with healthcare SaaS provider security
            standards.
          </p>
          <p className={styles.contactPage_footerCopyright}>
            &copy; 2026 GridVital Inc. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;
