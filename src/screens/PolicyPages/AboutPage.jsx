import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.aboutPage_wrapper}>
      <div className={styles.aboutPage_container}>
        <header className={styles.aboutPage_header}>
          <button className={styles.aboutPage_backLink} onClick={() => navigate('/home')}>
            &larr; Back to Home
          </button>
          <div className={styles.aboutPage_brandBlock}>
            <span className={styles.aboutPage_logo}>GridVital</span>
          </div>
          <h1 className={styles.aboutPage_heroHeading}>Empowering Modern Practices</h1>
          <p className={styles.aboutPage_tagline}>
            The Next-Gen Token Infrastructure for Independent Clinics.
          </p>
        </header>

        <main className={styles.aboutPage_main}>
          <section className={styles.aboutPage_storySection}>
            <div className={styles.aboutPage_storyColumn}>
              <h2 className={styles.aboutPage_storyTitle}>The Problem</h2>
              <p className={styles.aboutPage_storySub}>The Chaos of Unmanaged Waiting Rooms</p>
              <p className={styles.aboutPage_storyCopy}>
                For decades, independent clinics have faced a persistent operational challenge:
                crowded cabins, endless patient wait-times, manual paper token errors, and fragmented
                front-desk reception logs. This friction degrades the patient care experience and
                creates administrative overhead for the practicing doctor.
              </p>
            </div>
            <div className={styles.aboutPage_storyDivider} />
            <div className={styles.aboutPage_storyColumn}>
              <h2 className={styles.aboutPage_storyTitle}>The Solution</h2>
              <p className={styles.aboutPage_storySub}>GridVital Infrastructure</p>
              <p className={styles.aboutPage_storyCopy}>
                GridVital introduces a lightning-fast, zero-friction digital ecosystem. For doctors, a
                centralized, app-like metrics dashboard displaying live active tokens, daily patient
                velocity totals, and immediate macro-financial revenue audits. For patients, a
                seamless, browser-native onboarding portal—scan a QR code and enter the live queue
                without waiting in physical lines.
              </p>
            </div>
          </section>

          <section className={styles.aboutPage_pillarsSection}>
            <h2 className={styles.aboutPage_pillarsHeading}>
              Our Core Architectural Pillars
              <span className={styles.aboutPage_pillarsHindi}>(हमारे मुख्य सिद्धांत)</span>
            </h2>
            <div className={styles.aboutPage_pillarsGrid}>
              <div className={styles.aboutPage_pillarCard}>
                <div className={styles.aboutPage_pillarIconWrap}>
                  <span className={styles.aboutPage_pillarEmoji}>&#x1F464;</span>
                </div>
                <h3 className={styles.aboutPage_pillarTitle}>Sovereign Data Ownership</h3>
                <p className={styles.aboutPage_pillarCopy}>
                  We strictly believe that a practitioner&apos;s patient history and medical logs are
                  non-negotiable assets. GridVital operates entirely as a secure data routing
                  pipeline. Every data element mapped inside our clusters remains the exclusive
                  property of the operating clinic. We maintain a zero-commercialization
                  guarantee—your healthcare statistics are never leased, bartered, or shared with
                  third-party pharmaceutical entities.
                </p>
              </div>
              <div className={styles.aboutPage_pillarCard}>
                <div className={styles.aboutPage_pillarIconWrap}>
                  <span className={styles.aboutPage_pillarEmoji}>&#x1F4F1;</span>
                </div>
                <h3 className={styles.aboutPage_pillarTitle}>Zero-Hardware Architecture</h3>
                <p className={styles.aboutPage_pillarCopy}>
                  GridVital requires no expensive terminal hardware, thermal printer integrations, or
                  complex app-store installations. The entire architecture runs cleanly inside
                  optimized, web-responsive frameworks, transforming any standard mobile screen,
                  tablet, or desktop viewport into a real-time clinical control deck.
                </p>
              </div>
              <div className={styles.aboutPage_pillarCard}>
                <div className={styles.aboutPage_pillarIconWrap}>
                  <span className={styles.aboutPage_pillarEmoji}>&#x1F6E1;&#xFE0F;</span>
                </div>
                <h3 className={styles.aboutPage_pillarTitle}>Compliance-First Systems</h3>
                <p className={styles.aboutPage_pillarCopy}>
                  From our automated free trial validation engines to our secure, offline-to-online
                  manual renewal approvals and hard cascading database purge operations, our entire
                  business pipeline is designed to keep clinic workflows safe, transparent, and fully
                  legally compliant.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.aboutPage_footer}>
          <p className={styles.aboutPage_footerText}>
            GridVital is committed to building honest, reliable, and lightning-fast software tools
            for healthcare practitioners worldwide.
          </p>
          <p className={styles.aboutPage_footerCopyright}>
            &copy; 2026 GridVital
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
