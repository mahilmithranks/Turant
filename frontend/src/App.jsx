import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import PatientPortal from './components/PatientPortal.jsx';
import InsurerPortal from './components/InsurerPortal.jsx';
import ClaimReviewModal from './components/ClaimReviewModal.jsx';
import AuthPage from './components/AuthPage.jsx';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('aarogya_token') || '');
  const [claims, setClaims] = useState([]);
  const [isLoadingClaims, setIsLoadingClaims] = useState(false);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [selectedClaimForReview, setSelectedClaimForReview] = useState(null);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [patientTab, setPatientTab] = useState('submit'); // 'submit' or 'history'

  // Active portal automatically determined by authenticated user role
  const activePortal = currentUser?.role === 'insurer' ? 'insurer' : 'patient';

  // Initialize or fetch user profile on token change
  useEffect(() => {
    if (authToken) {
      fetchProfile(authToken);
    }
  }, [authToken]);

  const fetchProfile = async (token) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      } else {
        localStorage.removeItem('aarogya_token');
        setAuthToken('');
        setCurrentUser(null);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  // Fetch Claims API with RBAC headers
  const fetchClaims = useCallback(async () => {
    if (!authToken || !currentUser) return;
    setIsLoadingClaims(true);
    try {
      const res = await fetch(`/api/claims?role=${activePortal}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (res.ok) {
        setClaims(data.claims || []);
      } else if (res.status === 401) {
        localStorage.removeItem('aarogya_token');
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
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    localStorage.setItem('aarogya_token', data.token);
    setAuthToken(data.token);
    setCurrentUser(data.user);
  };

  const handleRegister = async (userData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    localStorage.setItem('aarogya_token', data.token);
    setAuthToken(data.token);
    setCurrentUser(data.user);
  };

  const handleQuickLogin = async (email, password) => {
    await handleLogin(email, password);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('aarogya_token');
    setAuthToken('');
    setCurrentUser(null);
    setClaims([]);
  };

  // Submit Claim Handler (Patient role)
  const handleSubmitClaim = async (formData) => {
    setIsSubmittingClaim(true);
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit claim');
      }
      await fetchClaims();
    } finally {
      setIsSubmittingClaim(false);
    }
  };

  // Review Claim Handler (Insurer role)
  const handleSaveReview = async (claimId, reviewData) => {
    setIsSavingReview(true);
    try {
      const res = await fetch(`/api/claims/${claimId}/review`, {
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

  // Unauthenticated: Render Full-Page Insurance Login & Signup Screen
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
      {/* Navigation Header with Tubelight Glassmorphic Nav Buttons */}
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
