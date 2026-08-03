import React from 'react';
import { InkwellLogoIcon } from './Icons.jsx';

export default function Navbar({ currentUser, activePatientTab, onSelectPatientTab, onLoginClick, onLogout }) {
  return (
    <header style={{
      position: 'sticky',
      top: '12px',
      zIndex: 100,
      padding: '0 24px',
      pointerEvents: 'none'
    }}>
      {/* Floating Tubelight Glassmorphism Navbar */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        pointerEvents: 'auto',
        background: 'rgba(244, 241, 230, 0.75)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        borderRadius: '9999px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: `
          0 0 20px rgba(46, 83, 52, 0.18),
          0 10px 30px rgba(28, 43, 38, 0.15),
          inset 0 1.5px 0 rgba(255, 255, 255, 0.95),
          inset 0 -1px 0 rgba(184, 174, 149, 0.4)
        `,
        position: 'relative',
        overflow: 'hidden'
      }}>
        
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'rgba(28, 43, 38, 0.08)',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <InkwellLogoIcon size={22} color="var(--ink)" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>
              Turants
            </h1>
          </div>
        </div>



        {/* User Status & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                fontSize: '0.825rem',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.6)',
                padding: '4px 14px',
                borderRadius: '9999px',
                border: '1px solid rgba(184, 174, 149, 0.5)'
              }}>
                <span style={{ fontWeight: 600 }}>{currentUser.name}</span>
                <span style={{
                  fontSize: '0.65rem',
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
                style={{ padding: '4px 14px', fontSize: '0.775rem', borderRadius: '9999px' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="btn btn-primary" style={{ padding: '6px 18px', fontSize: '0.825rem', borderRadius: '9999px' }}>
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
