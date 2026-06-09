import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { BadgeCheck, RefreshCw, Building2 } from "lucide-react";
import { patientCurrentTokenCheck } from "../../../services/apis/patient.service";
import styles from "./AppointmentSuccess.module.css";
import gridVitalLogo from "../../../assets/images/logos/GridVitalLogo.png";

const STATUS_CONFIG = {
  Waiting: {
    pillClass: styles.success_statusPill_waiting,
    dotClass: styles.success_statusDot_waiting,
    label: "Waiting",
  },
  "In Progress": {
    pillClass: styles.success_statusPill_inProgress,
    dotClass: styles.success_statusDot_inProgress,
    label: "In Progress",
  },
  Completed: {
    pillClass: styles.success_statusPill_completed,
    dotClass: styles.success_statusDot_completed,
    label: "Completed",
  },
};

const AppointmentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tokenId = searchParams.get("tokenId");
  const clinicDisplayId = searchParams.get("clinicDisplayId");

  const [stage, setStage] = useState("loading");
  const [tokenData, setTokenData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  const fetchTokenStatus = useCallback(
    async (isRefresh) => {
      if (!tokenId || !clinicDisplayId) {
        setStage("error");
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      }

      try {
        const res = await patientCurrentTokenCheck({
          tokenId,
          clinicDisplayId,
        });
        if (res?.success && res?.data) {
          setTokenData(res.data);
          setStage("success");
        } else {
          setStage("error");
        }
      } catch {
        setStage("error");
      } finally {
        setRefreshing(false);
      }
    },
    [tokenId, clinicDisplayId],
  );

  useEffect(() => {
    fetchTokenStatus(false);
  }, [fetchTokenStatus]);

  useEffect(() => {
    if (cooldown <= 0) {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
        cooldownRef.current = null;
      }
      return;
    }
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
        cooldownRef.current = null;
      }
    };
  }, [cooldown]);

  const handleRefresh = () => {
    if (cooldown > 0) return;
    setCooldown(60);
    fetchTokenStatus(true);
  };

  const statusConfig =
    STATUS_CONFIG[tokenData?.status] || STATUS_CONFIG.Waiting;

  if (stage === "loading") {
    return (
      <div className={styles.success_wrapper}>
        <div className={styles.success_container}>
          <div className={styles.success_loadingScreen}>
            <div className={styles.success_loader} />
            <p className={styles.success_loadingText}>
              Checking your token status...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "error") {
    return (
      <div className={styles.success_wrapper}>
        <div className={styles.success_container}>
          <div className={styles.success_errorScreen}>
            <div className={styles.success_errorIcon}>
              <BadgeCheck size={48} />
            </div>
            <h3 className={styles.success_errorTitle}>Token Not Found</h3>
            <p className={styles.success_errorMessage}>
              We couldn't find your token details. Please try refreshing or
              contact the clinic.
            </p>
            <button className={styles.success_errorBtn} onClick={handleRefresh}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.success_wrapper}>
      <div className={styles.success_container}>
        <img
          src={gridVitalLogo}
          alt="GridVital"
          className={styles.success_logo}
        />

        <div className={styles.success_badgeWrapper}>
          <div className={styles.success_badgeGlow} />
          <div className={styles.success_badgeIcon}>
            <BadgeCheck size={44} strokeWidth={1.5} />
          </div>
        </div>

        <div className={styles.success_tokenWidget}>
          <p className={styles.success_tokenLabel}>Your Token Number</p>
          <div className={styles.success_tokenNumber}>
            {tokenData.tokenNumber}
          </div>
          <div className={styles.success_tokenStatusRow}>
            <span
              className={`${styles.success_statusPill} ${statusConfig.pillClass}`}
            >
              <span
                className={`${styles.success_statusDot} ${statusConfig.dotClass}`}
              />
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className={styles.success_actions}>
          <button
            className={styles.success_refreshBtn}
            onClick={handleRefresh}
            disabled={refreshing || cooldown > 0}
          >
            <RefreshCw
              size={18}
              className={`${styles.success_refreshIcon} ${refreshing ? styles.success_refreshIcon_spinning : ""}`}
            />
            {cooldown > 0 ? `Wait ${cooldown}s` : refreshing ? "Checking..." : "Refresh Status"}
          </button>

          <p className={styles.success_refreshText}>
            Token updates automatically. Tap to refresh.
          </p>
        </div>

        <div className={styles.success_queueCard}>
          <div className={styles.success_queueHeader}>
            <h4 className={styles.success_queueTitle}>Queue Position</h4>
            <span className={styles.success_queuePosition}>
              #{tokenData.queuePosition}
            </span>
          </div>

          <p className={styles.success_queueSubtext}>
            {tokenData.queuePosition === 1
              ? "You're next in line!"
              : `${tokenData.queuePosition - 1} ${tokenData.queuePosition - 1 === 1 ? "patient" : "patients"} ahead of you`}
          </p>

          <div className={styles.success_aheadTokens}>
            {tokenData.aheadTokens?.length > 0 ? (
              <>
                <span className={styles.success_aheadLabel}>Ahead:</span>
                {tokenData.aheadTokens.map((t, i) => (
                  <span key={i} className={styles.success_aheadPill}>
                    #{t}
                  </span>
                ))}
              </>
            ) : (
              <span className={styles.success_emptyQueue}>
                No tokens ahead — you're first!
              </span>
            )}
          </div>

          <div className={styles.success_queueDivider} />

          <div className={styles.success_clinicRow}>
            <div className={styles.success_clinicIcon}>
              <Building2 size={18} />
            </div>
            <div className={styles.success_clinicInfo}>
              <p className={styles.success_clinicName}>
                {tokenData.clinicName}
              </p>
              <p className={styles.success_patientName}>
               Patient Name: {tokenData.patientName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
