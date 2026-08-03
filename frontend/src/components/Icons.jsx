import React from 'react';

// Inkwell & Fountain Pen Logomark
export function InkwellLogoIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z" />
      <path d="M9 9V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
      <path d="M12 13v4M10 15h4" />
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
