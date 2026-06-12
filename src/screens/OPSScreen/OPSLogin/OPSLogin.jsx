import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import gridVitalLogo from "../../../assets/images/logos/GridVitalLogo.png";
import toast from "react-hot-toast";
import { setAuthFromLogin } from "../../../store/auth/auth.slice";
import { opsLogin } from "../../../services/apis/ops.service";
import styles from "./OPSLogin.module.css";

const OPSLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    setLoading(true);
    const res = await opsLogin({ email: email.trim(), password });
    setLoading(false);

    if (res?.success) {
      dispatch(
        setAuthFromLogin({ authToken: res.token, roles: [res.userType] }),
      );
      localStorage.setItem("opsUserType", res.userType);
      navigate("/ops/clinics", { replace: true });
    } else {
      toast.error(res?.message || "Invalid credentials");
    }
  };

  return (
    <div className={styles.OPSLogin_container}>
      <div className={styles.OPSLogin_card}>
        <div className={styles.OPSLogin_logoSection}>
          <img
            src={gridVitalLogo}
            alt="GridVital"
            className={styles.OPSLogin_logo}
          />
          <p className={styles.OPSLogin_subtitle}>Operations Panel</p>
        </div>

        <form className={styles.OPSLogin_form} onSubmit={handleSubmit}>
          <div className={styles.OPSLogin_field}>
            <label className={styles.OPSLogin_label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.OPSLogin_input}
              placeholder="ops@gridvital.in"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className={styles.OPSLogin_field}>
            <label className={styles.OPSLogin_label}>Password</label>
            <div className={styles.OPSLogin_passwordWrap}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.OPSLogin_input}
                placeholder="Enter password"
                disabled={loading}
              />
              <button
                type="button"
                className={styles.OPSLogin_eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.OPSLogin_button}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OPSLogin;
