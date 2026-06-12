import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { opsRMsList, opsDeleteRM } from "../../../services/apis/ops.service";
import { selectAuth } from "../../../store/auth/auth.selectors";
import OPSPageHeader from "../components/OPSPageHeader/OPSPageHeader";
import OPSLoadingSpinner from "../components/OPSLoadingSpinner/OPSLoadingSpinner";
import styles from "./OPSRMsList.module.css";

const OPSRMsList = () => {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const isGridOps = auth.roles.includes("GRID_OPS");
  const [rms, setRms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRMs = async (pageNum, append = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);
    try {
      const res = await opsRMsList({ page: pageNum, pageSize: 10 });
      if (res?.success) {
        const data = res.data || [];
        setRms((prev) => (append ? [...prev, ...data] : data));
        setTotalPages(res.totalPages || 1);
        setPage(pageNum);
      } else {
        toast.error(res?.message || "Failed to load RM accounts");
      }
    } catch {
      toast.error("Failed to load RM accounts");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchRMs(1);
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await opsDeleteRM({ rmId: deleteTarget._id });
      if (res?.success) {
        toast.success("RM account permanently deleted");
        setDeleteTarget(null);
        setRms((prev) => prev.filter((rm) => rm._id !== deleteTarget._id));
      } else {
        toast.error(res?.message || "Failed to delete RM account");
      }
    } catch {
      toast.error("Failed to delete RM account");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.OPSRMsList_container}>
      <OPSPageHeader
        title="RM Accounts"
        onBack={() => navigate("/ops/clinics")}
      />

      <div className={styles.OPSRMsList_searchWrap}>
        <Search size={16} className={styles.OPSRMsList_searchIcon} />
        <input
          type="text"
          className={styles.OPSRMsList_searchInput}
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className={styles.OPSRMsList_clearBtn}
            onClick={() => setSearchTerm("")}
          >
            &times;
          </button>
        )}
      </div>

      {loading ? (
        <OPSLoadingSpinner />
      ) : rms.length === 0 ? (
        <div className={styles.OPSRMsList_empty}>
          <Search size={40} className={styles.OPSRMsList_emptyIcon} />
          <p className={styles.OPSRMsList_emptyText}>
            {searchTerm
              ? "No RM accounts match your search"
              : "No RM accounts found"}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.OPSRMsList_results}>
            <span className={styles.OPSRMsList_resultCount}>
              {rms.length} RM{rms.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className={styles.OPSRMsList_list}>
            {rms.map((rm) => (
              <div key={rm._id} className={styles.OPSRMsList_card}>
                <div className={styles.OPSRMsList_cardLeft}>
                  <div className={styles.OPSRMsList_avatar}>
                    {rm.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div className={styles.OPSRMsList_cardInfo}>
                    <span className={styles.OPSRMsList_cardName}>{rm.name}</span>
                    <span className={styles.OPSRMsList_cardEmail}>{rm.email}</span>
                    <span className={styles.OPSRMsList_cardDate}>
                      Created {formatDate(rm.createdAt)}
                    </span>
                  </div>
                </div>
                <div className={styles.OPSRMsList_cardRight}>
                  <span
                    className={`${styles.OPSRMsList_statusBadge} ${
                      rm.isActive
                        ? styles.OPSRMsList_statusActive
                        : styles.OPSRMsList_statusInactive
                    }`}
                  >
                    {rm.isActive ? "Active" : "Inactive"}
                  </span>
                  {isGridOps && (
                    <button
                      className={styles.OPSRMsList_deleteBtn}
                      onClick={() => setDeleteTarget(rm)}
                      title="Delete RM"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {page < totalPages && (
            <div className={styles.OPSRMsList_loadMoreWrap}>
              <button
                className={styles.OPSRMsList_loadMoreBtn}
                onClick={() => fetchRMs(page + 1, true)}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      {deleteTarget && (
        <>
          <div
            className={styles.OPSRMsList_overlay}
            onClick={() => !deleting && setDeleteTarget(null)}
          />
          <div className={styles.OPSRMsList_modal}>
            <button
              className={styles.OPSRMsList_modalClose}
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              <X size={18} />
            </button>
            <div className={styles.OPSRMsList_modalIconWrap}>
              <Trash2 size={28} />
            </div>
            <h2 className={styles.OPSRMsList_modalTitle}>Delete RM Account?</h2>
            <p className={styles.OPSRMsList_modalText}>
              This will permanently delete the RM account for{" "}
              <strong>{deleteTarget.name}</strong> ({deleteTarget.email}).
              This action cannot be undone.
            </p>
            <div className={styles.OPSRMsList_modalButtons}>
              <button
                className={styles.OPSRMsList_modalCancel}
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className={styles.OPSRMsList_modalDelete}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OPSRMsList;
