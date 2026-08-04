import React, { useState } from 'react';
import CustomSelect from './CustomSelect.jsx';

export default function AuthPage({ onLogin, onRegister, onQuickLogin }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { value: 'patient', label: 'Patient (Submit & Track Claims)' },
    { value: 'insurer', label: 'Insurer Officer (Review & Approve Claims)' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await onLogin(email, password);
      } else {
        if (!name) {
          setErrorMsg('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }
        await onRegister({ name, email, password, role });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickClick = async (quickEmail, quickPassword) => {
    setMode('login');
    setErrorMsg('');
    setEmail(quickEmail);
    setPassword(quickPassword);
    setIsSubmitting(true);
    try {
      await onQuickLogin(quickEmail, quickPassword);
    } catch (err) {
      setErrorMsg(err.message || 'Quick sign in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--parchment)',
      backgroundImage: `
        radial-gradient(at 15% 15%, rgba(46, 83, 52, 0.12) 0px, transparent 45%),
        radial-gradient(at 85% 85%, rgba(156, 122, 46, 0.14) 0px, transparent 45%),
        radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.4) 0px, transparent 70%)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px'
    }}>
      {/* Glassmorphism Card Container */}
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '0',
        borderRadius: '28px',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        overflow: 'hidden',
        boxShadow: `
          0 0 30px rgba(46, 83, 52, 0.2),
          0 20px 60px rgba(28, 43, 38, 0.18),
          inset 0 1.5px 0 rgba(255, 255, 255, 0.95),
          inset 0 -1px 0 rgba(184, 174, 149, 0.4)
        `,
        background: 'rgba(244, 241, 230, 0.65)',
        backdropFilter: 'blur(24px) saturate(190%)',
        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
        position: 'relative'
      }}>
        
        {/* Ambient Tubelight Glow Edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(46, 83, 52, 0.7), rgba(255, 255, 255, 0.95), rgba(46, 83, 52, 0.7), transparent)',
          boxShadow: '0 0 12px rgba(46, 83, 52, 0.7)'
        }} />

        {/* LEFT BRANDING SIDE */}
        <div style={{
          background: 'rgba(28, 43, 38, 0.92)',
          backdropFilter: 'blur(16px)',
          color: '#ffffff',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            {/* Logo Header */}
            <div style={{ marginBottom: '36px' }}>
              <img
                src="/logo.png"
                alt="Turant Insurance"
                style={{
                  height: '90px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(255,255,255,0.2))'
                }}
              />
            </div>

            {/* Hero Copy */}
            <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-display)', color: '#ffffff', lineHeight: '1.3', marginBottom: '16px', fontWeight: 700 }}>
              Official Healthcare Claims Register & Audit System
            </h2>
            <p style={{ color: 'var(--parchment)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '32px' }}>
              A precise institutional system of record connecting patient reimbursement dossiers with insurance assessment officers for digital logbook entry and rubber stamp authorization.
            </p>

            {/* Glass Badge Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#ffffff' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(6px)',
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.2)', border: '1.5px solid rgba(74, 222, 128, 0.7)', boxShadow: '0 0 8px rgba(74, 222, 128, 0.4)', flexShrink: 0 }}><span style={{ color: '#4ade80', fontWeight: 800, fontSize: '0.75rem', lineHeight: 1 }}>✓</span></span>
                <span>Log claims into official registry with file ID numbering (<span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--parchment)' }}>AC/2026/CH/004821</span>)</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(6px)',
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.2)', border: '1.5px solid rgba(74, 222, 128, 0.7)', boxShadow: '0 0 8px rgba(74, 222, 128, 0.4)', flexShrink: 0 }}><span style={{ color: '#4ade80', fontWeight: 800, fontSize: '0.75rem', lineHeight: 1 }}>✓</span></span>
                <span>Rubber stamp authorization status: SANCTIONED, REJECTED, or Clerk Note</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(6px)',
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.2)', border: '1.5px solid rgba(74, 222, 128, 0.7)', boxShadow: '0 0 8px rgba(74, 222, 128, 0.4)', flexShrink: 0 }}><span style={{ color: '#4ade80', fontWeight: 800, fontSize: '0.75rem', lineHeight: 1 }}>✓</span></span>
                <span>Encrypted role-based access for Patients & Verified Insurers</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div style={{
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(233, 229, 214, 0.2)',
            fontSize: '0.775rem',
            color: 'var(--parchment)',
            fontFamily: 'var(--font-mono)'
          }}>
            SYSTEM OF RECORD • AUTHORIZED ENTRIES ONLY
          </div>
        </div>

        {/* RIGHT AUTH FORM SIDE */}
        <div style={{ padding: '48px 40px', background: 'rgba(253, 251, 247, 0.45)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Tab Toggle: Login vs Register */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '4px',
            marginBottom: '20px',
            background: 'rgba(233, 229, 214, 0.5)',
            borderRadius: '9999px',
            border: '1px solid rgba(184, 174, 149, 0.4)'
          }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              style={{
                padding: '9px',
                borderRadius: '9999px',
                border: 'none',
                background: mode === 'login' ? '#FFFFFF' : 'transparent',
                color: mode === 'login' ? 'var(--ink)' : 'var(--ink-soft)',
                fontWeight: mode === 'login' ? 700 : 500,
                fontSize: '0.825rem',
                cursor: 'pointer',
                boxShadow: mode === 'login' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              style={{
                padding: '9px',
                borderRadius: '9999px',
                border: 'none',
                background: mode === 'register' ? '#FFFFFF' : 'transparent',
                color: mode === 'register' ? 'var(--ink)' : 'var(--ink-soft)',
                fontWeight: mode === 'register' ? 700 : 500,
                fontSize: '0.825rem',
                cursor: 'pointer',
                boxShadow: mode === 'register' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Create Account
            </button>
          </div>

          {/* Form Content */}
          <div>
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

            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ borderRadius: '9999px', paddingLeft: '18px' }}
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">{mode === 'login' ? 'Email Address or Unique Patient ID *' : 'Email Address *'}</label>
                <input
                  type="text"
                  className="input-field"
                  style={{ borderRadius: '9999px', paddingLeft: '18px' }}
                  placeholder={mode === 'login' ? 'e.g. patient@turant.com or TRNT-PAT-100482' : 'patient@turant.com'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="input-field"
                  style={{ borderRadius: '9999px', paddingLeft: '18px' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {mode === 'register' && (
                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Account Role *</label>
                  <CustomSelect
                    options={roleOptions}
                    value={role}
                    onChange={val => setRole(val)}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '0.875rem', borderRadius: '9999px' }}
              >
                {isSubmitting ? 'Authenticating...' : mode === 'login' ? 'Click to Login' : 'Create Account'}
              </button>
            </form>

            {/* Quick Demo Index Tab Helpers */}
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed var(--ledger-line)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }} className="font-mono">
                ⚡ REVIEWER QUICK INDEX TABS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleQuickClick('patient@turant.com', 'password123')}
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem', padding: '8px', fontFamily: 'var(--font-mono)', borderRadius: '9999px' }}
                >
                  Patient Demo
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleQuickClick('mahilmithranks2007@gmail.com', 'Mahil@19')}
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem', padding: '8px', fontFamily: 'var(--font-mono)', borderRadius: '9999px' }}
                >
                  Insurer (Mahil)
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
