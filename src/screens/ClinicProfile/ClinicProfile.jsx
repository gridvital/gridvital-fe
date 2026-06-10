import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Building2,
  QrCode,
  Mail,
  Phone,
  VenetianMask,
  Stethoscope,
  Hash,
  MapPin,
  Calendar,
  BadgeCheck,
  AlertCircle,
} from 'lucide-react';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import { fetchClinicProfile } from '../../services/apis/dashboard.service';
import LoadingDots from '../../components/LoadingDots/LoadingDots';
import styles from './ClinicProfile.module.css';

const ClinicProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchClinicProfile();
        if (res?.success) setProfile(res.data);
      } catch {
        // handle silently
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const infoRows = profile
    ? [
        { icon: User, label: 'Doctor Name', value: profile.doctorName },
        { icon: Building2, label: 'Clinic Name', value: profile.clinicName },
        { icon: QrCode, label: 'Clinic ID', value: profile.clinicDisplayId },
        {
          icon: Mail,
          label: 'Email',
          value: profile.email,
          badge: profile.isEmailVerified,
          badgeType: 'success',
        },
        { icon: Phone, label: 'Phone', value: profile.phone },
        { icon: VenetianMask, label: 'Gender', value: profile.gender || '-' },
        { icon: Stethoscope, label: 'Specialization', value: profile.specialization || '-' },
        { icon: Hash, label: 'Registration No.', value: profile.registrationNumber || '-' },
        {
          icon: MapPin,
          label: 'Address',
          value: [profile.address, profile.city, profile.state].filter(Boolean).join(', ') || '-',
        },
        { icon: Calendar, label: 'Member Since', value: formatDate(profile.createdAt) },
      ]
    : [];

  return (
    <LayoutContainer>
      <div className={styles.ClinicProfile_container}>
        <div className={styles.ClinicProfile_header}>
          {/* <button className={styles.ClinicProfile_backBtn} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button> */}
          <h1 className={styles.ClinicProfile_title}>My Profile</h1>
        </div>

        {loading ? (
          <div className={styles.ClinicProfile_center}>
            <LoadingDots />
          </div>
        ) : profile ? (
          <div className={styles.ClinicProfile_content}>
            <div className={styles.ClinicProfile_avatarSection}>
              <div className={styles.ClinicProfile_avatar}>
                {profile.doctorName?.charAt(0) || 'D'}
              </div>
              <h2 className={styles.ClinicProfile_doctorName}>{profile.doctorName}</h2>
              <p className={styles.ClinicProfile_clinicName}>{profile.clinicName}</p>
              <span className={styles.ClinicProfile_clinicIdBadge}>
                <QrCode size={12} />
                {profile.clinicDisplayId}
              </span>
            </div>

            <div className={styles.ClinicProfile_card}>
              {infoRows.map((row) => (
                <div key={row.label} className={styles.ClinicProfile_row}>
                  <div className={styles.ClinicProfile_rowLeft}>
                    <row.icon size={15} className={styles.ClinicProfile_rowIcon} />
                    <span className={styles.ClinicProfile_rowLabel}>{row.label}</span>
                  </div>
                  <div className={styles.ClinicProfile_rowRight}>
                    <span className={styles.ClinicProfile_rowValue}>{row.value}</span>
                    {row.badge && (
                      <span
                        className={`${styles.ClinicProfile_badge} ${
                          row.badgeType === 'success'
                            ? styles.ClinicProfile_badgeSuccess
                            : styles.ClinicProfile_badgeWarning
                        }`}
                      >
                        <BadgeCheck size={12} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.ClinicProfile_center}>
            <AlertCircle size={32} className={styles.ClinicProfile_errorIcon} />
            <p className={styles.ClinicProfile_errorText}>Failed to load profile</p>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
};

export default ClinicProfile;
