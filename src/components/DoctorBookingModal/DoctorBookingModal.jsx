import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { doctorRegisterPatient } from '../../services/apis/patient.service';
import toast from 'react-hot-toast';
import styles from './DoctorBookingModal.module.css';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  gender: '',
  age: '',
  complaints: '',
};

const DoctorBookingModal = ({ isOpen, onClose, clinicDisplayId, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = useCallback(async (e) => {
    const validate = () => {
      const errs = {};
      if (!form.name.trim()) errs.name = 'Name is required';
      if (!form.phone.trim()) errs.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number';
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email';
      if (!form.gender) errs.gender = 'Select gender';
      if (!form.age || Number(form.age) < 1 || Number(form.age) > 150) errs.age = 'Enter a valid age';
      if (!form.complaints.trim()) errs.complaints = 'Please describe complaints';
      if (!consentChecked) errs.consent = 'You must accept the consent terms';
      return errs;
    };

    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const res = await doctorRegisterPatient({
        clinicDisplayId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        gender: form.gender,
        age: Number(form.age),
        chiefComplaints: form.complaints.trim(),
        isConsent: 1,
      });
      if (res?.success === true) {
        toast.success('Appointment booked successfully');
        setForm(initialForm);
        setConsentChecked(false);
        onSuccess?.();
        onClose();
      } else {
        toast.error(res?.message || 'Failed to book appointment');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }, [form, clinicDisplayId, consentChecked, onSuccess, onClose]);

  const handleConsentOpen = () => {
    setConsentModalOpen(true);
  };

  const handleConsentConfirm = () => {
    setConsentChecked(true);
    setConsentModalOpen(false);
    setErrors(prev => ({ ...prev, consent: '' }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.DoctorBookingModal_overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className={styles.DoctorBookingModal_modal}>
          <div className={styles.DoctorBookingModal_header}>
            <h2 className={styles.DoctorBookingModal_title}>Book Appointment for Patient</h2>
            <button className={styles.DoctorBookingModal_closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <form className={styles.DoctorBookingModal_form} onSubmit={handleSubmit} noValidate>
            <div className={styles.DoctorBookingModal_field}>
              <label className={styles.DoctorBookingModal_label}>Full Name</label>
              <input
                className={`${styles.DoctorBookingModal_input} ${errors.name ? styles.DoctorBookingModal_inputError : ''}`}
                type="text"
                placeholder="Enter patient's full name"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
              />
              {errors.name && <span className={styles.DoctorBookingModal_error}>{errors.name}</span>}
            </div>

            <div className={styles.DoctorBookingModal_row}>
              <div className={styles.DoctorBookingModal_field}>
                <label className={styles.DoctorBookingModal_label}>Phone Number</label>
                <input
                  className={`${styles.DoctorBookingModal_input} ${errors.phone ? styles.DoctorBookingModal_inputError : ''}`}
                  type="tel"
                  placeholder="10-digit number"
                  maxLength={10}
                  value={form.phone}
                  onChange={e => updateField('phone', e.target.value.replace(/\D/g, ''))}
                />
                {errors.phone && <span className={styles.DoctorBookingModal_error}>{errors.phone}</span>}
              </div>

              <div className={styles.DoctorBookingModal_field}>
                <label className={styles.DoctorBookingModal_label}>Age</label>
                <input
                  className={`${styles.DoctorBookingModal_input} ${errors.age ? styles.DoctorBookingModal_inputError : ''}`}
                  type="number"
                  placeholder="Age"
                  min={1}
                  max={150}
                  value={form.age}
                  onChange={e => updateField('age', e.target.value.replace(/\D/g, ''))}
                />
                {errors.age && <span className={styles.DoctorBookingModal_error}>{errors.age}</span>}
              </div>
            </div>

            <div className={styles.DoctorBookingModal_field}>
              <label className={styles.DoctorBookingModal_label}>Email (Optional)</label>
              <input
                className={`${styles.DoctorBookingModal_input} ${errors.email ? styles.DoctorBookingModal_inputError : ''}`}
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
              />
              {errors.email && <span className={styles.DoctorBookingModal_error}>{errors.email}</span>}
            </div>

            <div className={styles.DoctorBookingModal_field}>
              <label className={styles.DoctorBookingModal_label}>Gender</label>
              <div className={styles.DoctorBookingModal_genderRow}>
                {['Male', 'Female', 'Other'].map(g => (
                  <label
                    key={g}
                    className={`${styles.DoctorBookingModal_genderOption} ${form.gender === g ? styles.DoctorBookingModal_genderOptionActive : ''}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={e => updateField('gender', e.target.value)}
                      className={styles.DoctorBookingModal_genderRadio}
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && <span className={styles.DoctorBookingModal_error}>{errors.gender}</span>}
            </div>

            <div className={styles.DoctorBookingModal_field}>
              <label className={styles.DoctorBookingModal_label}>Complaints / Symptoms</label>
              <textarea
                className={`${styles.DoctorBookingModal_textarea} ${errors.complaints ? styles.DoctorBookingModal_inputError : ''}`}
                rows={3}
                placeholder="Describe patient's complaints..."
                value={form.complaints}
                onChange={e => updateField('complaints', e.target.value)}
              />
              {errors.complaints && <span className={styles.DoctorBookingModal_error}>{errors.complaints}</span>}
            </div>

            <div className={styles.DoctorBookingModal_consentRow}>
              <label className={styles.DoctorBookingModal_consentLabel}>
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={() => {}}
                  className={styles.DoctorBookingModal_consentCheckbox}
                />
                <span
                  className={`${styles.DoctorBookingModal_customCheckbox} ${consentChecked ? styles.DoctorBookingModal_customCheckboxChecked : ''}`}
                  onClick={handleConsentOpen}
                >
                  {consentChecked && '✓'}
                </span>
                <span className={styles.DoctorBookingModal_consentText} onClick={handleConsentOpen}>
                  I confirm all consent terms for booking this appointment
                </span>
              </label>
            </div>
            {errors.consent && <span className={styles.DoctorBookingModal_error}>{errors.consent}</span>}

            <div className={styles.DoctorBookingModal_buttonRow}>
              <button type="button" className={styles.DoctorBookingModal_cancelBtn} onClick={onClose}>
                Close
              </button>
              <button
                type="submit"
                className={`${styles.DoctorBookingModal_submitBtn} ${!consentChecked ? styles.DoctorBookingModal_submitBtnDisabled : ''}`}
                disabled={!consentChecked || submitting}
              >
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {consentModalOpen && (
        <div className={styles.DoctorBookingModal_overlay} onClick={e => e.target === e.currentTarget && setConsentModalOpen(false)}>
          <div className={styles.DoctorBookingModal_consentModal}>
            <h3 className={styles.DoctorBookingModal_consentModalTitle}>Consent Terms</h3>
            <div className={styles.DoctorBookingModal_consentModalBody}>
              <div className={styles.DoctorBookingModal_consentSection}>
                <h4 className={styles.DoctorBookingModal_consentSectionTitle}>1. Patient Data Verbal Consent (मरीज की सहमति)</h4>
                <p className={styles.DoctorBookingModal_consentSectionText}>
                  I certify that explicit verbal consent has been taken from the patient to enter their personal credentials, contact number, and primary symptoms into the GridVital software infrastructure for automated queue and token orchestration.
                </p>
                <p className={styles.DoctorBookingModal_consentSectionTextHindi}>
                  मैं प्रमाणित करता/करती हूँ कि मैंने मरीज की मौखिक सहमति ले ली है कि उनका नाम, मोबाइल नंबर और बीमारी के लक्षण टोकन जनरेशन और कतार प्रबंधन के लिए सॉफ्टवेयर पर दर्ज किए जा रहे हैं।
                </p>
              </div>

              <div className={styles.DoctorBookingModal_consentSection}>
                <h4 className={styles.DoctorBookingModal_consentSectionTitle}>2. Record Accuracy & Verification (विवरण की सत्यता)</h4>
                <p className={styles.DoctorBookingModal_consentSectionText}>
                  I confirm that the patient's identity parameters, age indicators, and chief complaints have been cross-verified with the patient at the desk to eliminate data-entry flaws or clinical tracking anomalies.
                </p>
                <p className={styles.DoctorBookingModal_consentSectionTextHindi}>
                  मैं पुष्टि करता/करती हूँ कि मरीज के नाम, उम्र और मुख्य लक्षणों की जांच दोबारा कर ली गई है ताकि डेटा एंट्री में कोई त्रुटि न हो और इलाज के समय सही रिकॉर्ड सामने रहे।
                </p>
              </div>

              <div className={styles.DoctorBookingModal_consentSection}>
                <h4 className={styles.DoctorBookingModal_consentSectionTitle}>3. Software Role Realization (सॉफ्टवेयर की सीमित भूमिका)</h4>
                <p className={styles.DoctorBookingModal_consentSectionText}>
                  It is acknowledged that GridVital operates strictly as a workflow scheduling automation pipeline. The practicing doctor retains absolute, non-transferable liability for the final clinical diagnosis, consultation depth, and prescription legitimacy linked to this manual slot assignment.
                </p>
                <p className={styles.DoctorBookingModal_consentSectionTextHindi}>
                  यह स्वीकार किया जाता है कि GridVital केवल एक शेड्यूलिंग और टोकन ऑटोमेशन टूल है। इस मैनुअल स्लॉट पर मरीज के वास्तविक इलाज, बीमारी के निदान (Diagnosis) और पर्चे (Prescription) की पूरी 100% जिम्मेदारी केवल डॉक्टर की ही रहेगी।
                </p>
              </div>
            </div>
            <div className={styles.DoctorBookingModal_consentModalFooter}>
              <button className={styles.DoctorBookingModal_consentBtn} onClick={handleConsentConfirm}>
                I Consent
              </button>
              <button className={styles.DoctorBookingModal_consentCancelBtn} onClick={() => setConsentModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorBookingModal;
