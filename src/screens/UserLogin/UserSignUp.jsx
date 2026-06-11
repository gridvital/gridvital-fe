import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAuthFromLogin } from "../../store/auth/auth.slice";
import styles from "./UserSignUp.module.css";
import {
  userRegister,
  userEmailVerify,
  userClinicProfileSetup,
} from "../../services/apis/login.service";
import loginDesk from "../../assets/images/login/gridvitalLoginDesk.png";
import gridVitalLogo from "../../assets/images/logos/GridVitalLogo.png";
import ClinicConsentModal from "./ClinicConsentModal";

const UserSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerStep, setRegisterStep] = useState("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(0);

  const [isConsent, setIsConsent] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);

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

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address" });
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ password: "Password must be at least 6 characters" });
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await userRegister({ email, password });

      if (response?.success === true) {
        toast.success(response?.message || "OTP sent to email");
        setRegisterStep("otp");
        setResendTimer(60);
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      } else {
        toast.error(response?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.response?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    try {
      const response = await userRegister({ email, password });

      if (response?.success === true) {
        toast.success("OTP resent to email");
        setResendTimer(60);
      } else {
        toast.error(response?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error?.response?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await userEmailVerify({ email, otp: otpString });

      if (response?.success === true) {
        toast.success("Email verified successfully");
        dispatch(setAuthFromLogin({ authToken: response.token }));
        setRegisterStep("profile");
      } else {
        toast.error(response?.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error(error?.response?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleSetupProfile = async (e) => {
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
    // if (!profile.defaultConsultationFee || isNaN(profile.defaultConsultationFee) || Number(profile.defaultConsultationFee) <= 0) {
    //   newErrors.defaultConsultationFee = 'Valid consultation fee is required';
    // }

    if (!isConsent) {
      newErrors.consent = "You must accept the terms and consent agreement";
    }

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
        toast.success("Profile setup complete! Please login.");
        navigate("/login");
      } else {
        toast.error(response?.message || "Profile setup failed");
      }
    } catch (error) {
      toast.error(error?.response?.message || "Profile setup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.UserSignUpContainer}>
      <div className={styles.UserSignUpWrapper}>
        <div className={styles.UserSignUpCard}>
          <div className={styles.UserSignUpLeftSection}>
            <img
              src={loginDesk}
              alt="Sign Up"
              className={styles.UserSignUpLeftImage}
            />
          </div>

          <div className={styles.UserSignUpRightSection}>
            <div className={styles.UserSignUpMobileHeaderLogo}>
              <img
                src={gridVitalLogo}
                alt="gridVitalLogo"
                className={styles.UserSignUpMobileLogo}
              />
            </div>

            <div className={styles.UserSignUpFormHeader}>
              <h2 className={styles.UserSignUpFormTitle}>
                {registerStep === "credentials" && "Create Account"}
                {registerStep === "otp" && "Verify Email"}
                {registerStep === "profile" && "Complete Profile"}
              </h2>
              <p className={styles.UserSignUpFormDescription}>
                {registerStep === "credentials" &&
                  "Register your clinic to get started."}
                {registerStep === "otp" && "Enter the OTP sent to your email."}
                {registerStep === "profile" && "Fill in your clinic details."}
              </p>
            </div>

            <div className={styles.UserSignUpStepIndicator}>
              <span
                className={`${styles.UserSignUpStepDot} ${registerStep === "credentials" ? styles.UserSignUpStepDotActive : styles.UserSignUpStepDotDone}`}
              >
                1
              </span>
              <span className={styles.UserSignUpStepLine}></span>
              <span
                className={`${styles.UserSignUpStepDot} ${registerStep === "otp" ? styles.UserSignUpStepDotActive : registerStep === "profile" ? styles.UserSignUpStepDotDone : ""}`}
              >
                2
              </span>
              <span className={styles.UserSignUpStepLine}></span>
              <span
                className={`${styles.UserSignUpStepDot} ${registerStep === "profile" ? styles.UserSignUpStepDotActive : ""}`}
              >
                3
              </span>
            </div>

            {/* Step 1: Credentials */}
            {registerStep === "credentials" && (
              <form className={styles.UserSignUpForm} onSubmit={handleSendOtp}>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Email*</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.UserSignUpInput} ${errors.email ? styles.UserSignUpInputError : ""}`}
                    placeholder="Enter your email address"
                    disabled={loading}
                  />
                  {errors.email && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Password*</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${styles.UserSignUpInput} ${errors.password ? styles.UserSignUpInputError : ""}`}
                    placeholder="Create a password (min 6 characters)"
                    disabled={loading}
                  />
                  {errors.password && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.password}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className={styles.UserSignUpButton}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Verify Email"}
                </button>
                <div className={styles.UserSignUpLoginLink}>
                  Already have an account?{" "}
                  <Link to="/login" className={styles.UserSignUpLoginLinkText}>
                    Login
                  </Link>
                </div>
              </form>
            )}

            {/* Step 2: OTP */}
            {registerStep === "otp" && (
              <div className={styles.UserSignUpForm}>
                <div className={styles.UserSignUpOtpContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className={styles.UserSignUpOtpBox}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (!value) return;

                        const updated = [...otp];
                        updated[index] = value;
                        setOtp(updated);

                        if (index < otp.length - 1) {
                          otpRefs.current[index + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          const updated = [...otp];
                          if (updated[index]) {
                            updated[index] = "";
                            setOtp(updated);
                          } else if (index > 0) {
                            otpRefs.current[index - 1]?.focus();
                          }
                        }
                      }}
                      disabled={loading}
                    />
                  ))}
                </div>

                <div className={styles.UserSignUpResendSection}>
                  {resendTimer > 0 ? (
                    <span className={styles.UserSignUpResendText}>
                      Resend OTP in {resendTimer}s
                    </span>
                  ) : (
                    <span
                      className={styles.UserSignUpResendLink}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </span>
                  )}
                </div>

                <div className={styles.UserSignUpButtonRow}>
                  <button
                    type="button"
                    onClick={() => {
                      setRegisterStep("credentials");
                      setOtp(["", "", "", "", "", ""]);
                      setErrors({});
                    }}
                    className={styles.UserSignUpBackButton}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className={styles.UserSignUpButton}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Profile Setup */}
            {registerStep === "profile" && (
              <form
                className={styles.UserSignUpForm}
                onSubmit={handleSetupProfile}
              >
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Clinic Name*</label>
                  <input
                    type="text"
                    value={profile.clinicName}
                    onChange={(e) =>
                      handleProfileChange("clinicName", e.target.value)
                    }
                    className={`${styles.UserSignUpInput} ${errors.clinicName ? styles.UserSignUpInputError : ""}`}
                    placeholder="Enter clinic name"
                    disabled={loading}
                  />
                  {errors.clinicName && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.clinicName}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Doctor Name*</label>
                  <input
                    type="text"
                    value={profile.doctorName}
                    onChange={(e) =>
                      handleProfileChange("doctorName", e.target.value)
                    }
                    className={`${styles.UserSignUpInput} ${errors.doctorName ? styles.UserSignUpInputError : ""}`}
                    placeholder="Enter doctor name"
                    disabled={loading}
                  />
                  {errors.doctorName && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.doctorName}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Specialization*</label>
                  <input
                    type="text"
                    value={profile.specialization}
                    onChange={(e) =>
                      handleProfileChange("specialization", e.target.value)
                    }
                    className={`${styles.UserSignUpInput} ${errors.specialization ? styles.UserSignUpInputError : ""}`}
                    placeholder="e.g. Cardiologist, Dermatologist"
                    disabled={loading}
                  />
                  {errors.specialization && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.specialization}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Gender*</label>
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      handleProfileChange("gender", e.target.value)
                    }
                    className={`${styles.UserSignUpInput} ${styles.UserSignUpSelect} ${errors.gender ? styles.UserSignUpInputError : ""}`}
                    disabled={loading}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.gender}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Phone*</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      handleProfileChange(
                        "phone",
                        e.target.value.replace(/[^0-9]/g, "").slice(0, 10),
                      )
                    }
                    className={`${styles.UserSignUpInput} ${errors.phone ? styles.UserSignUpInputError : ""}`}
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                    disabled={loading}
                  />
                  {errors.phone && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.phone}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>
                    Registration Number*
                  </label>
                  <input
                    type="text"
                    value={profile.registrationNumber}
                    onChange={(e) =>
                      handleProfileChange("registrationNumber", e.target.value)
                    }
                    className={`${styles.UserSignUpInput} ${errors.registrationNumber ? styles.UserSignUpInputError : ""}`}
                    placeholder="Enter registration number"
                    disabled={loading}
                  />
                  {errors.registrationNumber && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.registrationNumber}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormGroup}>
                  <label className={styles.UserSignUpLabel}>Address*</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) =>
                      handleProfileChange("address", e.target.value)
                    }
                    className={`${styles.UserSignUpInput} ${errors.address ? styles.UserSignUpInputError : ""}`}
                    placeholder="Enter address"
                    disabled={loading}
                  />
                  {errors.address && (
                    <span className={styles.UserSignUpErrorText}>
                      {errors.address}
                    </span>
                  )}
                </div>
                <div className={styles.UserSignUpFormRow}>
                  <div className={styles.UserSignUpFormGroup}>
                    <label className={styles.UserSignUpLabel}>State*</label>
                    <input
                      type="text"
                      value={profile.state}
                      onChange={(e) =>
                        handleProfileChange("state", e.target.value)
                      }
                      className={`${styles.UserSignUpInput} ${errors.state ? styles.UserSignUpInputError : ""}`}
                      placeholder="Enter state"
                      disabled={loading}
                    />
                    {errors.state && (
                      <span className={styles.UserSignUpErrorText}>
                        {errors.state}
                      </span>
                    )}
                  </div>
                  <div className={styles.UserSignUpFormGroup}>
                    <label className={styles.UserSignUpLabel}>City*</label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) =>
                        handleProfileChange("city", e.target.value)
                      }
                      className={`${styles.UserSignUpInput} ${errors.city ? styles.UserSignUpInputError : ""}`}
                      placeholder="Enter city"
                      disabled={loading}
                    />
                    {errors.city && (
                      <span className={styles.UserSignUpErrorText}>
                        {errors.city}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.UserSignUpConsentRow}>
                  <input
                    type="checkbox"
                    id="clinic-consent"
                    checked={isConsent}
                    onChange={() => setShowConsentModal(true)}
                    className={styles.UserSignUpConsentCheckbox}
                  />
                  <label
                    htmlFor="clinic-consent"
                    className={styles.UserSignUpConsentLabel}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConsentModal(true);
                    }}
                  >
                    I acknowledge that I am a registered practitioner and agree
                    to GridVital Terms of Service & Healthcare Compliance
                    Guidelines
                  </label>
                </div>
                {errors.consent && (
                  <span className={styles.UserSignUpErrorText}>
                    {errors.consent}
                  </span>
                )}
                <div className={styles.UserSignUpButtonRow}>
                  <button
                    type="button"
                    onClick={() => {
                      setRegisterStep("otp");
                      setErrors({});
                    }}
                    className={styles.UserSignUpBackButton}
                    disabled={loading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={styles.UserSignUpButton}
                    disabled={loading || !isConsent}
                  >
                    {loading ? "Submitting..." : "Save"}
                  </button>
                </div>
              </form>
            )}
          </div>
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

export default UserSignUp;
