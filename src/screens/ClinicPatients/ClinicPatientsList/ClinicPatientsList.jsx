import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Phone, User, Calendar, ChevronRight, Hash, IndianRupee } from 'lucide-react';
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer';
import { fetchPatientHistory } from '../../../services/apis/dashboard.service';
import LoadingDots from '../../../components/LoadingDots/LoadingDots';
import ClinicPatientListModal from './ClinicPatientListModal';
import styles from './ClinicPatientsList.module.css';

const PAGE_SIZE = 5;

const ClinicPatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const hasMoreRef = useRef(hasMore);
  const loadingRef = useRef(loading);

  useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);
  useEffect(() => { loadingRef.current = loading; }, [loading]);

  const fetchPatients = useCallback(async (pageNum, searchQuery, append = false) => {
    setLoading(true);
    try {
      const body = { page: pageNum, pageSize: PAGE_SIZE };
      if (searchQuery.trim()) {
        const isPhone = /^[\d\s\-+()]*$/.test(searchQuery.trim());
        if (isPhone) body.phone = searchQuery.trim();
        else body.name = searchQuery.trim();
      }
      const res = await fetchPatientHistory(body);
      if (res?.success) {
        const list = Array.isArray(res.data) ? res.data : [];
        setPatients(prev => append ? [...prev, ...list] : list);
        const totalPages = res.totalPages || 1;
        setHasMore(pageNum < totalPages);
      } else {
        if (!append) setPatients([]);
        setHasMore(false);
      }
    } catch {
      if (!append) setPatients([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    setPatients([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    fetchPatients(1, search, false);
  }, [search, fetchPatients]);

  useEffect(() => {
    if (page === 1) return;
    fetchPatients(page, search, true);
  }, [page, search, fetchPatients]);

  const observerRef = useRef(null);

  const sentinelCallback = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !loadingRef.current) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 },
    );
    observerRef.current.observe(node);
  }, []);

  useEffect(() => {
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch('');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <LayoutContainer>
      <div className={styles.ClinicPatientsList_container}>
      <div className={styles.ClinicPatientsList_header}>
        <h1 className={styles.ClinicPatientsList_title}>Patient History</h1>
        <div className={styles.ClinicPatientsList_searchWrapper}>
          <Search size={16} className={styles.ClinicPatientsList_searchIcon} />
          <input
            className={styles.ClinicPatientsList_searchInput}
            type="text"
            placeholder="Search by name or mobile number..."
            value={search}
            onChange={handleSearchChange}
          />
          {search && (
            <button className={styles.ClinicPatientsList_clearBtn} onClick={clearSearch}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.ClinicPatientsList_list}>
        {initialLoading ? (
          <div className={styles.ClinicPatientsList_center}>
            <LoadingDots />
          </div>
        ) : patients.length > 0 ? (
          <>
            {patients.map((p) => (
              <div key={p.tokenId} className={styles.ClinicPatientsList_card} onClick={() => setSelectedTokenId(p.tokenId)}>
                <div className={styles.ClinicPatientsList_cardLeft}>
                  <div className={styles.ClinicPatientsList_avatar}>
                    <User size={18} />
                  </div>
                  <div className={styles.ClinicPatientsList_cardInfo}>
                    <span className={styles.ClinicPatientsList_cardName}>{p.patient?.name}</span>
                    <span className={styles.ClinicPatientsList_cardPhone}>
                      <Phone size={11} />
                      {p.patient?.phone}
                    </span>
                    <span className={styles.ClinicPatientsList_cardMeta}>
                      <span className={styles.ClinicPatientsList_cardMetaItem}>
                        <Hash size={11} />
                        {p.tokenNumber}
                      </span>
                      <span className={styles.ClinicPatientsList_cardMetaItem}>
                        <Calendar size={11} />
                        {formatDate(p.visitDate)}
                      </span>
                    </span>
                  </div>
                </div>
                <div className={styles.ClinicPatientsList_cardRight}>
                  <span className={`${styles.ClinicPatientsList_statusBadge} ${styles['ClinicPatientsList_status_' + p.status?.toLowerCase()] || ''}`}>
                    {p.status}
                  </span>
                  <ChevronRight size={16} className={styles.ClinicPatientsList_chevron} />
                </div>
              </div>
            ))}
            <div ref={sentinelCallback} className={styles.ClinicPatientsList_sentinel}>
              {loading && <LoadingDots />}
              {!hasMore && patients.length > 0 && (
                <span className={styles.ClinicPatientsList_endText}>All patients loaded</span>
              )}
            </div>
          </>
        ) : (
          <div className={styles.ClinicPatientsList_center}>
            <p className={styles.ClinicPatientsList_emptyText}>
              {search ? 'No patients match your search' : 'No patient history available'}
            </p>
          </div>
        )}
      </div>
      </div>

      {selectedTokenId && (
        <ClinicPatientListModal
          tokenId={selectedTokenId}
          onClose={() => setSelectedTokenId(null)}
        />
      )}
    </LayoutContainer>
  );
};

export default ClinicPatientsList;
