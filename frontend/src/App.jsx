import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import PatientPortal from './components/PatientPortal.jsx';
import InsurerPortal from './components/InsurerPortal.jsx';
import ClaimReviewModal from './components/ClaimReviewModal.jsx';
import AuthPage from './components/AuthPage.jsx';
import { InkwellLogoIcon } from './components/Icons.jsx';
import { API_BASE_URL } from './config.js';

export default function App() {
  // Synchronously initialize user from localStorage to eliminate reload flickering
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('aarogya_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [authToken, setAuthToken] = useState(localStorage.getItem('aarogya_token') || '');
  const [isInitializingAuth, setIsInitializingAuth] = useState(() => {
    return !!localStorage.getItem('aarogya_token') && !localStorage.getItem('aarogya_user');
  });

  const [claims, setClaims] = useState([]);
  const [isLoadingClaims, setIsLoadingClaims] = useState(false);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [selectedClaimForReview, setSelectedClaimForReview] = useState(null);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [patientTab, setPatientTab] = useState('submit'); // 'submit' or 'history'

  // Active portal automatically determined by authenticated user role
  const activePortal = currentUser?.role === 'insurer' ? 'insurer' : 'patient';

  // Fetch or re-verify user profile on token change
  useEffect(() => {
    if (authToken) {
      fetchProfile(authToken);
    } else {
      setIsInitializingAuth(false);
    }
  }, [authToken]);

  const fetchProfile = async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        localStorage.setItem('aarogya_user', JSON.stringify(data.user));
      } else {
        localStorage.removeItem('aarogya_token');
        localStorage.removeItem('aarogya_user');
        setAuthToken('');
        setCurrentUser(null);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    } finally {
      setIsInitializingAuth(false);
    }
  };

  // Fetch Claims API with RBAC headers
  const fetchClaims = useCallback(async () => {
    if (!authToken || !currentUser) return;
    setIsLoadingClaims(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims?role=${activePortal}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (res.ok) {
        setClaims(data.claims || []);
      } else if (res.status === 401) {
        localStorage.removeItem('aarogya_token');
        localStorage.removeItem('aarogya_user');
        setAuthToken('');
        setCurrentUser(null);
      }
    } catch (err) {
      console.error('Fetch claims error:', err);
    } finally {
      setIsLoadingClaims(false);
    }
  }, [authToken, currentUser, activePortal]);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  // Auth Handlers
  const handleLogin = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    localStorage.setItem('aarogya_token', data.token);
    localStorage.setItem('aarogya_user', JSON.stringify(data.user));
    setAuthToken(data.token);
    setCurrentUser(data.user);
  };

  const handleRegister = async (userData) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    localStorage.setItem('aarogya_token', data.token);
    localStorage.setItem('aarogya_user', JSON.stringify(data.user));
    setAuthToken(data.token);
    setCurrentUser(data.user);
  };

  const handleQuickLogin = async (role) => {
    const email = role === 'insurer' ? 'insurer@aarogya.com' : 'patient@aarogya.com';
    const password = 'password123';
    await handleLogin(email, password);
  };

  const handleLogout = () => {
    localStorage.removeItem('aarogya_token');
    localStorage.removeItem('aarogya_user');
    setAuthToken('');
    setCurrentUser(null);
    setClaims([]);
  };

  const handleSubmitClaim = async (formData) => {
    setIsSubmittingClaim(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit claim');
      }
      await fetchClaims();
      return data.claim;
    } finally {
      setIsSubmittingClaim(false);
    }
  };

  const handleSaveReview = async (reviewData) => {
    if (!selectedClaimForReview) return;
    setIsSavingReview(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims/${selectedClaimForReview._id}/review`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(reviewData)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update claim review');
      }
      await fetchClaims();
    } finally {
      setIsSavingReview(false);
    }
  };

  // Smooth Loading Screen while verifying Auth Token
  if (isInitializingAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--parchment)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}>
        <div style={{
          background: 'rgba(28, 43, 38, 0.08)',
          padding: '16px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} className="animate-pulse-glow">
          <InkwellLogoIcon size={36} color="var(--ink)" />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 600 }}>
          Opening Turants Ledger...
        </div>
      </div>
    );
  }

  // Unauthenticated: Render Full-Page Login & Signup Screen
  if (!currentUser) {
    return (
      <AuthPage
        onLogin={handleLogin}
        onRegister={handleRegister}
        onQuickLogin={handleQuickLogin}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        activePatientTab={patientTab}
        onSelectPatientTab={(tab) => setPatientTab(tab)}
        onLoginClick={() => handleLogout()}
        onLogout={handleLogout}
      />

      {/* Main Body content */}
      <main style={{ flex: 1 }}>
        {activePortal === 'patient' ? (
          <PatientPortal
            claims={claims}
            currentUser={currentUser}
            onSubmitClaim={handleSubmitClaim}
            isSubmitting={isSubmittingClaim}
            activeTab={patientTab}
            onTabChange={(tab) => setPatientTab(tab)}
          />
        ) : (
          <InsurerPortal
            claims={claims}
            onSelectClaimToReview={claim => setSelectedClaimForReview(claim)}
            onRefreshClaims={fetchClaims}
            isLoading={isLoadingClaims}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        borderTop: '1px solid var(--ledger-line)',
        color: 'var(--ink-soft)',
        fontSize: '0.8rem',
        background: 'rgba(244, 241, 230, 0.5)'
      }}>
        Turants Platform &copy; 2026 • Instant System of Record
      </footer>

      {/* Review Modal for Insurer */}
      <ClaimReviewModal
        claim={selectedClaimForReview}
        onClose={() => setSelectedClaimForReview(null)}
        onSaveReview={handleSaveReview}
        isSaving={isSavingReview}
      />
    </div>
  );
}
