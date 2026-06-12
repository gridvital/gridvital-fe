import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Activity,
  Users,
  QrCode,
  ShieldCheck,
  Clock,
  Download,
  Star,
  ChevronRight,
  Zap,
  CheckCircle,
} from 'lucide-react';
import usePWAInstall from '../../hooks/usePWAInstall';
import IOSInstallModal from '../../components/IOSInstallModal/IOSInstallModal';
import gridVitalLogo from '../../assets/images/logos/GridVitalLogo.png';
import loginDesk from '../../assets/images/login/gridvitalLoginDesk.png';
import styles from './HomePage.module.css';

const features = [
  {
    icon: Activity,
    title: 'Fast Doctor Dashboard Metrics Tracker',
    desc: 'Track live token counters, monitor daily footfalls, analyze dynamic monthly analytics totals, and view automatic aggregated financial consultation revenue data on a centralized mobile console grid.',
  },
  {
    icon: Users,
    title: 'Interactive Real-Time Queue Controller',
    desc: 'Streamline checkup flow with the global top navigation action controller bar. Seamlessly transition patient states from Waiting to In-Consultation to Completed with a simple thumb-tap execution.',
  },
  {
    icon: QrCode,
    title: 'Frictionless Patient Self-Onboarding Portal',
    desc: 'Patients check themselves in by scanning your clinic\'s personalized counter desk QR token. Captures names, contact, age, and chief complaints directly in their browser — no manual entry queues.',
  },
  {
    icon: ShieldCheck,
    title: 'Legal Consent & Medical Compliance Layer',
    desc: 'Fully aligned with modern digital medical data protection systems. Features an interactive scrolling liability confirmation checkpoint panel safeguarding doctor verification and credentials validation.',
  },
  {
    icon: Clock,
    title: 'Flexible Subscription & Free Trial Sandbox',
    desc: 'Experience the core operational engine risk-free through an active default free trial tracking tier. Real-time background date validation clocks keep your dashboard readable during plan status shifts.',
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { isInstallable, showIOSGuide, setShowIOSGuide, handleInstall } = usePWAInstall();

  return (
    <>
      <IOSInstallModal isOpen={showIOSGuide} onClose={() => setShowIOSGuide(false)} />

      <div className={styles.homepage_mobileAppWrapper}>
        {/* Fixed Header */}
        <header className={styles.homepage_mobileHeader}>
          <div className={styles.homepage_navbar}>
            <div className={styles.homepage_logo}>
              <img src={gridVitalLogo} alt="GridVital" className={styles.homepage_logoText} />
            </div>

            {/* <div className={styles.homepage_navActions}>
              <button
                className={styles.homepage_loginBtn}
                onClick={() => navigate('/login')}
              >
                <LogIn size={15} />
                Doctor Login
              </button>
              {isInstallable && (
                <button className={styles.homepage_installBtn} onClick={handleInstall}>
                  <Download size={15} />
                  Install App
                </button>
              )}
            </div> */}
          </div>
        </header>

        {/* Scrollable Body */}
        <main className={styles.homepage_scrollableBody}>
          {/* Hero Section */}
          <section className={styles.homepage_heroSection}>
            <div className={styles.homepage_heroContent}>
              <div className={styles.homepage_heroTag}>
                <Star size={12} />
                Trusted by clinics across India
              </div>
              <h1 className={styles.homepage_heroTitle}>
                Smart Token Management Platform for Modern Clinics
              </h1>
              <p className={styles.homepage_heroSubtitle}>
                Empower your practice, remove crowded waiting areas, and let your
                patients securely register themselves via high-fidelity QR
                automation shortcuts.
              </p>
              <div className={styles.homepage_heroActions}>
                {isInstallable && (
                  <button className={styles.homepage_heroCta} onClick={handleInstall}>
                    <Download size={18} />
                    Install GridVital App
                    <ArrowRight size={18} />
                  </button>
                )}
                <button
                  className={styles.homepage_heroSecondary}
                  onClick={() => navigate('/login')}
                >
                  Doctor Login
                  <ChevronRight size={16} />
                </button>
                <button
                  className={styles.homepage_heroSecondary}
                  onClick={() => navigate('/opslogin')}
                >
                  OPS Login
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className={styles.homepage_heroTrust}>
                <CheckCircle size={14} />
                <span>Free trial • No credit card • Cancel anytime</span>
              </div>
            </div>
            <div className={styles.homepage_heroVisual}>
              <img src={loginDesk} alt="GridVital Desk" className={styles.homepage_heroImage} />
            </div>
          </section>

          {/* Features Section */}
          <section className={styles.homepage_featuresSection}>
            <div className={styles.homepage_sectionHeader}>
              <h2 className={styles.homepage_sectionTitle}>
                Everything you need to run your clinic
              </h2>
              <p className={styles.homepage_sectionDesc}>
                Built for single-doctor practices. No complexity, just results.
              </p>
            </div>
            <div className={styles.homepage_featuresGrid}>
              {features.map((f, i) => (
                <div key={i} className={styles.homepage_featureCard}>
                  <div className={styles.homepage_featureIconWrapper}>
                    <f.icon size={22} />
                  </div>
                  <h3 className={styles.homepage_featureTitle}>{f.title}</h3>
                  <p className={styles.homepage_featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner Section */}
          <section className={styles.homepage_ctaSection}>
            <div className={styles.homepage_ctaContent}>
              <h2 className={styles.homepage_ctaTitle}>
                Ready to transform your clinic?
              </h2>
              <p className={styles.homepage_ctaDesc}>
                Join thousands of doctors using GridVital to streamline their
                practice and enhance patient experience.
              </p>
              {isInstallable && (
                <button className={styles.homepage_ctaBtn} onClick={handleInstall}>
                  <Download size={18} />
                  Install GridVital — It&apos;s Free
                  <ArrowRight size={18} />
                </button>
              )}
              <p className={styles.homepage_ctaNote}>
                No credit card required. Free trial included.
              </p>
            </div>
          </section>

          {/* Mobile Footer Links */}
          <div className={styles.homepage_mobileFooter}>
            <div className={styles.homepage_mobileFooterColumns}>
              <div className={styles.homepage_mobileFooterCol}>
                <button className={styles.homepage_mobileFooterLink} onClick={() => navigate('/terms')}>Terms of Service</button>
                <button className={styles.homepage_mobileFooterLink} onClick={() => navigate('/privacy-policy')}>Privacy Policy</button>
                <button className={styles.homepage_mobileFooterLink} onClick={() => navigate('/refund-policy')}>Refund Policy</button>
              </div>
              <div className={styles.homepage_mobileFooterCol}>
                <button className={styles.homepage_mobileFooterLink} onClick={() => navigate('/about')}>About Us</button>
                <button className={styles.homepage_mobileFooterLink} onClick={() => navigate('/contact')}>Contact Us</button>
                <button className={styles.homepage_mobileFooterLink} onClick={() => navigate('/ops/login')}>OPS Login</button>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Bar */}
        {/* <div className={styles.homepage_mobileBottomBar}>
          {isInstallable && (
            <button className={styles.homepage_bottomInstallBtn} onClick={handleInstall}>
              <Download size={16} />
              Install GridVital App
            </button>
          )}
          <p className={styles.homepage_bottomLegal}>
            &copy; 2026 GridVital Inc. All rights reserved.
          </p>
        </div> */}

        {/* Desktop Footer */}
        <footer className={styles.homepage_desktopFooter}>
          <div className={styles.homepage_footerContent}>
            <div className={styles.homepage_footerBrand}>
              <Zap size={18} className={styles.homepage_logoIcon} />
              <span className={styles.homepage_footerLogoText}>GridVital</span>
              <p className={styles.homepage_footerDesc}>
                Smart clinic management platform for modern practitioners.
              </p>
            </div>
            <div className={styles.homepage_footerColumns}>
              <div className={styles.homepage_footerColumn}>
                <h4 className={styles.homepage_footerColumnTitle}>Policy</h4>
                <button className={styles.homepage_footerLink} onClick={() => navigate('/terms')}>Terms of Service</button>
                <button className={styles.homepage_footerLink} onClick={() => navigate('/privacy-policy')}>Privacy Policy</button>
                <button className={styles.homepage_footerLink} onClick={() => navigate('/refund-policy')}>Refund Policy</button>
              </div>
              <div className={styles.homepage_footerColumn}>
                <h4 className={styles.homepage_footerColumnTitle}>Company</h4>
                <button className={styles.homepage_footerLink} onClick={() => navigate('/about')}>About Us</button>
                <button className={styles.homepage_footerLink} onClick={() => navigate('/contact')}>Contact Us</button>
                <button className={styles.homepage_footerLink} onClick={() => navigate('/ops/login')}>OPS Login</button>
              </div>
            </div>
          </div>
          <div className={styles.homepage_footerDivider} />
          <p className={styles.homepage_footerCopyright}>
            &copy; 2026 GridVital
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
