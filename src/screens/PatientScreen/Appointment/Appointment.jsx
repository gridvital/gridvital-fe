import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { clinicDetailPublic, patientQrRegister } from '../../../services/apis/patient.service';
import { useCustomToast } from '../../../components/customToast/customToast';
import styles from './Appointment.module.css';
import gridVitalLogo from "../../../assets/images/logos/GridVitalLogo.png"

const initialForm = {
  name: '',
  phone: '',
  email: '',
  gender: '',
  age: '',
  complaints: '',
};

const PatientAppointment = () => {
  const [searchParams] = useSearchParams();
  const clinicId = searchParams.get('clinicId');

  const [stage, setStage] = useState('loading');
  const [clinicData, setClinicData] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [consentChecked, setConsentChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tokenData, setTokenData] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast, ToastComponent } = useCustomToast();

  const [dateTime] = useState(() => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
      time: now.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true,
      }),
    };
  });

  useEffect(() => {
    if (!clinicId) {
      setStage('form');
      return;
    }
    (async () => {
      try {
        const res = await clinicDetailPublic(clinicId);
        setClinicData(res?.data || null);
      } catch {
        // proceed without clinic data
      } finally {
        setStage('form');
      }
    })();
  }, [clinicId]);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email';
    if (!form.gender) errs.gender = 'Select your gender';
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 150) errs.age = 'Enter a valid age';
    if (!form.complaints.trim()) errs.complaints = 'Please describe your complaints';
    if (!consentChecked) errs.consent = 'You must agree to the terms';
    return errs;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const res = await patientQrRegister({
        clinicDisplayId: clinicId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        gender: form.gender,
        age: Number(form.age),
        complaints: form.complaints.trim(),
        isConsent: 1,
      });
      if (res?.data) {
        setTokenData(res.data);
        setStage('success');
      } else if (res?.message) {
        showToast('error', res.message);
      } else {
        showToast('error', 'Registration failed. Please try again.');
      }
    } catch {
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [form, clinicId, consentChecked]);

  const handleConsent = () => {
    setConsentChecked(true);
    setModalOpen(false);
    setErrors(prev => ({ ...prev, consent: '' }));
  };

  const clinic = clinicData || {};
  const clinicName = clinic?.clinicName || '';
  const doctorName = clinic?.doctorName || '';
  const specialization = clinic?.specialization || '';
  const address = clinic?.address || '';
  const city = clinic?.city || '';
  const state = clinic?.state || '';

  return (
    <div className={styles.PatientAppointment_wrapper}>
      <div className={styles.PatientAppointment_container}>
        {stage === 'loading' && (
          <div className={styles.PatientAppointment_loadingScreen}>
            <div className={styles.PatientAppointment_loader} />
            <p className={styles.PatientAppointment_loadingText}>Loading clinic details...</p>
          </div>
        )}

        {stage === 'form' && (
          <>
            <header className={styles.PatientAppointment_header}>
              <img src={gridVitalLogo} alt="GridVital" className={styles.PatientAppointment_logo} />
            </header>

            <div className={styles.PatientAppointment_titleCard}>
              <h2 className={styles.PatientAppointment_title}>Book Token Appointment</h2>
              <p className={styles.PatientAppointment_dateTime}>
                {dateTime.date} | {dateTime.time}
              </p>
            </div>

            <div className={styles.PatientAppointment_clinicCard}>
              <div className={styles.PatientAppointment_clinicInfo}>
                {clinicName && (
                  <h3 className={styles.PatientAppointment_clinicName}>{clinicName}</h3>
                )}
                {(doctorName || specialization) && (
                  <p className={styles.PatientAppointment_doctorRow}>
                    {doctorName && (
                      <span className={styles.PatientAppointment_doctorName}>{doctorName}</span>
                    )}
                    {doctorName && specialization && (
                      <span className={styles.PatientAppointment_dot}>•</span>
                    )}
                    {specialization && (
                      <span className={styles.PatientAppointment_specialization}>{specialization}</span>
                    )}
                  </p>
                )}
                {(address || city || state) && (
                  <p className={styles.PatientAppointment_location}>
                    {[address, city, state].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>

            <form className={styles.PatientAppointment_form} onSubmit={handleSubmit} noValidate>
              <div className={styles.PatientAppointment_field}>
                <label className={styles.PatientAppointment_label}>Full Name</label>
                <input
                  className={`${styles.PatientAppointment_input} ${errors.name ? styles.PatientAppointment_inputError : ''}`}
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => updateField('name', e.target.value)}
                />
                {errors.name && <span className={styles.PatientAppointment_error}>{errors.name}</span>}
              </div>

              <div className={styles.PatientAppointment_row}>
                <div className={styles.PatientAppointment_field}>
                  <label className={styles.PatientAppointment_label}>Phone Number</label>
                  <input
                    className={`${styles.PatientAppointment_input} ${errors.phone ? styles.PatientAppointment_inputError : ''}`}
                    type="tel"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={form.phone}
                    onChange={e => updateField('phone', e.target.value.replace(/\D/g, ''))}
                  />
                  {errors.phone && <span className={styles.PatientAppointment_error}>{errors.phone}</span>}
                </div>

                <div className={styles.PatientAppointment_field}>
                  <label className={styles.PatientAppointment_label}>Age</label>
                  <input
                    className={`${styles.PatientAppointment_input} ${errors.age ? styles.PatientAppointment_inputError : ''}`}
                    type="number"
                    placeholder="Age"
                    min={1}
                    max={150}
                    value={form.age}
                    onChange={e => updateField('age', e.target.value.replace(/\D/g, ''))}
                  />
                  {errors.age && <span className={styles.PatientAppointment_error}>{errors.age}</span>}
                </div>
              </div>

              <div className={styles.PatientAppointment_field}>
                <label className={styles.PatientAppointment_label}>Email (Optional)</label>
                <input
                  className={`${styles.PatientAppointment_input} ${errors.email ? styles.PatientAppointment_inputError : ''}`}
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={e => updateField('email', e.target.value)}
                />
                {errors.email && <span className={styles.PatientAppointment_error}>{errors.email}</span>}
              </div>

              <div className={styles.PatientAppointment_field}>
                <label className={styles.PatientAppointment_label}>Gender</label>
                <div className={styles.PatientAppointment_genderRow}>
                  {['Male', 'Female', 'Other'].map(g => (
                    <label
                      key={g}
                      className={`${styles.PatientAppointment_genderOption} ${form.gender === g ? styles.PatientAppointment_genderOptionActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={form.gender === g}
                        onChange={e => updateField('gender', e.target.value)}
                        className={styles.PatientAppointment_genderRadio}
                      />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.gender && <span className={styles.PatientAppointment_error}>{errors.gender}</span>}
              </div>

              <div className={styles.PatientAppointment_field}>
                <label className={styles.PatientAppointment_label}>Apni Bimari / Pareshani Likhein</label>
                <textarea
                  className={`${styles.PatientAppointment_textarea} ${errors.complaints ? styles.PatientAppointment_inputError : ''}`}
                  rows={4}
                  placeholder="Kripya apni samasya ka vivaran yahan likhein..."
                  value={form.complaints}
                  onChange={e => updateField('complaints', e.target.value)}
                />
                {errors.complaints && <span className={styles.PatientAppointment_error}>{errors.complaints}</span>}
              </div>

              <div className={styles.PatientAppointment_consentRow}>
                <label className={styles.PatientAppointment_consentLabel}>
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={() => {}}
                    className={styles.PatientAppointment_consentCheckbox}
                  />
                  <span
                    className={`${styles.PatientAppointment_customCheckbox} ${consentChecked ? styles.PatientAppointment_customCheckboxChecked : ''}`}
                    onClick={() => setModalOpen(true)}
                  >
                    {consentChecked && '✓'}
                  </span>
                  <span
                    className={styles.PatientAppointment_consentText}
                    onClick={() => setModalOpen(true)}
                  >
                    I agree to the <strong>Data Processing Terms</strong> &{' '}
                    <strong>Privacy Statement</strong>
                  </span>
                </label>
              </div>
              {errors.consent && <span className={styles.PatientAppointment_error}>{errors.consent}</span>}

              <button
                type="submit"
                className={`${styles.PatientAppointment_submitBtn} ${!consentChecked ? styles.PatientAppointment_submitBtnDisabled : ''}`}
                disabled={!consentChecked || submitting}
              >
                {submitting ? 'Submitting...' : 'Book Appointment'}
              </button>
            </form>

            {modalOpen && (
              <div
                className={styles.PatientAppointment_modalOverlay}
                onClick={e => e.target === e.currentTarget && setModalOpen(false)}
              >
                <div className={styles.PatientAppointment_modalBox}>
                  <h3 className={styles.PatientAppointment_modalTitle}>Data Processing Terms</h3>
                  <div className={styles.PatientAppointment_modalBody}>
                    <p>
                      By consenting, you agree that the health information, symptoms, and personal data
                      you provide in this form will be securely processed and shared with the clinic for
                      the purpose of medical consultation and record-keeping.
                    </p>
                    <p>
                      Your data will be stored in compliance with applicable data protection laws and
                      will not be shared with third parties without your explicit consent.
                    </p>
                    <p className={styles.PatientAppointment_modalWarning}>
                      <strong>⚠ Aap form me jo bhi health data aur complaints bharege, uske zimmedar aap swayam honge. GridVital software kewal data routing aur scheduling manage karta hai.</strong>
                    </p>
                  </div>
                  <div className={styles.PatientAppointment_modalFooter}>
                    <button
                      className={styles.PatientAppointment_modalConsentBtn}
                      onClick={handleConsent}
                    >
                      I Consent
                    </button>
                    <button
                      className={styles.PatientAppointment_modalCancelBtn}
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {stage === 'success' && tokenData && (
          <div className={styles.PatientAppointment_successScreen}>
            <div className={styles.PatientAppointment_successBadge}>✓</div>

            <div className={styles.PatientAppointment_tokenWidget}>
              <p className={styles.PatientAppointment_tokenLabel}>Your Token Number</p>
              <div className={styles.PatientAppointment_tokenNumber}>
                {tokenData.tokenNumber}
              </div>
              <span className={styles.PatientAppointment_tokenStatus}>
                <span className={styles.PatientAppointment_statusDot} />
                Waiting
              </span>
            </div>

            <div className={styles.PatientAppointment_receiptCard}>
              <h4 className={styles.PatientAppointment_receiptTitle}>Patient Pass</h4>
              <div className={styles.PatientAppointment_receiptRow}>
                <span className={styles.PatientAppointment_receiptLabel}>Name</span>
                <span className={styles.PatientAppointment_receiptValue}>{tokenData.name || form.name}</span>
              </div>
              <div className={styles.PatientAppointment_receiptRow}>
                <span className={styles.PatientAppointment_receiptLabel}>Contact</span>
                <span className={styles.PatientAppointment_receiptValue}>{tokenData.phone || form.phone}</span>
              </div>
            </div>

            <p className={styles.PatientAppointment_successMessage}>
              Aapka token number generate ho gaya hai. Kripya waiting area me apni bari ka
              intezar karein. Screen refresh karne ki zaroorat nahi hai.
            </p>
          </div>
        )}
      </div>
      {ToastComponent}
    </div>
  );
};

export default PatientAppointment;
