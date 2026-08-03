import React from 'react';


export default function Navbar({ currentUser, activePatientTab, onSelectPatientTab, onLoginClick, onLogout }) {
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : '';

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* BIG LOGO ON THE LEFT (OUTSIDE NAVBAR PILL) */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center' }}>
          <img
            src="/navbar-logo.png"
            alt="Turant Insurance"
            style={{
              height: '64px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 2px 8px rgba(28, 43, 38, 0.12))'
            }}
          />
        </div>

        {/* SHRUNK NAVBAR PILL ON THE RIGHT (USER CONTROLS ONLY) */}
        <div className="navbar-pill">
          {/* Tubelight Top Glow Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(46, 83, 52, 0.6), rgba(255, 255, 255, 0.9), rgba(46, 83, 52, 0.6), transparent)',
            borderRadius: '9999px',
            boxShadow: '0 0 8px rgba(46, 83, 52, 0.6)'
          }} />

          {/* User Status & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  fontSize: '0.825rem',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(184, 174, 149, 0.5)',
                  whiteSpace: 'nowrap'
                }}>
                  <span style={{ fontWeight: 600 }}>{firstName}</span>
                  <span style={{
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    background: currentUser.role === 'insurer' ? 'var(--stamp-forest)' : 'var(--ink)',
                    color: '#ffffff',
                    padding: '2px 8px',
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
                  style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.825rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
