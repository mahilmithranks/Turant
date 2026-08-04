import React, { useState, useEffect, useRef } from 'react';
import { getPatientId } from '../utils/patientUtils.js';

export default function Navbar({ currentUser, activePatientTab, onSelectPatientTab, onLoginClick, onLogout, onOpenProfile }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : '';
  const userEmail = (currentUser?.email || '').toLowerCase();

  // Exclude insurer, mock insurer, and mock patient accounts
  const isMockAccount = userEmail === 'patient@turant.com' || 
                        userEmail === 'patient@aarogya.com' || 
                        userEmail === 'insurer@turant.com' || 
                        userEmail === 'insurer@aarogya.com' || 
                        currentUser?.role === 'insurer';

  const isRealPatient = currentUser?.role === 'patient' && !isMockAccount;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* BIG LOGO ON THE LEFT */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center' }}>
          <img
            src="/navbar-logo.png"
            alt="Turant Insurance"
            style={{
              height: '60px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* SHRUNK NAVBAR PILL ON THE RIGHT */}
        <div className="navbar-pill" ref={dropdownRef} style={{ position: 'relative' }}>
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

          {/* User Status Button & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                {/* User Info Button (Click for profile menu) */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  title="Click to view options & profile"
                  style={{
                    fontSize: '0.825rem',
                    color: 'var(--ink)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.85)',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(184, 174, 149, 0.6)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(28, 43, 38, 0.08)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{firstName}</span>
                  {currentUser.role === 'patient' && (
                    <span style={{
                      fontSize: '0.7rem',
                      background: 'rgba(46, 83, 52, 0.12)',
                      color: 'var(--stamp-forest)',
                      border: '1px solid rgba(46, 83, 52, 0.3)',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      🆔 {getPatientId(currentUser)}
                    </span>
                  )}
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
                  <span style={{ fontSize: '0.65rem', color: 'var(--ink-soft)', marginLeft: '2px' }}>
                    {isDropdownOpen ? '▲' : '▼'}
                  </span>
                </button>

                {/* Direct Sign Out Button */}
                <button
                  type="button"
                  onClick={onLogout}
                  className="btn btn-ghost"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    color: 'var(--stamp-crimson)',
                    border: '1px solid rgba(181, 61, 56, 0.3)',
                    background: 'rgba(181, 61, 56, 0.06)'
                  }}
                >
                  Sign Out
                </button>

                {/* Dropdown Menu Tab */}
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    width: '240px',
                    background: 'rgba(253, 251, 247, 0.98)',
                    backdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(184, 174, 149, 0.5)',
                    borderRadius: '16px',
                    boxShadow: '0 12px 30px rgba(28, 43, 38, 0.18)',
                    padding: '12px',
                    zIndex: 1100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {/* User Info Header */}
                    <div style={{ padding: '8px', borderBottom: '1px solid var(--ledger-line)', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                        {currentUser.email}
                      </div>
                      {currentUser.role === 'patient' && currentUser.patientId && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--stamp-forest)', fontWeight: 700, marginTop: '4px' }} className="font-mono">
                          Patient ID: {currentUser.patientId}
                        </div>
                      )}
                    </div>

                    {/* Profile Button - ONLY for real registered patient users */}
                    {isRealPatient ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          if (onOpenProfile) onOpenProfile();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: 'none',
                          background: 'rgba(46, 83, 52, 0.08)',
                          color: 'var(--stamp-forest)',
                          fontWeight: 700,
                          fontSize: '0.825rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>👤</span> My Personal Profile
                      </button>
                    ) : (
                      <div style={{ padding: '6px 8px', fontSize: '0.725rem', color: 'var(--ink-soft)' }}>
                        ℹ️ Reviewer / Demo Mode
                      </div>
                    )}

                    {/* Sign Out inside dropdown as well */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'rgba(181, 61, 56, 0.08)',
                        color: 'var(--stamp-crimson)',
                        fontWeight: 600,
                        fontSize: '0.825rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                )}
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
