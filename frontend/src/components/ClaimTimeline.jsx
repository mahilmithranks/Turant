import React from 'react';
import { RubberStamp } from './Icons.jsx';

export default function ClaimTimeline({ claim }) {
  if (!claim) return null;

  const isPending = claim.status === 'Pending';
  const isApproved = claim.status === 'Approved';
  const isRejected = claim.status === 'Rejected';
  const isDecided = isApproved || isRejected;

  const claimFileNo = `AC/2026/CH/${String(claim._id).slice(-6).toUpperCase()}`;

  const formattedSubmittedDate = new Date(claim.submissionDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const formattedReviewedDate = claim.reviewedAt
    ? new Date(claim.reviewedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : null;

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px dashed var(--ledger-line)', paddingBottom: '8px' }}>
        <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          Dossier Audit & Progress Trail
        </h4>
        <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
          File: {claimFileNo}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Stage 1: Submitted */}
        <div style={{
          borderLeft: '3px solid var(--ink)',
          paddingLeft: '12px',
          paddingBottom: '4px'
        }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }} className="font-mono">
            STAGE 1 • SUBMITTED ({formattedSubmittedDate})
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--ink)', fontWeight: 600 }}>
            Claim filed by {claim.name}
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--ink-soft)' }} className="font-mono">
            Requested Amount: ₹{claim.claimAmount?.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Stage 2: Assessment */}
        <div style={{
          borderLeft: `3px solid ${isDecided ? 'var(--ink)' : 'var(--stamp-ochre)'}`,
          paddingLeft: '12px',
          paddingBottom: '4px'
        }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }} className="font-mono">
            STAGE 2 • CLERK ASSESSMENT
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
            {isDecided ? 'Medical & bill verification completed.' : 'Verification & document assessment in progress.'}
          </div>
        </div>

        {/* Stage 3: Official Stamp & Final Decision */}
        <div style={{
          borderLeft: `3px solid ${isApproved ? 'var(--stamp-forest)' : isRejected ? 'var(--stamp-vermilion)' : 'var(--ledger-line)'}`,
          paddingLeft: '12px',
          paddingTop: '4px'
        }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }} className="font-mono">
            STAGE 3 • CASE RECORD ({formattedReviewedDate || 'PENDING'})
          </div>

          <div style={{ marginTop: '8px' }}>
            <RubberStamp status={claim.status} approvedAmount={claim.approvedAmount} date={claim.submissionDate} />
          </div>

          {claim.insurerComments && (
            <div style={{
              marginTop: '10px',
              fontSize: '0.825rem',
              color: 'var(--ink)',
              background: 'var(--parchment)',
              borderLeft: '3px solid var(--ink-soft)',
              padding: '8px 12px',
              borderRadius: '0 4px 4px 0',
              fontStyle: 'italic'
            }}>
              Clerk Note: "{claim.insurerComments}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
