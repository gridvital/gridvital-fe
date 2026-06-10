import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle, SkipForward } from "lucide-react";
import gridVitalLogo from "../../../assets/images/logos/GridVitalLogo.png";
import { logout } from "../../../store/auth/auth.slice";
import { selectUserName } from "../../../store/auth/auth.selectors";
import { callSkipNextPatient } from "../../../services/apis/dashboard.service";
import { triggerRefresh } from "../../../store/dashboard/dashboard.slice";
import { useCustomToast } from "../../customToast/customToast";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const { showToast, ToastComponent } = useCustomToast();

  const getInitials = (name) => {
    if (!name) return "👤";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleCallNext = async () => {
    setLoading(true);
    try {
      await callSkipNextPatient({ currentPatientStatus: "Completed" });
      dispatch(triggerRefresh());
      showToast("success", "Next patient called successfully");
    } catch (err) {
      showToast(
        "error",
        err?.response?.data?.message || "Failed to call next patient",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      await callSkipNextPatient({ currentPatientStatus: "Cancelled" });
      dispatch(triggerRefresh());
      showToast("success", "Patient skipped successfully");
    } catch (err) {
      showToast(
        "error",
        err?.response?.data?.message || "Failed to skip patient",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.Navbar_header}>
      <div className={styles.Navbar_inner}>
        <div className={styles.Navbar_left}>
          <img
            src={gridVitalLogo}
            alt="GridVital"
            className={styles.Navbar_logo}
          />
        </div>
        <div className={styles.Navbar_right} ref={dropdownRef}>
          <div className={styles.Navbar_actions}>
            <button
              className={styles.Navbar_skipBtn}
              onClick={handleSkip}
              disabled={loading}
            >
              <SkipForward size={15} />
              Skip
            </button>
            <button
              className={styles.Navbar_nextBtn}
              onClick={handleCallNext}
              disabled={loading}
            >
              <ArrowRightCircle size={18} />
              Next
            </button>
          </div>
          {/* <div
            className={styles.Navbar_profileAvatar}
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            {getInitials(userName)}
          </div>
          {isProfileOpen && (
            <div className={styles.Navbar_profileDropdown}>
              <div
                className={styles.Navbar_profileItem}
                onClick={() => navigate("/profile")}
              >
                View Profile
              </div>
              <div className={styles.Navbar_profileItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )} */}
        </div>
      </div>
      {ToastComponent}
    </header>
  );
};

export default Navbar;
