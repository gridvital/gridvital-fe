import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userClinicProfileSetup } from "../../services/apis/login.service";
import ClinicConsentModal from "../UserLogin/ClinicConsentModal";
import { logout } from "../../store/auth/auth.slice";
import gridVitalLogo from "../../assets/images/logos/GridVitalLogo.png";
import styles from "./CompleteProfile.module.css";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:auth");
    navigate("/login");
  };

  const [profile, setProfile] = useState({
    clinicName: "",
    doctorName: "",
    specialization: "",
    gender: "",
    phone: "",
    registrationNumber: "",
    address: "",
    state: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isConsent, setIsConsent] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!profile.clinicName.trim())
      newErrors.clinicName = "Clinic name is required";
    if (!profile.doctorName.trim())
      newErrors.doctorName = "Doctor name is required";
    if (!profile.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!profile.gender) newErrors.gender = "Gender is required";
    if (!profile.phone.trim() || !/^[0-9]{10}$/.test(profile.phone))
      newErrors.phone = "Valid 10-digit phone is required";
    if (!profile.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required";
    if (!profile.address.trim()) newErrors.address = "Address is required";
    if (!profile.state.trim()) newErrors.state = "State is required";
    if (!profile.city.trim()) newErrors.city = "City is required";
    if (!isConsent)
      newErrors.consent = "You must accept the terms and consent agreement";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix all errors");
      return;
    }

    const payload = {
      ...profile,
      isConsent: 1,
    };

    setLoading(true);
    try {
      const response = await userClinicProfileSetup(payload);

      if (response?.success === true) {
        toast.success("Profile setup complete!");
        navigate("/dashboard");
      } else {
        toast.error(response?.message || "Profile setup failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile setup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.CompleteProfile_container}>
        <div className={styles.CompleteProfile_wrapper}>
          <div className={styles.CompleteProfile_card}>
            <div className={styles.CompleteProfile_header}>
              <div className={styles.CompleteProfile_logoRow}>
                <img
                  src={gridVitalLogo}
                  alt="GridVital"
                  className={styles.CompleteProfile_logo}
                />
                <button
                  type="button"
                  className={styles.CompleteProfile_logoutBtn}
                  onClick={handleLogout}
                >
                  Go to Login
                </button>
              </div>
              <h2 className={styles.CompleteProfile_title}>
                Complete Your Profile
              </h2>
              <p className={styles.CompleteProfile_description}>
                Fill in your clinic details to get started
              </p>
            </div>

            <form
              className={styles.CompleteProfile_form}
              onSubmit={handleSubmit}
            >
              <div className={styles.CompleteProfile_formGroup}>
                <label className={styles.CompleteProfile_label}>
                  Clinic Name*
                </label>
                <input
                  type="text"
                  value={profile.clinicName}
                  onChange={(e) =>
                    handleChange("clinicName", e.target.value)
                  }
                  className={`${styles.CompleteProfile_input} ${errors.clinicName ? styles.CompleteProfile_inputError : ""}`}
                  placeholder="Enter clinic name"
                  disabled={loading}
                />
                {errors.clinicName && (
                  <span className={styles.CompleteProfile_errorText}>
                    {errors.clinicName}
                  </span>
                )}
              </div>

              <div className={styles.CompleteProfile_formGroup}>
                <label className={styles.CompleteProfile_label}>
                  Doctor Name*
                </label>
                <input
                  type="text"
                  value={profile.doctorName}
                  onChange={(e) =>
                    handleChange("doctorName", e.target.value)
                  }
                  className={`${styles.CompleteProfile_input} ${errors.doctorName ? styles.CompleteProfile_inputError : ""}`}
                  placeholder="Enter doctor name"
                  disabled={loading}
                />
                {errors.doctorName && (
                  <span className={styles.CompleteProfile_errorText}>
                    {errors.doctorName}
                  </span>
                )}
              </div>

              <div className={styles.CompleteProfile_formGroup}>
                <label className={styles.CompleteProfile_label}>Specialization*</label>
                <input
                  type="text"
                  value={profile.specialization}
                  onChange={(e) =>
                    handleChange("specialization", e.target.value)
                  }
                  className={`${styles.CompleteProfile_input} ${errors.specialization ? styles.CompleteProfile_inputError : ""}`}
                  placeholder="e.g. Cardiologist, Dermatologist"
                  disabled={loading}
                />
                {errors.specialization && (
                  <span className={styles.CompleteProfile_errorText}>
                    {errors.specialization}
                  </span>
                )}
              </div>

              <div className={styles.CompleteProfile_formGroup}>
                <label className={styles.CompleteProfile_label}>Gender*</label>
                <select
                  value={profile.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={`${styles.CompleteProfile_input} ${styles.CompleteProfile_select} ${errors.gender ? styles.CompleteProfile_inputError : ""}`}
                  disabled={loading}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <span className={styles.CompleteProfile_errorText}>
                    {errors.gender}
                  </span>
                )}
              </div>

              <div className={styles.CompleteProfile_formGroup}>
                <label className={styles.CompleteProfile_label}>Phone*</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                    )
                  }
                  className={`${styles.CompleteProfile_input} ${errors.phone ? styles.CompleteProfile_inputError : ""}`}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  disabled={loading}
                />
                {errors.phone && (
                  <span className={styles.CompleteProfile_errorText}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className={styles.CompleteProfile_formGroup}>
                <label className={styles.CompleteProfile_label}>
                  Registration Number*
                </label>
                <input
                  type="text"
                  value={profile.registrationNumber}
                  onChange={(e) =>
                    handleChange("registrationNumber", e.target.value)
                  }
                  className={`${styles.CompleteProfile_input} ${errors.registrationNumber ? styles.CompleteProfile_inputError : ""}`}
                  placeholder="Enter registration number"
                  disabled={loading}
                />
                {errors.registrationNumber && (
                  <span className={styles.CompleteProfile_errorText}>
                    {errors.registrationNumber}
                  </span>
                )}
              </div>

              <div className={styles.CompleteProfile_formGroup}>
                <label className={styles.CompleteProfile_label}>
                  Address*
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={`${styles.CompleteProfile_input} ${errors.address ? styles.CompleteProfile_inputError : ""}`}
                  placeholder="Enter address"
                  disabled={loading}
                />
                {errors.address && (
                  <span className={styles.CompleteProfile_errorText}>
                    {errors.address}
                  </span>
                )}
              </div>

              <div className={styles.CompleteProfile_formRow}>
                <div className={styles.CompleteProfile_formGroup}>
                  <label className={styles.CompleteProfile_label}>
                    State*
                  </label>
                  <input
                    type="text"
                    value={profile.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className={`${styles.CompleteProfile_input} ${errors.state ? styles.CompleteProfile_inputError : ""}`}
                    placeholder="Enter state"
                    disabled={loading}
                  />
                  {errors.state && (
                    <span className={styles.CompleteProfile_errorText}>
                      {errors.state}
                    </span>
                  )}
                </div>
                <div className={styles.CompleteProfile_formGroup}>
                  <label className={styles.CompleteProfile_label}>City*</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`${styles.CompleteProfile_input} ${errors.city ? styles.CompleteProfile_inputError : ""}`}
                    placeholder="Enter city"
                    disabled={loading}
                  />
                  {errors.city && (
                    <span className={styles.CompleteProfile_errorText}>
                      {errors.city}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.CompleteProfile_consentRow}>
                <input
                  type="checkbox"
                  id="complete-profile-consent"
                  checked={isConsent}
                  onChange={() => setShowConsentModal(true)}
                  className={styles.CompleteProfile_consentCheckbox}
                />
                <label
                  htmlFor="complete-profile-consent"
                  className={styles.CompleteProfile_consentLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConsentModal(true);
                  }}
                >
                  I acknowledge that I am a registered practitioner and agree to
                  GridVital Terms of Service & Healthcare Compliance Guidelines
                </label>
              </div>
              {errors.consent && (
                <span className={styles.CompleteProfile_errorText}>
                  {errors.consent}
                </span>
              )}

              <button
                type="submit"
                className={styles.CompleteProfile_submitBtn}
                disabled={loading || !isConsent}
              >
                {loading ? "Submitting..." : "Complete Registration"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ClinicConsentModal
        show={showConsentModal}
        onAccept={() => {
          setIsConsent(true);
          setShowConsentModal(false);
        }}
        onDecline={() => {
          setIsConsent(false);
          setShowConsentModal(false);
        }}
      />
    </>
  );
};

export default CompleteProfile;
