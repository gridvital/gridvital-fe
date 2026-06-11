import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { opsRegisterRM } from "../../../services/apis/ops.service";
import OPSPageHeader from "../components/OPSPageHeader/OPSPageHeader";
import styles from "./OPSRegisterRM.module.css";

const OPSRegisterRM = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email format";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await opsRegisterRM({
        email: email.trim(),
        password,
        name: name.trim(),
      });
      if (res?.success) {
        setResult(res.data);
        toast.success("RM account created successfully");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res?.message || "Failed to create RM account");
      }
    } catch {
      toast.error("Failed to create RM account");
    } finally {
      setLoading(false);
    }
  };

  const copyCredentials = () => {
    if (!result) return;
    const text = `Email: ${result.email}\nPassword: ${password}`;
    navigator.clipboard.writeText(text);
    toast.success("Credentials copied");
  };

  return (
    <div className={styles.OPSRegisterRM_container}>
      <OPSPageHeader title="Register RM" onBack={() => navigate("/ops/clinics")} />

      <div className={styles.OPSRegisterRM_scroll}>
        {result ? (
          <div className={styles.OPSRegisterRM_success}>
            <div className={styles.OPSRegisterRM_checkIcon}>
              <Check size={28} />
            </div>
            <h2 className={styles.OPSRegisterRM_successTitle}>
              Account Created
            </h2>
            <div className={styles.OPSRegisterRM_resultCard}>
              <div className={styles.OPSRegisterRM_resultRow}>
                <span className={styles.OPSRegisterRM_resultLabel}>Name</span>
                <span className={styles.OPSRegisterRM_resultValue}>
                  {result.name}
                </span>
              </div>
              <div className={styles.OPSRegisterRM_resultRow}>
                <span className={styles.OPSRegisterRM_resultLabel}>Email</span>
                <span className={styles.OPSRegisterRM_resultValue}>
                  {result.email}
                </span>
              </div>
              <div className={styles.OPSRegisterRM_resultRow}>
                <span className={styles.OPSRegisterRM_resultLabel}>Role</span>
                <span className={styles.OPSRegisterRM_resultValue}>
                  {result.role}
                </span>
              </div>
            </div>
            <button
              className={styles.OPSRegisterRM_copyBtn}
              onClick={copyCredentials}
            >
              <Copy size={16} />
              Copy Credentials
            </button>
            <button
              className={styles.OPSRegisterRM_backBtn}
              onClick={() => navigate("/ops/clinics")}
            >
              Back to Clinics
            </button>
          </div>
        ) : (
          <form className={styles.OPSRegisterRM_form} onSubmit={handleSubmit}>
            <div className={styles.OPSRegisterRM_field}>
              <label className={styles.OPSRegisterRM_label}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.OPSRegisterRM_input} ${errors.name ? styles.OPSRegisterRM_inputError : ""}`}
                placeholder="Enter RM name"
                disabled={loading}
              />
              {errors.name && (
                <span className={styles.OPSRegisterRM_errorText}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.OPSRegisterRM_field}>
              <label className={styles.OPSRegisterRM_label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.OPSRegisterRM_input} ${errors.email ? styles.OPSRegisterRM_inputError : ""}`}
                placeholder="newrm@gridvital.in"
                disabled={loading}
              />
              {errors.email && (
                <span className={styles.OPSRegisterRM_errorText}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.OPSRegisterRM_field}>
              <label className={styles.OPSRegisterRM_label}>Password</label>
              <div className={styles.OPSRegisterRM_passwordWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.OPSRegisterRM_input} ${errors.password ? styles.OPSRegisterRM_inputError : ""}`}
                  placeholder="Min 6 characters"
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.OPSRegisterRM_eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.OPSRegisterRM_errorText}>
                  {errors.password}
                </span>
              )}
            </div>

            <div className={styles.OPSRegisterRM_field}>
              <label className={styles.OPSRegisterRM_label}>
                Confirm Password
              </label>
              <div className={styles.OPSRegisterRM_passwordWrap}>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${styles.OPSRegisterRM_input} ${errors.confirmPassword ? styles.OPSRegisterRM_inputError : ""}`}
                  placeholder="Re-enter password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.OPSRegisterRM_eyeBtn}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className={styles.OPSRegisterRM_errorText}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.OPSRegisterRM_submitBtn}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OPSRegisterRM;
