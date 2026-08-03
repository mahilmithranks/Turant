import React, { useState } from 'react';
import { InkwellLogoIcon } from './Icons.jsx';

export default function AuthPage({ onLogin, onRegister, onQuickLogin }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      {/* Tubelight Glassmorphism Card Container */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                padding: '10px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
              }}>
                <InkwellLogoIcon size={26} color="#ffffff" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                  Turants
                </h1>
              </div>
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
          
          {/* Tubelight Pill Tabs: Sign In / Register */}
          <div style={{
            display: 'flex',
            background: 'rgba(233, 229, 214, 0.65)',
            backdropFilter: 'blur(12px)',
            padding: '4px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            marginBottom: '24px',
            boxShadow: 'inset 0 1px 2px rgba(28, 43, 38, 0.06)'
          }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '9999px',
                border: 'none',
                background: mode === 'login' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                color: mode === 'login' ? 'var(--ink)' : 'var(--ink-soft)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: mode === 'login' ? '0 4px 12px rgba(28, 43, 38, 0.1)' : 'none',
                backdropFilter: mode === 'login' ? 'blur(8px)' : 'none'
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '9999px',
                border: 'none',
                background: mode === 'register' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                color: mode === 'register' ? 'var(--ink)' : 'var(--ink-soft)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: mode === 'register' ? '0 4px 12px rgba(28, 43, 38, 0.1)' : 'none',
                backdropFilter: mode === 'register' ? 'blur(8px)' : 'none'
              }}
            >
              Create Account
            </button>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', marginBottom: '4px' }}>
            {mode === 'login' ? 'Sign In to Register Index' : 'Register New Account'}
          </h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--ink-soft)', marginBottom: '20px' }}>
            {mode === 'login' ? 'Enter credentials to open your case dossier' : 'Choose role and register into system of record'}
          </p>

          {errorMsg && (
            <div style={{
              background: 'rgba(166, 54, 43, 0.08)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--stamp-vermilion)',
              color: 'var(--stamp-vermilion)',
              padding: '10px 14px',
              borderRadius: '12px',
              marginBottom: '16px',
              fontSize: '0.85rem'
            }}>
              {errorMsg}
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
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="input-field"
                style={{ borderRadius: '9999px', paddingLeft: '18px' }}
                placeholder="patient@aarogya.com"
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setRole('patient')}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '9999px',
                      border: `1.5px solid ${role === 'patient' ? 'var(--ink)' : 'rgba(184, 174, 149, 0.4)'}`,
                      background: role === 'patient' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--ink)',
                      fontWeight: role === 'patient' ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: role === 'patient' ? '0 4px 12px rgba(28, 43, 38, 0.12)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>🧑‍⚕️</span> Patient
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('insurer')}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '9999px',
                      border: `1.5px solid ${role === 'insurer' ? 'var(--stamp-forest)' : 'rgba(184, 174, 149, 0.4)'}`,
                      background: role === 'insurer' ? 'rgba(46, 83, 52, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(8px)',
                      color: role === 'insurer' ? 'var(--stamp-forest)' : 'var(--ink)',
                      fontWeight: role === 'insurer' ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: role === 'insurer' ? '0 4px 12px rgba(46, 83, 52, 0.15)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>🛡️</span> Insurer
                  </button>
                </div>
              </div>
            )}


            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '0.875rem', borderRadius: '9999px' }}
            >
              {isSubmitting ? 'Authenticating...' : mode === 'login' ? 'Sign In to Register' : 'Create Account'}
            </button>
          </form>

          {/* Quick Demo Index Tab Helpers */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed var(--ledger-line)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }} className="font-mono">
              ⚡ REVIEWER QUICK INDEX TABS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => onQuickLogin('patient@aarogya.com', 'password123')}
                className="btn btn-ghost"
                style={{ fontSize: '0.75rem', padding: '8px', fontFamily: 'var(--font-mono)', borderRadius: '9999px' }}
              >
                Sign in as Patient
              </button>
              <button
                type="button"
                onClick={() => onQuickLogin('insurer@aarogya.com', 'password123')}
                className="btn btn-ghost"
                style={{ fontSize: '0.75rem', padding: '8px', fontFamily: 'var(--font-mono)', borderRadius: '9999px' }}
              >
                Sign in as Insurer
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
