import React, { useState, useEffect } from 'react';
import { RubberStamp, ExternalLinkIcon } from './Icons.jsx';

export default function ClaimReviewModal({ claim, onClose, onSaveReview, isSaving }) {
  if (!claim) return null;

  const [decision, setDecision] = useState(claim.status === 'Pending' ? 'Approved' : claim.status);
  const [approvedAmount, setApprovedAmount] = useState(
    claim.approvedAmount !== null && claim.approvedAmount !== undefined
      ? claim.approvedAmount
      : claim.claimAmount
  );
  const [insurerComments, setInsurerComments] = useState(claim.insurerComments || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const claimFileNo = `AC/2026/CH/${String(claim._id).slice(-6).toUpperCase()}`;

  useEffect(() => {
    if (claim) {
      setDecision(claim.status === 'Pending' ? 'Approved' : claim.status);
      setApprovedAmount(
        claim.approvedAmount !== null && claim.approvedAmount !== undefined
          ? claim.approvedAmount
          : claim.claimAmount
      );
      setInsurerComments(claim.insurerComments || '');
      setShowConfirmation(false);
      setErrorMsg('');
    }
  }, [claim]);

  const handleOpenConfirmation = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (decision === 'Approved') {
      if (approvedAmount === '' || isNaN(approvedAmount) || Number(approvedAmount) <= 0) {
        setErrorMsg('Enter a sanctioned amount greater than zero.');
        return;
      }
      if (Number(approvedAmount) > Number(claim.claimAmount)) {
        setErrorMsg(`Sanctioned amount cannot exceed the requested claim amount limit of ₹${claim.claimAmount.toLocaleString('en-IN')}.`);
        return;
      }
    }

    setShowConfirmation(true);
  };

  const handleExecuteSave = async () => {
    try {
      await onSaveReview(claim._id, {
        status: decision,
        approvedAmount: decision === 'Approved' ? Number(approvedAmount) : 0,
        insurerComments
      });
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to record decision.');
      setShowConfirmation(false);
    }
  };

  const isAlreadyReviewed = claim.status !== 'Pending';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(28, 43, 38, 0.6)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px'
    }} onClick={onClose}>
      <div className="surface-dossier animate-fade" style={{ width: '100%', maxWidth: '620px', padding: '32px 28px 28px 28px' }} onClick={e => e.stopPropagation()}>
        <div className="dossier-tab">DOSSIER FILE • ASSESSOR COVER</div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #C4B38A', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
              Insurer Dossier Review
            </h3>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
              File Ref: {claimFileNo}
            </span>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '4px 10px' }}>
            Close
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(166, 54, 43, 0.08)',
            border: '1px solid var(--stamp-vermilion)',
            color: 'var(--stamp-vermilion)',
            padding: '10px 14px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '0.85rem'
          }}>
            {errorMsg}
          </div>
        )}

        {/* Claim Facts Section */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', textTransform: 'uppercase', fontWeight: 600 }}>Patient Holder</div>
              <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{claim.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{claim.email}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', textTransform: 'uppercase', fontWeight: 600 }}>Claim Requested Limit</div>
              <div style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', fontWeight: 700 }} className="font-mono">
                ₹{claim.claimAmount?.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Medical Description</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink)', background: 'var(--parchment)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--ledger-line)' }}>
              {claim.description}
            </p>
          </div>

          {claim.documentUrl && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                Attached Proof Document Preview
              </div>
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--ledger-line)',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}>
                {/\.(jpg|jpeg|png|webp|gif)($|\?)/i.test(claim.documentUrl) ? (
                  <div style={{ width: '100%', maxHeight: '220px', overflow: 'hidden', borderRadius: '6px', border: '1px solid var(--ledger-line)', display: 'flex', justifyContent: 'center', background: '#FDFBF7' }}>
                    <img
                      src={claim.documentUrl}
                      alt="Attached Medical Proof"
                      style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '180px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--ledger-line)' }}>
                    <iframe
                      src={claim.documentUrl}
                      title="Attached Document Preview"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                )}

                <a
                  href={claim.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                  style={{ fontSize: '0.775rem', padding: '4px 14px', borderRadius: '9999px' }}
                >
                  Inspect Full Document in New Window <ExternalLinkIcon style={{ marginLeft: '4px' }} />
                </a>
              </div>
            </div>
          )}
        </div>


        {/* Current Stamp Status */}
        {isAlreadyReviewed && !showConfirmation && (
          <div style={{
            background: 'var(--parchment)',
            border: '1px solid var(--ledger-line)',
            padding: '12px 14px',
            borderRadius: '4px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>Current Impressed Stamp: </span>
              <strong style={{ color: 'var(--ink)' }}>{claim.status}</strong>
              {claim.status === 'Approved' && (
                <span className="font-mono" style={{ marginLeft: '6px', fontWeight: 700, color: 'var(--stamp-forest)' }}>
                  (₹{claim.approvedAmount?.toLocaleString('en-IN')})
                </span>
              )}
            </div>
            <RubberStamp status={claim.status} approvedAmount={claim.approvedAmount} date={claim.submissionDate} />
          </div>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid #C4B38A', marginBottom: '20px' }} />

        {/* CONFIRMATION TAB OR FORM */}
        {showConfirmation ? (
          <div className="animate-fade" style={{
            background: decision === 'Approved' ? 'rgba(46, 83, 52, 0.06)' : 'rgba(166, 54, 43, 0.06)',
            border: `2px solid ${decision === 'Approved' ? 'var(--stamp-forest)' : 'var(--stamp-vermilion)'}`,
            borderRadius: '6px',
            padding: '24px',
            marginBottom: '16px'
          }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontFamily: 'var(--font-stamp)',
              color: decision === 'Approved' ? 'var(--stamp-forest)' : 'var(--stamp-vermilion)',
              marginBottom: '8px',
              letterSpacing: '0.08em'
            }}>
              CONFIRM {decision === 'Approved' ? 'SANCTION' : 'REJECTION'} STAMP
            </h4>

            <p style={{ fontSize: '0.9rem', color: 'var(--ink)', marginBottom: '16px', lineHeight: '1.5' }}>
              Are you sure you want to impress the <strong>{decision === 'Approved' ? 'SANCTIONED' : 'REJECTED'}</strong> ink-stamp onto file <strong>{claimFileNo}</strong>?
            </p>

            <div style={{
              background: '#ffffff',
              border: '1px solid var(--ledger-line)',
              borderRadius: '4px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ink-soft)' }}>Claim Limit:</span>
                <span className="font-mono" style={{ fontWeight: 600 }}>₹{claim.claimAmount?.toLocaleString('en-IN')}</span>
              </div>

              {decision === 'Approved' ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stamp-forest)', fontWeight: 700 }}>
                  <span>Sanctioned Payout:</span>
                  <span className="font-mono">₹{Number(approvedAmount).toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stamp-vermilion)', fontWeight: 700 }}>
                  <span>Sanctioned Payout:</span>
                  <span>₹0 (Excluded)</span>
                </div>
              )}

              {insurerComments && (
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--ledger-line)', fontStyle: 'italic', color: 'var(--ink)' }}>
                  Clerk Note: "{insurerComments}"
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="btn btn-ghost"
              >
                Back to Edit
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleExecuteSave}
                className={`btn ${decision === 'Approved' ? 'btn-sanction' : 'btn-reject'}`}
              >
                {isSaving ? 'Impressing Stamp...' : decision === 'Approved' ? 'Confirm & Stamp SANCTIONED' : 'Confirm & Stamp REJECTED'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleOpenConfirmation}>
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">
                {isAlreadyReviewed ? 'Modify Rubber Stamp Decision & Amount' : 'Select Authorization Stamp'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  className={`btn ${decision === 'Approved' ? 'btn-sanction' : 'btn-ghost'}`}
                  onClick={() => setDecision('Approved')}
                  style={{ padding: '12px' }}
                >
                  SANCTION
                </button>

                <button
                  type="button"
                  className={`btn ${decision === 'Rejected' ? 'btn-reject' : 'btn-ghost'}`}
                  onClick={() => setDecision('Rejected')}
                  style={{ padding: '12px' }}
                >
                  REJECT
                </button>
              </div>
            </div>

            {decision === 'Approved' && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Sanctioned Reimbursement Amount (₹ INR)</label>
                  <span className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
                    Max Limit: ₹{claim.claimAmount?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <span className="font-mono" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }}>₹</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={claim.claimAmount}
                    className="input-field font-mono"
                    style={{ paddingLeft: '28px' }}
                    value={approvedAmount}
                    onChange={e => {
                      const val = e.target.value;
                      setApprovedAmount(val);
                      if (Number(val) > Number(claim.claimAmount)) {
                        setErrorMsg(`Sanctioned amount cannot exceed requested claim limit (₹${claim.claimAmount.toLocaleString('en-IN')}).`);
                      } else {
                        setErrorMsg('');
                      }
                    }}
                    required
                  />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <label className="form-label">Clerk Margin Rationale / Note</label>
              <textarea
                className="textarea-field"
                rows="3"
                placeholder={decision === 'Approved' ? 'e.g. Sanctioned per Policy Clause 4B.' : 'e.g. Cosmetic dental procedures are excluded under standard Plan B.'}
                value={insurerComments}
                onChange={e => setInsurerComments(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={onClose} className="btn btn-ghost">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`btn ${decision === 'Approved' ? 'btn-sanction' : 'btn-reject'}`}
              >
                {decision === 'Approved' ? 'SANCTION →' : 'REJECT →'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
