import React, { useState } from 'react';
import { ShieldLeafIcon } from './Icons.jsx';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister, onQuickLogin }) {
  if (!isOpen) return null;

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
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(13, 27, 38, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }} onClick={onClose}>
      <div className="surface-card animate-fade-in" style={{ width: '100%', maxWidth: '384px', padding: '32px' }} onClick={e => e.stopPropagation()}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <ShieldLeafIcon size={32} color="var(--navy-600)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--navy-700)' }}>
            Turants
          </h3>


          <p style={{ fontSize: '0.8rem', color: 'var(--navy-600)' }}>
            {mode === 'login' ? 'Sign in to access case files' : 'Register a new account'}
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(194, 86, 74, 0.08)',
            border: '1px solid var(--coral-400)',
            color: 'var(--coral-400)',
            padding: '8px 12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '0.8rem'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={{ marginBottom: '14px' }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Rahul Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === 'register' && (
            <div style={{ marginBottom: '14px' }}>
              <label className="form-label">Account Role</label>
              <select
                className="select-field"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="patient">Patient (Submit & Track Claims)</option>
                <option value="insurer">Insurer (Review & Approve Claims)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            {isSubmitting ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.825rem', color: 'var(--navy-600)' }}>
          {mode === 'login' ? (
            <p>
              No account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMsg(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--navy-600)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--navy-600)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Demo Accounts Helper Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--navy-100)', margin: '20px 0 16px 0' }} />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--navy-600)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
            Testing / Reviewer Quick Credentials
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => onQuickLogin('patient@aarogya.com', 'password123')}
              className="btn btn-ghost"
              style={{ fontSize: '0.75rem', padding: '6px' }}
            >
              Demo Patient
            </button>
            <button
              type="button"
              onClick={() => onQuickLogin('insurer@aarogya.com', 'password123')}
              className="btn btn-ghost"
              style={{ fontSize: '0.75rem', padding: '6px' }}
            >
              Demo Insurer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
