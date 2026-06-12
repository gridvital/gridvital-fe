import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../store/auth/auth.selectors";
import {
  Mail,
  Phone,
  MapPin,
  VenetianMask,
  Stethoscope,
  Hash,
  Calendar,
  BadgeCheck,
  BadgeX,
  CreditCard,
  CalendarDays,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  DollarSign,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";
import { opsClinicDetails } from "../../../services/apis/ops.service";
import OPSPageHeader from "../components/OPSPageHeader/OPSPageHeader";
import OPSInitialsAvatar from "../components/OPSInitialsAvatar/OPSInitialsAvatar";
import OPSSubscriptionBadge from "../components/OPSSubscriptionBadge/OPSSubscriptionBadge";
import OPSManageSubscriptionModal from "../components/OPSManageSubscriptionModal/OPSManageSubscriptionModal";
import OPSDeleteConfirmModal from "../components/OPSDeleteConfirmModal/OPSDeleteConfirmModal";
import OPSLoadingSpinner from "../components/OPSLoadingSpinner/OPSLoadingSpinner";
import styles from "./OPSClinicDetail.module.css";

const OPSClinicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState(null);
  const [otpLog, setOtpLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpOpen, setOtpOpen] = useState(false);
  const [showManageSub, setShowManageSub] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const auth = useSelector(selectAuth);
  const isGridOps = auth.roles.includes("GRID_OPS");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const res = await opsClinicDetails({ clinicId: id });
        if (res?.success) {
          setClinic(res.data.clinic);
          setOtpLog(res.data.latestOtpLog);
        } else {
          toast.error(res?.message || "Failed to load clinic details");
        }
      } catch {
        toast.error("Failed to load clinic details");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, refreshKey]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysRemaining = () => {
    if (!clinic?.subscriptionExpiresAt) return null;
    const now = new Date();
    const expiry = new Date(clinic.subscriptionExpiresAt);
    const diff = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getSubscriptionProgress = () => {
    if (!clinic?.subscriptionStartAt || !clinic?.subscriptionExpiresAt) return 0;
    const start = new Date(clinic.subscriptionStartAt).getTime();
    const end = new Date(clinic.subscriptionExpiresAt).getTime();
    const now = Date.now();
    if (now >= end) return 100;
    if (now <= start) return 0;
    return Math.round(((now - start) / (end - start)) * 100);
  };

  if (loading) {
    return (
      <div className={styles.OPSClinicDetail_container}>
        <OPSPageHeader title="Clinic Details" onBack={() => navigate("/ops/clinics")} />
        <OPSLoadingSpinner />
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className={styles.OPSClinicDetail_container}>
        <OPSPageHeader title="Clinic Details" onBack={() => navigate("/ops/clinics")} />
        <div className={styles.OPSClinicDetail_error}>
          <AlertTriangle size={32} />
          <p>Failed to load clinic details</p>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining();

  return (
    <div className={styles.OPSClinicDetail_container}>
      <OPSPageHeader title="Clinic Details" onBack={() => navigate("/ops/clinics")} />

      <div className={styles.OPSClinicDetail_scroll}>
        {/* Profile Card */}
        <div className={styles.OPSClinicDetail_section}>
          <div className={styles.OPSClinicDetail_profileHeader}>
            <OPSInitialsAvatar name={clinic.doctorName} size={64} />
            <div className={styles.OPSClinicDetail_profileInfo}>
              <h2 className={styles.OPSClinicDetail_doctorName}>
                {clinic.doctorName}
              </h2>
              <p className={styles.OPSClinicDetail_clinicName}>
                {clinic.clinicName}
              </p>
              <span className={styles.OPSClinicDetail_idBadge}>
                {clinic.clinicDisplayId}
              </span>
            </div>
            <div className={styles.OPSClinicDetail_statusWrap}>
              {clinic.isActive ? (
                <span className={styles.OPSClinicDetail_activeBadge}>Active</span>
              ) : (
                <span className={styles.OPSClinicDetail_inactiveBadge}>Inactive</span>
              )}
            </div>
          </div>

          <div className={styles.OPSClinicDetail_infoGrid}>
            <div className={styles.OPSClinicDetail_infoItem}>
              <Mail size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Email</span>
                <span className={styles.OPSClinicDetail_infoValue}>
                  {clinic.email}
                  {clinic.isEmailVerified ? (
                    <BadgeCheck size={14} className={styles.OPSClinicDetail_verifiedIcon} />
                  ) : (
                    <BadgeX size={14} className={styles.OPSClinicDetail_unverifiedIcon} />
                  )}
                </span>
              </div>
            </div>
            <div className={styles.OPSClinicDetail_infoItem}>
              <Phone size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Phone</span>
                <span className={styles.OPSClinicDetail_infoValue}>{clinic.phone}</span>
              </div>
            </div>
            <div className={styles.OPSClinicDetail_infoItem}>
              <MapPin size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Location</span>
                <span className={styles.OPSClinicDetail_infoValue}>
                  {[clinic.city, clinic.state].filter(Boolean).join(", ") || "-"}
                </span>
              </div>
            </div>
            <div className={styles.OPSClinicDetail_infoItem}>
              <Hash size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Registration No.</span>
                <span className={styles.OPSClinicDetail_infoValue}>
                  {clinic.registrationNumber || "-"}
                </span>
              </div>
            </div>
            <div className={styles.OPSClinicDetail_infoItem}>
              <Stethoscope size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Specialization</span>
                <span className={styles.OPSClinicDetail_infoValue}>
                  {clinic.specialization || "-"}
                </span>
              </div>
            </div>
            <div className={styles.OPSClinicDetail_infoItem}>
              <VenetianMask size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Gender</span>
                <span className={styles.OPSClinicDetail_infoValue}>
                  {clinic.gender || "-"}
                </span>
              </div>
            </div>
            <div className={styles.OPSClinicDetail_infoItemFull}>
              <MapPin size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Address</span>
                <span className={styles.OPSClinicDetail_infoValue}>
                  {clinic.address || "-"}
                </span>
              </div>
            </div>
            {clinic.defaultConsultationFee > 0 && (
              <div className={styles.OPSClinicDetail_infoItem}>
                <DollarSign size={14} className={styles.OPSClinicDetail_infoIcon} />
                <div>
                  <span className={styles.OPSClinicDetail_infoLabel}>Consultation Fee</span>
                  <span className={styles.OPSClinicDetail_infoValue}>
                    ₹{clinic.defaultConsultationFee}
                  </span>
                </div>
              </div>
            )}
            <div className={styles.OPSClinicDetail_infoItem}>
              <Calendar size={14} className={styles.OPSClinicDetail_infoIcon} />
              <div>
                <span className={styles.OPSClinicDetail_infoLabel}>Member Since</span>
                <span className={styles.OPSClinicDetail_infoValue}>
                  {formatDate(clinic.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className={styles.OPSClinicDetail_section}>
          <div className={styles.OPSClinicDetail_sectionHeader}>
            <CreditCard size={16} />
            <span>Subscription</span>
          </div>
          <div className={styles.OPSClinicDetail_subContent}>
            <div className={styles.OPSClinicDetail_subTop}>
              <OPSSubscriptionBadge type={clinic.subscriptionType} size="lg" />
              <button
                className={styles.OPSClinicDetail_manageBtn}
                onClick={() => setShowManageSub(true)}
              >
                Manage
              </button>
            </div>

            <div className={styles.OPSClinicDetail_progressWrap}>
              <div className={styles.OPSClinicDetail_progressBar}>
                <div
                  className={`${styles.OPSClinicDetail_progressFill} ${
                    clinic.subscriptionType === "EXPIRED"
                      ? styles.OPSClinicDetail_progressExpired
                      : daysRemaining !== null && daysRemaining <= 3
                      ? styles.OPSClinicDetail_progressWarning
                      : ""
                  }`}
                  style={{
                    width: `${Math.min(getSubscriptionProgress(), 100)}%`,
                  }}
                />
              </div>
              <span className={styles.OPSClinicDetail_progressLabel}>
                {getSubscriptionProgress()}% elapsed
              </span>
            </div>

            <div className={styles.OPSClinicDetail_subGrid}>
              <div className={styles.OPSClinicDetail_subItem}>
                <CalendarDays size={14} className={styles.OPSClinicDetail_subIcon} />
                <div>
                  <span className={styles.OPSClinicDetail_subLabel}>Start Date</span>
                  <span className={styles.OPSClinicDetail_subValue}>
                    {formatDate(clinic.subscriptionStartAt)}
                  </span>
                </div>
              </div>
              <div className={styles.OPSClinicDetail_subItem}>
                <Clock size={14} className={styles.OPSClinicDetail_subIcon} />
                <div>
                  <span className={styles.OPSClinicDetail_subLabel}>Expires</span>
                  <span className={styles.OPSClinicDetail_subValue}>
                    {formatDate(clinic.subscriptionExpiresAt)}
                  </span>
                </div>
              </div>
              <div className={styles.OPSClinicDetail_subItem}>
                <Activity size={14} className={styles.OPSClinicDetail_subIcon} />
                <div>
                  <span className={styles.OPSClinicDetail_subLabel}>Days Remaining</span>
                  <span
                    className={`${styles.OPSClinicDetail_subValue} ${
                      daysRemaining !== null && daysRemaining <= 3
                        ? styles.OPSClinicDetail_daysWarning
                        : ""
                    }`}
                  >
                    {daysRemaining !== null
                      ? `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""}`
                      : "-"}
                  </span>
                </div>
              </div>
              <div className={styles.OPSClinicDetail_subItem}>
                <DollarSign size={14} className={styles.OPSClinicDetail_subIcon} />
                <div>
                  <span className={styles.OPSClinicDetail_subLabel}>Amount Paid</span>
                  <span className={styles.OPSClinicDetail_subValue}>
                    ₹{clinic.subscriptionAmount?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OTP Debug Card */}
        {otpLog && (
          <div className={styles.OPSClinicDetail_section}>
            <button
              className={styles.OPSClinicDetail_otpHeader}
              onClick={() => setOtpOpen(!otpOpen)}
            >
              <div className={styles.OPSClinicDetail_sectionHeader}>
                <Copy size={16} />
                <span>Latest OTP Log</span>
              </div>
              {otpOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {otpOpen && (
              <div className={styles.OPSClinicDetail_otpContent}>
                <div className={styles.OPSClinicDetail_otpCode}>
                  {otpLog.otp}
                </div>
                <div className={styles.OPSClinicDetail_otpMeta}>
                  <span>Generated: {formatDate(otpLog.createdAt)} {formatTime(otpLog.createdAt)}</span>
                  <span>Expires: {formatDate(otpLog.otpExpiresAt)} {formatTime(otpLog.otpExpiresAt)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {isGridOps && (
          <div className={styles.OPSClinicDetail_section}>
            <div className={styles.OPSClinicDetail_dangerZone}>
              <AlertTriangle size={18} className={styles.OPSClinicDetail_dangerIcon} />
              <div>
                <p className={styles.OPSClinicDetail_dangerTitle}>Danger Zone</p>
                <p className={styles.OPSClinicDetail_dangerDesc}>
                  Permanently delete this clinic and all associated data
                </p>
              </div>
              <button
                className={styles.OPSClinicDetail_deleteBtn}
                onClick={() => setShowDelete(true)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {showManageSub && (
        <OPSManageSubscriptionModal
          clinic={clinic}
          onClose={() => setShowManageSub(false)}
          onSuccess={() => {
            setShowManageSub(false);
            toast.success("Subscription updated successfully");
            setRefreshKey((k) => k + 1);
          }}
        />
      )}

      {showDelete && (
        <OPSDeleteConfirmModal
          clinic={clinic}
          onClose={() => setShowDelete(false)}
          onSuccess={() => {
            toast.success("Clinic deleted successfully");
            navigate("/ops/clinics");
          }}
        />
      )}
    </div>
  );
};

export default OPSClinicDetail;
