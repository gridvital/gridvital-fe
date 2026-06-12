import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './UserLogin.module.css';
import { forgotPassword, resetPassword, userLogin } from '../../services/apis/login.service';
import loginDesk from "../../assets/images/login/gridvitalLoginDesk.png"
import { setAuthFromLogin, logout } from '../../store/auth/auth.slice';
import { useDispatch } from 'react-redux';
import gridVitalLogo from "../../assets/images/logos/GridVitalLogo.png"
import { APP_VERSION } from '../../config/appVersion';


const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const params = new URLSearchParams(window.location.search)
  const loginType = params.get('loginType')
  const isDemoUser = loginType === 'demoUser'

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef([])

  const [newPassword, setNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [backendMessage, setBackendMessage] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      toast.error('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ password: 'Password must be at least 6 characters' });
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await userLogin({ email, password });

      if (response?.success === true) {
        toast.success('Login successful!');
        dispatch(
          setAuthFromLogin({
            authToken: response.token,
            userId: response.clinic?.id,
          })
        );

        const persisted = {
          isAuthenticated: JSON.stringify(true),
          authToken: JSON.stringify(response.token),
          userId: JSON.stringify(response.clinic?.id || ""),
          customerId: JSON.stringify(""),
        };
        localStorage.setItem("persist:auth", JSON.stringify(persisted));

        if (response.clinic?.profileDone === false) {
          window.location.href = "/complete-profile";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        toast.error(response?.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error(error?.response?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true)
    setBackendMessage('')
    try {
      const res = await forgotPassword({ email })
      if (res?.success === true) {
        setBackendMessage(res.message)
        setStep('reset')
      } else {
        setBackendMessage(res.message)
      }
    } catch (err) {
      setBackendMessage('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    setBackendMessage('')
    try {
      const res = await resetPassword({
        email,
        otp: otp.join(''),
        password: newPassword
      })

      if (res?.success === true) {
        toast.success(res.message)
        setPassword('')
        setOtp(['', '', '', ''])
        setNewPassword('')
        setConfirmPassword('')
        setStep('login')
      } else {
        setBackendMessage(res.message)
      }
    } catch (err) {
      setBackendMessage('Reset failed')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    setStep('login');
    setPassword('');
    setErrors({});
    setOtp(['', '', '', '']);
    setBackendMessage("")
  };

  return (
    <div className={styles.userLoginContainer}>
      <div className={styles.userLoginWrapper}>
        <div className={styles.userLoginCard}>
          <div className={styles.userLoginLeftSection}>
            <img
              src={loginDesk}
              alt="Login"
              className={styles.userLoginLeftImage}
            />
          </div>

          <div className={styles.userLoginRightSection}>
            {step === 'login' && (
              <>
                <div className={styles.mobileHeaderLogo}>
                  <img
                    src={gridVitalLogo}
                    alt="Wealth Logo"
                    className={styles.mobileLogo}
                  />
                </div>
                <p className={styles.trustText} style={{ cursor: 'pointer' }} onClick={() => navigate('/ops/login')}>
                  Manage Bookings & Live Patient Flow
                  <span style={{ fontSize: '10px', marginLeft: '6px', color: '#94a3b8', fontWeight: 400 }}>
                    v{APP_VERSION}
                  </span>
                </p>

                {isDemoUser && (
                  <div className={styles.demoMiniBox}>
                    <span className={styles.demoMiniBadge}>DEMO</span>
                    <span className={styles.demoMiniText}>
                      Use email for demo or create an account using your Email.
                    </span>
                    <span className={styles.demoMiniCred}>
                      <b>Email:</b> meadarshpandey@gmail.com
                    </span>
                    <span className={styles.demoMiniCred}>
                      <b>Pass:</b> Demo@123
                    </span>
                  </div>
                )}
              </>
            )}

            <div className={styles.userLoginFormHeader}>
              <h2 className={styles.userLoginFormTitle}>
                {step === 'login' && 'Login'}
                {step === 'forgot' && 'Forgot Password'}
                {step === 'reset' && 'Reset Password'}
              </h2>
              <p className={styles.userLoginFormDescription}>
                {step === 'login' && 'Login to app and view your assets.'}
                {step === 'forgot' && 'Enter your email to receive OTP.'}
                {step === 'reset' && 'Enter OTP and set a new password.'}
              </p>
            </div>

            {/* Login Step */}
            {step === 'login' && (
              <div className={styles.userLoginForm}>
                <div className={styles.userLoginFormGroup}>
                  <label className={styles.userLoginLabel}>Email*</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.userLoginInput} ${errors.email ? styles.userLoginInputError : ''}`}
                    placeholder="Enter your email address"
                    disabled={loading}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                  />
                  {errors.email && <span className={styles.userLoginErrorText}>{errors.email}</span>}
                </div>
                <div className={styles.userLoginFormGroup}>
                  <label className={styles.userLoginLabel}>Password*</label>
                  <div className={styles.userLoginPasswordWrapper}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${styles.userLoginInput} ${errors.password ? styles.userLoginInputError : ''}`}
                      placeholder="Enter password"
                      disabled={loading}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                    />
                    <button
                      type="button"
                      className={styles.userLoginPasswordToggle}
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className={styles.userLoginErrorText}>{errors.password}</span>}
                  <div className={styles.userLoginForgotPassword}>
                    <span
                      className={styles.userLoginForgotText}
                      onClick={() => {
                        setBackendMessage('')
                        setStep('forgot')
                      }}
                    >
                      Forgot password?
                    </span>
                    <span onClick={() => {
                      setBackendMessage('')
                      setStep('forgot')
                    }} className={styles.userLoginResetLink}>Reset</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className={styles.userLoginButton}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Login'}
                </button>
                <div className={styles.userLoginRegisterLink}>
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("persist:auth");
                      navigate("/register");
                    }}
                    className={styles.userLoginRegisterLinkText}
                    style={{ cursor: "pointer" }}
                  >
                    register with us
                  </span>
                </div>
                <div className={styles.userLoginPagesLinks}>
                  <Link to="/terms" className={styles.userLoginPagesLink}>Terms</Link>
                  <span className={styles.userLoginPagesSep}>|</span>
                  <Link to="/privacy-policy" className={styles.userLoginPagesLink}>Privacy</Link>
                  <span className={styles.userLoginPagesSep}>|</span>
                  <Link to="/refund-policy" className={styles.userLoginPagesLink}>Refund</Link>
                  <span className={styles.userLoginPagesSep}>|</span>
                  <Link to="/about" className={styles.userLoginPagesLink}>About</Link>
                  <span className={styles.userLoginPagesSep}>|</span>
                  <Link to="/contact" className={styles.userLoginPagesLink}>Contact</Link>
                </div>
              </div>
            )}

            {/* Forget Step */}
            {step === 'forgot' && (
              <div className={styles.userLoginForm}>
                {backendMessage && (
                  <div className={styles.infoMessage}>
                    {backendMessage}
                  </div>
                )}

                <div className={styles.userLoginFormGroup}>
                  <label className={styles.userLoginLabel}>Email*</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.userLoginInput}
                    disabled={loading}
                  />
                </div>

                <div className={styles.userLoginButtonRow}>
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className={styles.userLoginBackButton}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    className={styles.userLoginButton}
                    disabled={loading}
                    onClick={handleSendOtp}
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </div>
            )}

            {/* Reset Step */}
            {step === 'reset' && (
              <div className={styles.userLoginForm}>
                {backendMessage && (
                  <div className={styles.infoMessage}>
                    {backendMessage}
                  </div>
                )}

                <div className={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className={styles.otpBox}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '')
                        if (!value) return

                        const updated = [...otp]
                        updated[index] = value
                        setOtp(updated)

                        if (index < otp.length - 1) {
                          otpRefs.current[index + 1]?.focus()
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          const updated = [...otp]
                          if (updated[index]) {
                            updated[index] = ''
                            setOtp(updated)
                          } else if (index > 0) {
                            otpRefs.current[index - 1]?.focus()
                          }
                        }
                      }}
                    />
                  ))}
                </div>

                <div className={styles.userLoginFormGroup}>
                  <label className={styles.userLoginLabel}>New Password*</label>
                  <div className={styles.userLoginPasswordWrapper}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={styles.userLoginInput}
                    />
                    <button
                      type="button"
                      className={styles.userLoginPasswordToggle}
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      tabIndex={-1}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.userLoginFormGroup}>
                  <label className={styles.userLoginLabel}>Confirm Password*</label>
                  <div className={styles.userLoginPasswordWrapper}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={styles.userLoginInput}
                    />
                    <button
                      type="button"
                      className={styles.userLoginPasswordToggle}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.userLoginButtonRow}>
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className={styles.userLoginBackButton}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    className={styles.userLoginButton}
                    disabled={loading}
                    onClick={handleResetPassword}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
