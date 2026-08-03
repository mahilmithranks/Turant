import React from 'react';

// Official Turants Medical Shield Cross Logomark
export function InkwellLogoIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M50 15 L82 28 V50 C82 70 50 84 50 84 C50 84 18 70 18 50 V28 Z" fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round" />
      <path d="M50 32 V64 M34 48 H66" stroke={color} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}


// Rubber Stamp Graphic Component
export function RubberStamp({ status, approvedAmount, date }) {
  if (status === 'Approved') {
    return (
      <div className="stamp-badge sanctioned animate-stamp">
        <div>SANCTIONED</div>
        {approvedAmount !== null && approvedAmount !== undefined && (
          <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '1px' }}>
            ₹{Number(approvedAmount).toLocaleString('en-IN')}
          </div>
        )}
      </div>
    );
  }

  if (status === 'Rejected') {
    return (
      <div className="stamp-badge rejected animate-stamp">
        <div>REJECTED</div>
        <div style={{ fontSize: '0.65rem', marginTop: '1px' }}>EXCLUDED</div>
      </div>
    );
  }

  // Pending status in old clerk-note style
  const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '';
  return (
    <div className="pending-clerk-note">
      ✍️ waiting for approval{formattedDate ? `, ${formattedDate}` : ''}
    </div>
  );


}

// Single stroke hand-drawn SVG icons
export function DocumentIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function SearchIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
