import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar.jsx';
import AuthPage from './components/AuthPage.jsx';
import HomePage from './components/HomePage.jsx';
import UserProfileModal from './components/UserProfileModal.jsx';

// Lazy-load heavy portals — only fetched when user actually logs in
const PatientPortal = lazy(() => import('./components/PatientPortal.jsx'));
const InsurerPortal = lazy(() => import('./components/InsurerPortal.jsx'));
const ClaimReviewModal = lazy(() => import('./components/ClaimReviewModal.jsx'));

import { API_BASE_URL } from './config.js';

export default function App() {
  // Synchronously initialize user from localStorage to eliminate reload flickering
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('turant_user') || localStorage.getItem('aarogya_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [authToken, setAuthToken] = useState(
    localStorage.getItem('turant_token') || localStorage.getItem('aarogya_token') || ''
  );
  const [isInitializingAuth, setIsInitializingAuth] = useState(() => {
    const token = localStorage.getItem('turant_token') || localStorage.getItem('aarogya_token');
    const user = localStorage.getItem('turant_user') || localStorage.getItem('aarogya_user');
    return !!token && !user;
  });

  const [viewMode, setViewMode] = useState('home'); // 'home' or 'auth' when unauthenticated
  const [authInitialMode, setAuthInitialMode] = useState('login'); // 'login' or 'register'

  const [claims, setClaims] = useState([]);
  const [isLoadingClaims, setIsLoadingClaims] = useState(false);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [selectedClaimForReview, setSelectedClaimForReview] = useState(null);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [patientTab, setPatientTab] = useState('submit'); // 'submit' or 'history'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

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
        localStorage.setItem('turant_user', JSON.stringify(data.user));
      } else {
        localStorage.removeItem('turant_token');
        localStorage.removeItem('turant_user');
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

  // Fetch Claims API with RBAC headers & request cancellation
  const fetchClaims = useCallback(async () => {
    if (!authToken || !currentUser) return;
    setIsLoadingClaims(true);
    const controller = new AbortController();
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims?role=${activePortal}`, {
        headers: { Authorization: `Bearer ${authToken}` },
        signal: controller.signal
      });
      const data = await res.json();
      if (res.ok) {
        setClaims(data.claims || []);
      } else if (res.status === 401) {
        localStorage.removeItem('turant_token');
        localStorage.removeItem('turant_user');
        localStorage.removeItem('aarogya_token');
        localStorage.removeItem('aarogya_user');
        setAuthToken('');
        setCurrentUser(null);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Fetch claims error:', err);
      }
    } finally {
      setIsLoadingClaims(false);
    }
    return () => controller.abort();
  }, [authToken, currentUser, activePortal]);

  useEffect(() => {
    const cancel = fetchClaims();
    return () => {
      if (typeof cancel === 'function') cancel();
    };
  }, [fetchClaims]);

  // Auth Handlers
  const handleLogin = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data = {};
    try {
      data = await res.json();
    } catch (e) {
      if (!res.ok) throw new Error(`Server returned error status (${res.status}).`);
    }
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    localStorage.setItem('turant_token', data.token);
    localStorage.setItem('turant_user', JSON.stringify(data.user));
    setAuthToken(data.token);
    setCurrentUser(data.user);
  };

  const handleRegister = async (userData) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    let data = {};
    try {
      data = await res.json();
    } catch (e) {
      if (!res.ok) throw new Error(`Server returned error status (${res.status}).`);
    }
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    localStorage.setItem('turant_token', data.token);
    localStorage.setItem('turant_user', JSON.stringify(data.user));
    setAuthToken(data.token);
    setCurrentUser(data.user);
  };

  const handleQuickLogin = async (roleOrEmail, password = null) => {
    let email = roleOrEmail;
    let defaultRole = 'patient';
    let defaultName = 'Rahul Sharma';
    let targetPassword = password;

    if (roleOrEmail === 'mahilmithranks2007@gmail.com') {
      email = 'mahilmithranks2007@gmail.com';
      defaultRole = 'insurer';
      defaultName = 'Mahil Mithran (Star Health Insurer)';
      targetPassword = password || 'Mahil@19';
    } else if (roleOrEmail === 'insurer' || roleOrEmail === 'insurer@turant.com' || roleOrEmail === 'insurer@aarogya.com') {
      email = 'insurer@turant.com';
      defaultRole = 'insurer';
      defaultName = 'Dr. Ananya Roy (Star Health)';
      targetPassword = password || 'password123';
    } else if (roleOrEmail === 'patient' || roleOrEmail === 'patient@turant.com' || roleOrEmail === 'patient@aarogya.com') {
      email = 'patient@turant.com';
      defaultRole = 'patient';
      defaultName = 'Rahul Sharma';
      targetPassword = password || 'password123';
    } else {
      targetPassword = password || 'password123';
    }

    try {
      await handleLogin(email, targetPassword);
    } catch (err1) {
      // Try legacy email domain fallback
      const legacyEmail = email.endsWith('@turant.com')
        ? email.replace('@turant.com', '@aarogya.com')
        : email;
      try {
        await handleLogin(legacyEmail, targetPassword);
      } catch (err2) {
        // If account does not exist yet in DB, create it on-the-fly
        await handleRegister({
          name: defaultName,
          email: email,
          password: targetPassword,
          role: defaultRole
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('turant_token');
    localStorage.removeItem('turant_user');
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
      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        if (!res.ok) throw new Error(`Server returned error status (${res.status}).`);
      }
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit claim');
      }
      if (data.claim) {
        setClaims(prev => [data.claim, ...prev]);
      } else {
        await fetchClaims();
      }
      return data.claim;
    } finally {
      setIsSubmittingClaim(false);
    }
  };

  const handleSaveReview = async (claimIdOrReviewData, maybeReviewData) => {
    let claimId = selectedClaimForReview?._id;
    let reviewData = claimIdOrReviewData;

    if (typeof claimIdOrReviewData === 'string') {
      claimId = claimIdOrReviewData;
      reviewData = maybeReviewData;
    }

    if (!claimId) return;
    setIsSavingReview(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims/${claimId}/review`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(reviewData)
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        if (!res.ok) {
          throw new Error(`Server returned error status (${res.status}). Please check network connection or backend availability.`);
        }
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update claim review');
      }
      if (data.claim) {
        setClaims(prev => prev.map(c => (c._id === claimId || String(c._id) === String(claimId)) ? data.claim : c));
      } else {
        await fetchClaims();
      }
    } finally {
      setIsSavingReview(false);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    setIsSavingProfile(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile details.');
      }

      setCurrentUser(data.user);
      localStorage.setItem('turant_user', JSON.stringify(data.user));
    } finally {
      setIsSavingProfile(false);
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
          <img src="/logo.png" alt="Turants Logo" style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 600 }}>
          Opening Turants Ledger...
        </div>
      </div>
    );
  }

  // Unauthenticated: Render Landing HomePage or Auth Screen
  if (!currentUser) {
    if (viewMode === 'home') {
      return (
        <HomePage
          onEnterPortal={(mode) => {
            setAuthInitialMode(mode || 'login');
            setViewMode('auth');
          }}
          onQuickLogin={handleQuickLogin}
        />
      );
    }

    return (
      <AuthPage
        initialMode={authInitialMode}
        onBackToHome={() => setViewMode('home')}
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
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Body content */}
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px', color: 'var(--ink-soft)', fontFamily: 'var(--font-display)' }}>Loading portal…</div>}>
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
        </Suspense>
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
      <Suspense fallback={null}>
        <ClaimReviewModal
          claim={selectedClaimForReview}
          onClose={() => setSelectedClaimForReview(null)}
          onSaveReview={handleSaveReview}
          isSaving={isSavingReview}
        />
      </Suspense>

      {/* Patient Personal Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onSaveProfile={handleUpdateProfile}
        isSaving={isSavingProfile}
      />
    </div>
  );
}
