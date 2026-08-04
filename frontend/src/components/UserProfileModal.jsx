import React, { useState, useEffect } from 'react';
import { getPatientId } from '../utils/patientUtils.js';

export default function UserProfileModal({ isOpen, onClose, currentUser, onSaveProfile, isSaving }) {
  if (!isOpen || !currentUser) return null;

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    dob: currentUser.dob || '',
    gender: currentUser.gender || 'Male',
    bloodGroup: currentUser.bloodGroup || 'O+',
    address: currentUser.address || '',
    emergencyContact: currentUser.emergencyContact || '',
    policyNumber: currentUser.policyNumber || ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        dob: currentUser.dob || '',
        gender: currentUser.gender || 'Male',
        bloodGroup: currentUser.bloodGroup || 'O+',
        address: currentUser.address || '',
        emergencyContact: currentUser.emergencyContact || '',
        policyNumber: currentUser.policyNumber || ''
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name) {
      setErrorMsg('Full Name is required.');
      return;
    }

    try {
      await onSaveProfile(formData);
      setSuccessMsg('Profile details updated successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile details.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 25, 22, 0.65)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }} onClick={onClose}>
      <div
        className="surface-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(253, 251, 247, 0.95)',
          border: '1.5px solid rgba(184, 174, 149, 0.4)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          padding: '0'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--ledger-line)',
          background: 'rgba(233, 229, 214, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }} className="font-mono">
              PERSONAL DOSSIER PROFILE
            </div>
            <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', margin: '2px 0 0 0' }}>
              Patient Personal Details
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(28, 43, 38, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
              fontWeight: 700,
              fontSize: '1rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Content Form */}
        <div style={{ padding: '24px 28px' }}>
          {/* Patient ID Banner */}
          <div style={{
            background: 'rgba(46, 83, 52, 0.08)',
            border: '1px solid rgba(46, 83, 52, 0.25)',
            borderRadius: '16px',
            padding: '12px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--stamp-forest)', fontWeight: 600, textTransform: 'uppercase' }} className="font-mono">
                UNIQUE PATIENT ID
              </div>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--stamp-forest)' }}>
                {getPatientId(currentUser)}
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
              {currentUser.email}
            </div>
          </div>

          {errorMsg && (
            <div style={{
              background: 'rgba(181, 61, 56, 0.08)',
              border: '1px solid rgba(181, 61, 56, 0.3)',
              color: 'var(--stamp-crimson)',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.825rem',
              marginBottom: '16px',
              fontWeight: 500
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(46, 83, 52, 0.08)',
              border: '1px solid rgba(46, 83, 52, 0.3)',
              color: 'var(--stamp-forest)',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.825rem',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              ✅ {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Gender</label>
                <select
                  className="input-field"
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  style={{ appearance: 'auto' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="form-label">Blood Group</label>
                <select
                  className="input-field"
                  value={formData.bloodGroup}
                  onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                  style={{ appearance: 'auto' }}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="form-label">Residential Address</label>
              <textarea
                className="input-field"
                rows="2"
                placeholder="Flat No, Street, City, State, Pincode"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                style={{ borderRadius: '12px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label className="form-label">Emergency Contact</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Relative Name & Phone"
                  value={formData.emergencyContact}
                  onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Insurance Policy Number</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. POL/2026/89421"
                  value={formData.policyNumber}
                  onChange={e => setFormData({ ...formData, policyNumber: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--ledger-line)' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
                style={{ padding: '10px 20px', borderRadius: '9999px' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary"
                style={{ padding: '10px 24px', borderRadius: '9999px', fontSize: '0.875rem' }}
              >
                {isSaving ? 'Saving Profile...' : 'Save Profile Details'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
