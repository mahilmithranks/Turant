import React, { useState } from 'react';
import { RubberStamp, DocumentIcon, ExternalLinkIcon } from './Icons.jsx';
import ClaimTimeline from './ClaimTimeline.jsx';

export default function PatientPortal({ claims, currentUser, onSubmitClaim, isSubmitting, activeTab = 'submit', onTabChange }) {
  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    claimAmount: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [selectedClaimForDetail, setSelectedClaimForDetail] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Declaration & Confirmation Modal states
  const [showDeclarationModal, setShowDeclarationModal] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  
  // Success Submitted Modal states
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
  const [lastSubmittedInfo, setLastSubmittedInfo] = useState(null);

  React.useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email
      }));
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('File size exceeds maximum limit of 10MB.');
        return;
      }
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreviewUrl(URL.createObjectURL(file));
      } else {
        setFilePreviewUrl(null);
      }
      setErrorMsg('');
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setSelectedFile(null);
    setFilePreviewUrl(null);
  };


  // Open Authenticity Declaration Confirmation Modal
  const handleOpenDeclarationModal = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.email || !formData.claimAmount || !formData.description) {
      setErrorMsg('All fields are mandatory. Please fill in your name, email, claim amount, and description.');
      return;
    }

    if (isNaN(formData.claimAmount) || Number(formData.claimAmount) <= 0) {
      setErrorMsg('Enter a claim amount greater than zero.');
      return;
    }

    if (!selectedFile) {
      setErrorMsg('Uploading a medical document / receipt proof is mandatory for submitting a claim.');
      return;
    }

    // Open Declaration Confirmation Step
    setDeclarationChecked(false);
    setShowDeclarationModal(true);
  };

  // Final execution of actual submit after legal confirmation
  const handleFinalExecuteSubmit = async () => {
    if (!declarationChecked) return;

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('claimAmount', formData.claimAmount);
    payload.append('description', formData.description);
    payload.append('document', selectedFile);

    try {
      await onSubmitClaim(payload);
      setShowDeclarationModal(false);
      
      setLastSubmittedInfo({
        amount: formData.claimAmount,
        description: formData.description,
        date: new Date()
      });
      setShowSubmittedModal(true);
      setSuccessMsg('Your claim has been logged into the register and is under review.');

      setFormData({
        name: currentUser ? currentUser.name : '',
        email: currentUser ? currentUser.email : '',
        claimAmount: '',
        description: ''
      });
      setSelectedFile(null);
      setFilePreviewUrl(null);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit claim.');
      setShowDeclarationModal(false);
    }
  };

  const totalSanctioned = claims
    .filter(c => c.status === 'Approved')
    .reduce((sum, c) => sum + (c.approvedAmount || 0), 0);

  const pendingCount = claims.filter(c => c.status === 'Pending').length;

  return (
    <div style={{ maxWidth: '1100px', margin: '24px auto', padding: '0 24px' }}>
      
      {/* DOSSIER HEADER BANNER */}
      <div className="surface-register" style={{
        padding: '24px 32px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        borderLeft: '4px solid var(--ink)'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <span style={{ fontSize: '0.725rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ink-soft)', letterSpacing: '0.08em' }} className="font-mono">
            PATIENT PORTAL
          </span>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', marginTop: '4px', marginBottom: '8px' }}>
            Welcome back, {currentUser ? currentUser.name : 'Patient'}
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Submit healthcare reimbursement claims, upload medical receipts, and track your approval progress in real-time.
          </p>
        </div>

        {/* Ledger Quick Summary */}
        <div style={{
          display: 'flex',
          gap: '20px',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--ledger-line)',
          borderRadius: '12px',
          padding: '16px 20px'
        }}>
          <div style={{ borderRight: '1px solid var(--ledger-line)', paddingRight: '20px' }}>
            <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }} className="font-mono">Logged Cases</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 700 }}>
              {claims.length}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--stamp-ochre)', marginTop: '2px' }} className="font-stamp">
              {pendingCount} Pending Stamp
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }} className="font-mono">Total Sanctioned</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', color: 'var(--stamp-forest)', fontWeight: 700 }}>
              ₹{totalSanctioned.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--stamp-forest)', marginTop: '2px' }} className="font-stamp">
              SANCTIONED PAYOUT
            </div>
          </div>
        </div>
      </div>

      {/* SEPARATE TAB SWITCHER IN CUSTOMER SECTION */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: 'rgba(233, 229, 214, 0.65)',
        backdropFilter: 'blur(12px)',
        padding: '6px',
        borderRadius: '9999px',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        margin: '0 auto 24px auto',
        maxWidth: '540px'
      }}>
        <button
          type="button"
          onClick={() => onTabChange && onTabChange('submit')}
          style={{
            flex: 1,
            padding: '10px 18px',
            borderRadius: '9999px',
            border: 'none',
            background: activeTab === 'submit' ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            color: activeTab === 'submit' ? 'var(--ink)' : 'var(--ink-soft)',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'submit' ? '0 4px 12px rgba(28, 43, 38, 0.1)' : 'none',
            transition: 'all 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>📝</span> Submit New Claim
        </button>

        <button
          type="button"
          onClick={() => onTabChange && onTabChange('history')}
          style={{
            flex: 1,
            padding: '10px 18px',
            borderRadius: '9999px',
            border: 'none',
            background: activeTab === 'history' ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            color: activeTab === 'history' ? 'var(--ink)' : 'var(--ink-soft)',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'history' ? '0 4px 12px rgba(28, 43, 38, 0.1)' : 'none',
            transition: 'all 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>📋</span> Claims Register Index ({claims.length})
        </button>
      </div>

      {/* TAB 1: SUBMIT CLAIM FORM */}
      {activeTab === 'submit' && (
        <div className="surface-register animate-fade" style={{ padding: '32px', maxWidth: '720px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px double var(--ledger-line)' }}>
            Log New Reimbursement Form
          </h3>

          {errorMsg && (
            <div style={{
              background: 'rgba(166, 54, 43, 0.08)',
              border: '1px solid var(--stamp-vermilion)',
              color: 'var(--stamp-vermilion)',
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.85rem'
            }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(46, 83, 52, 0.08)',
              border: '1px solid var(--stamp-forest)',
              color: 'var(--stamp-forest)',
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.85rem'
            }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleOpenDeclarationModal}>
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Patient Name *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="input-field"
                placeholder="patient@aarogya.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Claim Amount Requested (₹ INR) *</label>
              <div style={{ position: 'relative' }}>
                <span className="font-mono" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }}>₹</span>
                <input
                  type="number"
                  step="0.01"
                  className="input-field font-mono"
                  style={{ paddingLeft: '28px' }}
                  placeholder="0.00"
                  value={formData.claimAmount}
                  onChange={e => setFormData({ ...formData, claimAmount: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Medical Treatment Description *</label>
              <textarea
                className="textarea-field"
                rows="4"
                placeholder="Details of hospitalization, diagnosis, or medicine expenses..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* UPLOAD DOCUMENT AREA WITH LIVE PREVIEW */}
            <div style={{ marginBottom: '24px' }}>
              <label className="form-label">Upload Medical Proof Document (Mandatory *)</label>
              <div
                style={{
                  border: selectedFile ? '2px solid var(--ink)' : '1px dashed var(--ledger-line)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: selectedFile ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
                  transition: 'all 0.15s ease'
                }}
                onClick={() => document.getElementById('file-input').click()}
              >
                <input
                  type="file"
                  id="file-input"
                  style={{ display: 'none' }}
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                
                {selectedFile ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    {/* Live Image Preview Thumbnail */}
                    {filePreviewUrl ? (
                      <div style={{ position: 'relative', maxWidth: '240px', maxHeight: '160px', overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--ledger-line)' }}>
                        <img
                          src={filePreviewUrl}
                          alt="Document Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div style={{ background: 'rgba(28, 43, 38, 0.08)', padding: '16px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <DocumentIcon size={28} color="var(--ink)" />
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{selectedFile.name}</div>
                          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                            {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Document'}
                          </div>
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); document.getElementById('file-input').click(); }}
                        className="btn btn-ghost"
                        style={{ fontSize: '0.775rem', padding: '4px 12px', borderRadius: '9999px' }}
                      >
                        Change File
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        style={{
                          background: 'rgba(166, 54, 43, 0.1)',
                          color: 'var(--stamp-vermilion)',
                          border: 'none',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.775rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
                    <DocumentIcon size={32} color="var(--ink-soft)" style={{ marginBottom: '8px' }} />
                    <div>Click to Attach Receipt / Prescription Document (PDF, PNG, JPG - Max 10MB)</div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: '9999px', fontSize: '0.9rem' }}
            >
              Log Claim into Register →
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: CLAIMS REGISTER INDEX */}
      {activeTab === 'history' && (
        <div className="surface-register animate-fade" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px double var(--ledger-line)' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
              Claims Register Index
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }} className="font-mono">
              {claims.length} Registered Entries
            </span>
          </div>

          {claims.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 16px', color: 'var(--ink-soft)' }}>
              <DocumentIcon size={40} color="var(--ledger-line)" />
              <p style={{ marginTop: '14px', fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500 }}>
                No cases logged yet — click "Submit New Claim" above to file your first reimbursement.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {claims.map((claim, idx) => {
                const claimFileNo = `AC/2026/CH/${String(claim._id).slice(-6).toUpperCase()}`;

                return (
                  <div
                    key={claim._id}
                    className="surface-glass-card"
                    style={{
                      padding: '20px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {/* Header Row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
                            #{String(idx + 1).padStart(2, '0')} • File: {claimFileNo}
                          </div>
                          <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--ink)', marginTop: '4px' }}>
                            {claim.description}
                          </div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--ink-soft)', marginTop: '2px' }} className="font-mono">
                            Date Logged: {new Date(claim.submissionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>

                        {/* Rubber Stamp graphic */}
                        <RubberStamp status={claim.status} approvedAmount={claim.approvedAmount} date={claim.submissionDate} />
                      </div>

                      {/* Financial Summary */}
                      <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed var(--ledger-line)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }}>Requested Claim:</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }} className="font-mono">
                              ₹{claim.claimAmount?.toLocaleString('en-IN')}
                            </div>
                          </div>

                          {claim.status === 'Approved' && (
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '0.725rem', color: 'var(--stamp-forest)', fontWeight: 600, textTransform: 'uppercase' }}>Sanctioned Amount:</div>
                              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--stamp-forest)' }} className="font-mono">
                                ₹{claim.approvedAmount?.toLocaleString('en-IN')}
                              </div>
                            </div>
                          )}

                          {claim.status === 'Rejected' && (
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '0.725rem', color: 'var(--stamp-vermilion)', fontWeight: 600, textTransform: 'uppercase' }}>Sanction Status:</div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--stamp-vermilion)' }} className="font-mono">
                                ₹0 (Excluded)
                              </div>
                            </div>
                          )}
                        </div>

                        {claim.insurerComments && (
                          <div style={{
                            marginTop: '12px',
                            fontSize: '0.825rem',
                            color: 'var(--ink)',
                            background: 'rgba(233, 229, 214, 0.6)',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            borderLeft: '3px solid var(--ink)',
                            fontStyle: 'italic'
                          }}>
                            Clerk Rationale: "{claim.insurerComments}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                      <button
                        onClick={() => setSelectedClaimForDetail(claim)}
                        className="btn btn-ghost"
                        style={{ padding: '6px 14px', fontSize: '0.775rem', borderRadius: '9999px' }}
                      >
                        View Dossier Trail
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* LEGAL & AUTHENTICITY DECLARATION CONFIRMATION MODAL */}
      {showDeclarationModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(28, 43, 38, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '24px'
        }} onClick={() => setShowDeclarationModal(false)}>
          <div className="surface-dossier animate-fade" style={{
            width: '100%',
            maxWidth: '560px',
            padding: '36px 32px 32px 32px'
          }} onClick={e => e.stopPropagation()}>
            <div className="dossier-tab">LEGAL AUTHENTICITY DECLARATION</div>

            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', marginBottom: '8px' }}>
              Confirm Claim Submission & Document Authenticity
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '20px' }}>
              Please verify your claim details and confirm that all uploaded documents are genuine and original.
            </p>

            {/* Claim Summary Box */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--ledger-line)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              fontSize: '0.875rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--ink-soft)' }}>Requested Amount:</span>
                <span className="font-mono" style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)' }}>
                  ₹{Number(formData.claimAmount).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ color: 'var(--ink)', marginBottom: '10px' }}>
                <strong>Description:</strong> "{formData.description}"
              </div>

              {/* Document Preview in Declaration */}
              {selectedFile && (
                <div style={{
                  paddingTop: '10px',
                  borderTop: '1px dashed var(--ledger-line)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {filePreviewUrl ? (
                    <img src={filePreviewUrl} alt="Preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--ledger-line)' }} />
                  ) : (
                    <DocumentIcon size={24} color="var(--ink)" />
                  )}
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--ink)' }}>{selectedFile.name}</div>
                    <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--ink-soft)' }}>
                      {(selectedFile.size / 1024).toFixed(1)} KB • Attached Proof Document
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Authenticity Rules & Terms */}
            <div style={{
              background: 'rgba(233, 229, 214, 0.5)',
              border: '1px solid rgba(184, 174, 149, 0.6)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              fontSize: '0.8rem',
              color: 'var(--ink)',
              lineHeight: '1.5'
            }}>
              <div style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--stamp-forest)' }}>
                🛡️ Anti-Fraud Rules & Legal Terms:
              </div>
              <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>I declare that the attached medical bills, prescriptions, and receipts are original and authentic.</li>
                <li>I understand that submitting falsified, altered, or duplicate receipts is punishable by law and results in permanent account suspension.</li>
                <li>I confirm that this reimbursement has not been previously claimed under any other policy.</li>
              </ul>
            </div>

            {/* Declaration Checkbox */}
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '0.85rem',
              color: 'var(--ink)',
              cursor: 'pointer',
              marginBottom: '24px',
              fontWeight: 600
            }}>
              <input
                type="checkbox"
                checked={declarationChecked}
                onChange={e => setDeclarationChecked(e.target.checked)}
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--ink)', cursor: 'pointer' }}
              />
              <span>I confirm that all documents are 100% authentic and agree to the legal terms.</span>
            </label>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowDeclarationModal(false)}
                className="btn btn-ghost"
                style={{ borderRadius: '9999px' }}
              >
                Back to Edit
              </button>
              <button
                type="button"
                disabled={!declarationChecked || isSubmitting}
                onClick={handleFinalExecuteSubmit}
                className="btn btn-primary"
                style={{
                  borderRadius: '9999px',
                  opacity: declarationChecked ? 1 : 0.5,
                  cursor: declarationChecked ? 'pointer' : 'not-allowed'
                }}
              >
                {isSubmitting ? 'Logging Claim...' : 'Confirm & Log Claim →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATED SUBMITTED & WAITING FOR APPROVAL MODAL */}
      {showSubmittedModal && lastSubmittedInfo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(28, 43, 38, 0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '24px'
        }} onClick={() => {
          setShowSubmittedModal(false);
          if (onTabChange) onTabChange('history');
        }}>
          <div className="surface-dossier animate-bounce-in" style={{
            width: '100%',
            maxWidth: '520px',
            padding: '36px 32px 32px 32px',
            textAlign: 'center'
          }} onClick={e => e.stopPropagation()}>
            <div className="dossier-tab">CLAIM LOGGED & WAITING FOR APPROVAL</div>

            {/* Glowing Pulsing Emerald Checkmark Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--stamp-forest)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 18px auto',
              fontWeight: 700
            }} className="animate-pulse-glow">
              ✓
            </div>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', marginBottom: '8px' }}>
              Claim Submitted Successfully!
            </h3>

            {/* Status Pill Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(156, 122, 46, 0.12)',
              color: 'var(--stamp-ochre)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              fontFamily: 'var(--font-stamp)',
              marginBottom: '20px',
              border: '1px solid rgba(156, 122, 46, 0.3)'
            }}>
              <span>⏳</span> STATUS: UNDER REVIEW — WAITING FOR INSURER APPROVAL
            </div>

            {/* Submitted Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--ledger-line)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'left',
              marginBottom: '24px',
              fontSize: '0.875rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--ink-soft)' }}>Requested Reimbursement:</span>
                <span className="font-mono" style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>
                  ₹{Number(lastSubmittedInfo.amount).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ color: 'var(--ink)', fontStyle: 'italic', marginBottom: '8px' }}>
                "{lastSubmittedInfo.description}"
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--ink-soft)', paddingTop: '8px', borderTop: '1px dashed var(--ledger-line)' }}>
                Your case file has been placed in the insurer assessment queue. You will receive an immediate update once an authorization decision is stamped.
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowSubmittedModal(false);
                if (onTabChange) onTabChange('history');
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: '9999px', fontSize: '0.9rem' }}
            >
              Go to Claims Register Index →
            </button>
          </div>
        </div>
      )}

      {/* Signature Claim Timeline Dossier Modal */}
      {selectedClaimForDetail && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(28, 43, 38, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setSelectedClaimForDetail(null)}>
          <div className="surface-dossier animate-fade" style={{ width: '100%', maxWidth: '580px', padding: '32px 28px 28px 28px' }} onClick={e => e.stopPropagation()}>
            <div className="dossier-tab">MANILA CASE DOSSIER</div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #C4B38A', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Case Dossier Record</h3>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                  File: AC/2026/CH/{String(selectedClaimForDetail._id).slice(-6).toUpperCase()}
                </span>
              </div>
              <button onClick={() => setSelectedClaimForDetail(null)} className="btn btn-ghost" style={{ padding: '4px 10px' }}>
                Close
              </button>
            </div>

            <div style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{selectedClaimForDetail.description}</div>
              <div style={{ marginTop: '4px', fontSize: '0.825rem', color: 'var(--ink-soft)' }}>
                Patient Name: <strong>{selectedClaimForDetail.name}</strong> ({selectedClaimForDetail.email})
              </div>
            </div>

            {/* Signature Timeline */}
            <ClaimTimeline claim={selectedClaimForDetail} />

            {selectedClaimForDetail.documentUrl && (
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #C4B38A' }}>
                <a
                  href={selectedClaimForDetail.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                  style={{ fontSize: '0.8rem', width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '9999px' }}
                >
                  Inspect Attached Proof Document <ExternalLinkIcon style={{ marginLeft: '4px' }} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
