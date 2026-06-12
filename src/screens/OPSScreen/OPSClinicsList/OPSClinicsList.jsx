import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, UserPlus, Users } from "lucide-react";
import toast from "react-hot-toast";
import { opsClinicsList } from "../../../services/apis/ops.service";
import { logout } from "../../../store/auth/auth.slice";
import { selectAuth } from "../../../store/auth/auth.selectors";
import OPSPageHeader from "../components/OPSPageHeader/OPSPageHeader";
import OPSClinicCard from "../components/OPSClinicCard/OPSClinicCard";
import OPSDeleteConfirmModal from "../components/OPSDeleteConfirmModal/OPSDeleteConfirmModal";
import OPSLoadingSpinner from "../components/OPSLoadingSpinner/OPSLoadingSpinner";
import styles from "./OPSClinicsList.module.css";

const OPSClinicsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const isGridOps = auth.roles.includes("GRID_OPS");
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const debounceRef = useRef(null);
  const loaderRef = useRef(null);

  const fetchClinics = useCallback(async (pageNum, search, append = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);
    try {
      const res = await opsClinicsList({
        page: pageNum,
        pageSize: 10,
        searchTerm: search || "",
      });
      if (res?.success) {
        setClinics((prev) =>
          append ? [...prev, ...(res.data || [])] : res.data || []
        );
        setTotalPages(res.totalPages || 1);
        setPage(pageNum);
      } else {
        toast.error(res?.message || "Failed to load clinics");
      }
    } catch {
      toast.error("Failed to load clinics");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchClinics(1, searchTerm);
  }, [fetchClinics, searchTerm]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && page < totalPages) {
          fetchClinics(page + 1, searchTerm, true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [page, totalPages, loadingMore, fetchClinics, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchClinics(1, value);
    }, 300);
  };

  const handleDeleteSuccess = () => {
    setDeleteTarget(null);
    toast.success("Clinic deleted successfully");
    fetchClinics(1, searchTerm);
  };

  return (
    <div className={styles.OPSClinicsList_container}>
      <OPSPageHeader
        title="Clinics"
        showLogout
        onLogout={() => {
          dispatch(logout());
          localStorage.removeItem("persist:auth");
          localStorage.removeItem("opsUserType");
          window.location.href = "/ops/login";
        }}
        rightAction={
          <div className={styles.OPSClinicsList_headerActions}>
            <button
              className={styles.OPSClinicsList_rmBtn}
              onClick={() => navigate("/ops/rms")}
              title="View RMs"
            >
              <Users size={18} />
            </button>
            {isGridOps && (
              <button
                className={styles.OPSClinicsList_rmBtn}
                onClick={() => navigate("/ops/register-rm")}
                title="Register RM"
              >
                <UserPlus size={18} />
              </button>
            )}
          </div>
        }
      />

      <div className={styles.OPSClinicsList_searchWrap}>
        <Search size={16} className={styles.OPSClinicsList_searchIcon} />
        <input
          type="text"
          className={styles.OPSClinicsList_searchInput}
          placeholder="Search clinics..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchTerm && (
          <button
            className={styles.OPSClinicsList_clearBtn}
            onClick={() => {
              setSearchTerm("");
              fetchClinics(1, "");
            }}
          >
            &times;
          </button>
        )}
      </div>

      {loading ? (
        <OPSLoadingSpinner />
      ) : clinics.length === 0 ? (
        <div className={styles.OPSClinicsList_empty}>
          <Search size={40} className={styles.OPSClinicsList_emptyIcon} />
          <p className={styles.OPSClinicsList_emptyText}>
            {searchTerm ? "No clinics match your search" : "No clinics found"}
          </p>
          {searchTerm && (
            <button
              className={styles.OPSClinicsList_clearSearchBtn}
              onClick={() => {
                setSearchTerm("");
                fetchClinics(1, "");
              }}
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className={styles.OPSClinicsList_results}>
            <span className={styles.OPSClinicsList_resultCount}>
              {clinics.length} clinic{clinics.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className={styles.OPSClinicsList_list}>
            {clinics.map((clinic) => (
              <OPSClinicCard
                key={clinic._id}
                clinic={clinic}
                onClick={() => navigate(`/ops/clinics/${clinic._id}`)}
                onDelete={isGridOps ? setDeleteTarget : undefined}
              />
            ))}
          </div>

          <div ref={loaderRef} className={styles.OPSClinicsList_loader}>
            {loadingMore && (
              <div className={styles.OPSClinicsList_spinner} />
            )}
          </div>
        </>
      )}

      {deleteTarget && (
        <OPSDeleteConfirmModal
          clinic={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default OPSClinicsList;
