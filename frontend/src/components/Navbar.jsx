import React from 'react';


export default function Navbar({ currentUser, activePatientTab, onSelectPatientTab, onLoginClick, onLogout }) {
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : '';

  return (
    <header className="navbar-header">
      {/* Floating Tubelight Glassmorphism Navbar */}
      <div className="navbar-pill">
        
        {/* Tubelight Top Glow Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(46, 83, 52, 0.6), rgba(255, 255, 255, 0.9), rgba(46, 83, 52, 0.6), transparent)',
          borderRadius: '9999px',
          boxShadow: '0 0 8px rgba(46, 83, 52, 0.6)'
        }} />

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Turant Insurance" style={{ height: '36px', objectFit: 'contain', display: 'block' }} />
        </div>

        {/* User Status & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                fontSize: '0.775rem',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.6)',
                padding: '4px 10px',
                borderRadius: '9999px',
                border: '1px solid rgba(184, 174, 149, 0.5)',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ fontWeight: 600 }}>{firstName}</span>
                <span style={{
                  fontSize: '0.6rem',
                  textTransform: 'uppercase',
                  background: currentUser.role === 'insurer' ? 'var(--stamp-forest)' : 'var(--ink)',
                  color: '#ffffff',
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {currentUser.role}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="btn btn-ghost"
                style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
