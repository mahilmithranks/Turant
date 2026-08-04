import React, { useState } from 'react';
import { RubberStamp, InkwellLogoIcon, DocumentIcon, ExternalLinkIcon } from './Icons.jsx';

export default function HomePage({ onEnterPortal, onQuickLogin }) {
  const [activeRoleTab, setActiveRoleTab] = useState('patient'); // 'patient' or 'insurer'
  const [previewStatus, setPreviewStatus] = useState('Approved'); // 'Approved', 'Pending', 'Rejected'
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleQuickDemoClick = async (roleEmail, password) => {
    setIsDemoLoading(true);
    try {
      await onQuickLogin(roleEmail, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--parchment)',
      backgroundImage: `
        radial-gradient(circle at 15% 15%, rgba(46, 83, 52, 0.18) 0px, transparent 45%),
        radial-gradient(circle at 85% 25%, rgba(196, 179, 138, 0.35) 0px, transparent 50%),
        radial-gradient(circle at 50% 65%, rgba(28, 43, 38, 0.12) 0px, transparent 60%),
        radial-gradient(circle at 20% 85%, rgba(46, 83, 52, 0.14) 0px, transparent 55%)
      `,
      color: 'var(--ink)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* STICKY GLASS NAVIGATION NAVBAR */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(253, 251, 247, 0.72)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 20px rgba(28, 43, 38, 0.04)',
        padding: '14px 24px'
      }}>
        {/* Ambient Tubelight Glow Edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(46, 83, 52, 0.7), rgba(255, 255, 255, 0.95), rgba(46, 83, 52, 0.7), transparent)',
          boxShadow: '0 0 10px rgba(46, 83, 52, 0.7)'
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Logo & Brand Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/logo.png"
              alt="Turant Insurance"
              style={{
                height: '60px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                filter: 'brightness(0)'
              }}
            />
          </div>

          {/* Center Glass Links */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(244, 241, 230, 0.5)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '4px 12px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--ink-soft)'
          }} className="desktop-only">
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none', padding: '6px 14px', borderRadius: '9999px', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--stamp-forest)'; e.target.style.background = 'rgba(255, 255, 255, 0.8)'; }} onMouseLeave={e => { e.target.style.color = 'inherit'; e.target.style.background = 'transparent'; }}>Features</a>
            <a href="#roles" style={{ color: 'inherit', textDecoration: 'none', padding: '6px 14px', borderRadius: '9999px', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--stamp-forest)'; e.target.style.background = 'rgba(255, 255, 255, 0.8)'; }} onMouseLeave={e => { e.target.style.color = 'inherit'; e.target.style.background = 'transparent'; }}>Role Workspaces</a>
            <a href="#ledger" style={{ color: 'inherit', textDecoration: 'none', padding: '6px 14px', borderRadius: '9999px', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--stamp-forest)'; e.target.style.background = 'rgba(255, 255, 255, 0.8)'; }} onMouseLeave={e => { e.target.style.color = 'inherit'; e.target.style.background = 'transparent'; }}>Live Ledger</a>
            <a href="#security" style={{ color: 'inherit', textDecoration: 'none', padding: '6px 14px', borderRadius: '9999px', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--stamp-forest)'; e.target.style.background = 'rgba(255, 255, 255, 0.8)'; }} onMouseLeave={e => { e.target.style.color = 'inherit'; e.target.style.background = 'transparent'; }}>Security</a>
          </nav>

          {/* Right Glass Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onEnterPortal('login')}
              className="btn btn-ghost"
              style={{
                borderRadius: '9999px',
                padding: '8px 18px',
                fontSize: '0.85rem',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.85)'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => onEnterPortal('register')}
              className="btn btn-primary"
              style={{
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '0.85rem',
                boxShadow: '0 4px 14px rgba(46, 83, 52, 0.25)'
              }}
            >
              Get Started →
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '72px 24px 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '48px',
        alignItems: 'center'
      }}>
        {/* Left Hero Copy */}
        <div>
          {/* Frosted Glass Tagline Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--stamp-forest)',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(46, 83, 52, 0.08)'
          }}>
            <span style={{ fontSize: '0.9rem' }}>⚡</span> OFFICIAL HEALTHCARE REIMBURSEMENT PLATFORM
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'var(--ink)',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: '20px'
          }}>
            Instant Claims Clearance with <span style={{
              background: 'linear-gradient(135deg, var(--stamp-forest), #1C2B26)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Rubber Stamp Verification</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.65,
            marginBottom: '36px',
            maxWidth: '540px'
          }}>
            Turants connects patient reimbursement dossiers directly with insurance assessment officers. Enjoy zero-delay claim lodgement, real-time audit trails, and official rubber stamp sanctioning in seconds.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '32px' }}>
            <button
              onClick={() => onEnterPortal('login')}
              className="btn btn-primary"
              style={{
                borderRadius: '9999px',
                padding: '14px 28px',
                fontSize: '0.95rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(46, 83, 52, 0.28)'
              }}
            >
              Access Claims Portal →
            </button>

            <button
              disabled={isDemoLoading}
              onClick={() => handleQuickDemoClick('mahilmithranks2007@gmail.com', 'Mahil@19')}
              className="btn btn-ghost"
              style={{
                borderRadius: '9999px',
                padding: '14px 24px',
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 16px rgba(28, 43, 38, 0.05)'
              }}
            >
              {isDemoLoading ? 'Loading Demo...' : '⚡ Try Insurer Demo'}
            </button>
          </div>

          {/* Trust Highlights */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '0.825rem',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--stamp-forest)', fontWeight: 700 }}>✓</span> 256-bit Encrypted JWT
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--stamp-forest)', fontWeight: 700 }}>✓</span> Base64 Document Storage
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--stamp-forest)', fontWeight: 700 }}>✓</span> MongoDB Atlas Sync
            </div>
          </div>
        </div>

        {/* Right Hero Interactive Glassmorphism Card */}
        <div id="ledger" style={{ position: 'relative' }}>
          {/* Ambient Decorative Backglow Orbs */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(circle at 50% 50%, rgba(46, 83, 52, 0.28), transparent 70%)',
            filter: 'blur(32px)',
            zIndex: 0
          }} />

          {/* 3D Glassmorphism Live Card Container */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(244, 241, 230, 0.65)',
            backdropFilter: 'blur(28px) saturate(200%)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            padding: '24px',
            boxShadow: `
              0 24px 60px rgba(28, 43, 38, 0.18),
              0 4px 16px rgba(28, 43, 38, 0.08),
              inset 0 1.5px 0 rgba(255, 255, 255, 0.95),
              inset 0 -1px 0 rgba(184, 174, 149, 0.4)
            `
          }} className="animate-fade-in">

            {/* Interactive Live Stamp Switcher Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(16px)',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              marginBottom: '18px'
            }}>
              <button
                type="button"
                onClick={() => setPreviewStatus('Approved')}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: previewStatus === 'Approved' ? 'var(--stamp-forest)' : 'transparent',
                  color: previewStatus === 'Approved' ? '#ffffff' : 'var(--ink)',
                  fontWeight: previewStatus === 'Approved' ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>●</span> Sanctioned
              </button>
              <button
                type="button"
                onClick={() => setPreviewStatus('Pending')}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: previewStatus === 'Pending' ? 'rgba(196, 179, 138, 0.8)' : 'transparent',
                  color: previewStatus === 'Pending' ? '#1C2B26' : 'var(--ink)',
                  fontWeight: previewStatus === 'Pending' ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>✍️</span> Pending
              </button>
              <button
                type="button"
                onClick={() => setPreviewStatus('Rejected')}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: previewStatus === 'Rejected' ? 'var(--stamp-crimson)' : 'transparent',
                  color: previewStatus === 'Rejected' ? '#ffffff' : 'var(--ink)',
                  fontWeight: previewStatus === 'Rejected' ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>✕</span> Rejected
              </button>
            </div>

            {/* Header Badge & Dossier ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span className="font-mono" style={{
                  background: 'rgba(46, 83, 52, 0.12)',
                  color: 'var(--stamp-forest)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.775rem',
                  fontWeight: 700
                }}>
                  AC/2026/CH/482109
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 500 }}>
                Patient ID: <span className="font-mono" style={{ fontWeight: 700, color: 'var(--ink)' }}>TRNT-PAT-100482</span>
              </div>
            </div>

            {/* Dossier Body Frosted Panel */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '20px',
              border: `1px solid ${previewStatus === 'Approved' ? 'rgba(46, 83, 52, 0.35)' : previewStatus === 'Rejected' ? 'rgba(181, 61, 56, 0.35)' : 'rgba(184, 174, 149, 0.5)'}`,
              marginBottom: '16px',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>Rahul Sharma</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>patient@turant.com</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Requested Payout</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--stamp-forest)', fontFamily: 'var(--font-mono)' }}>₹45,500</div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                Apollo Hospital - Emergency Appendectomy & 3-day recovery stay.
              </p>

              {/* Dynamic Rubber Stamp Graphic */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed rgba(184, 174, 149, 0.5)', paddingTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--stamp-forest)', fontWeight: 600 }}>
                  <DocumentIcon size={16} color="var(--stamp-forest)" />
                  <span>apollo_discharge_summary.pdf</span>
                </div>
                <RubberStamp status={previewStatus} approvedAmount={previewStatus === 'Approved' ? 42000 : null} date={new Date()} />
              </div>
            </div>

            {/* Dynamic Live Audit Note Footer */}
            <div style={{
              background: previewStatus === 'Approved' ? 'rgba(46, 83, 52, 0.08)' : previewStatus === 'Rejected' ? 'rgba(181, 61, 56, 0.08)' : 'rgba(196, 179, 138, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: `1px solid ${previewStatus === 'Approved' ? 'rgba(46, 83, 52, 0.2)' : previewStatus === 'Rejected' ? 'rgba(181, 61, 56, 0.2)' : 'rgba(196, 179, 138, 0.4)'}`,
              fontSize: '0.8rem',
              color: 'var(--ink)',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ fontWeight: 700, color: previewStatus === 'Approved' ? 'var(--stamp-forest)' : previewStatus === 'Rejected' ? 'var(--stamp-crimson)' : 'var(--ink)', marginBottom: '2px' }}>
                🛡️ Assessment Officer Audit Note:
              </div>
              <div style={{ fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '0.775rem' }}>
                {previewStatus === 'Approved' && '"Verified itemized bill receipt and discharge summary. Sanctioned ₹42,000 under policy limits."'}
                {previewStatus === 'Pending' && '"Awaiting audit review by Star Health Assessment Officer. Dossier queued in active ledger register."'}
                {previewStatus === 'Rejected' && '"Claim exceeds elective coverage limits. Discharge summary missing mandatory itemized breakdown."'}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* METRICS & TRUST STATS GLASS GRID */}
      <section id="security" style={{
        background: 'rgba(28, 43, 38, 0.88)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        color: '#ffffff',
        padding: '56px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 16px 48px rgba(28, 43, 38, 0.25)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          textAlign: 'center'
        }}>
          {/* Glass Metric Card 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '24px 16px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#4ade80', marginBottom: '4px' }}>50+</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Partner Health Insurers</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8, marginTop: '2px' }}>Star Health, Care & Top TPAs</div>
          </div>

          {/* Glass Metric Card 2 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '24px 16px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--parchment)', marginBottom: '4px' }}>99.8%</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Automated Audit Compliance</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8, marginTop: '2px' }}>Itemized bill & receipt verification</div>
          </div>

          {/* Glass Metric Card 3 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '24px 16px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#4ade80', marginBottom: '4px' }}>&lt; 1 min</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Officer Assessment Cycle</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8, marginTop: '2px' }}>Instant rubber stamp sanctioning</div>
          </div>

          {/* Glass Metric Card 4 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '24px 16px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--parchment)', marginBottom: '4px' }}>₹0</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Fraudulent Payout Leakage</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8, marginTop: '2px' }}>Strict policy limit validation</div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE GLASS SECTION */}
      <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
            ENGINEERED FOR EXCELLENCE
          </div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
            Institutional Features Built for Speed and Trust
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px'
        }}>
          {/* Glass Feature 1 */}
          <div style={{
            background: 'rgba(244, 241, 230, 0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            padding: '32px',
            boxShadow: '0 12px 32px rgba(28, 43, 38, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(46, 83, 52, 0.12)', border: '1px solid rgba(46, 83, 52, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
              📄
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Optimistic Dossier Submission
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Patients can lodge reimbursement claims instantly with uploaded receipts. Claims are assigned unique file reference numbers (<span className="font-mono">AC/2026/CH/...</span>) with zero screen lag.
            </p>
          </div>

          {/* Glass Feature 2 */}
          <div style={{
            background: 'rgba(244, 241, 230, 0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            padding: '32px',
            boxShadow: '0 12px 32px rgba(28, 43, 38, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(156, 122, 46, 0.14)', border: '1px solid rgba(156, 122, 46, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
              ✒️
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Official Rubber Stamp Authorization
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Insurance assessment officers audit documents, enter approved payout caps, and imprint authentic green <span style={{ color: 'var(--stamp-forest)', fontWeight: 700 }}>SANCTIONED</span> or red <span style={{ color: 'var(--stamp-crimson)', fontWeight: 700 }}>REJECTED</span> rubber stamps.
            </p>
          </div>

          {/* Glass Feature 3 */}
          <div style={{
            background: 'rgba(244, 241, 230, 0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            padding: '32px',
            boxShadow: '0 12px 32px rgba(28, 43, 38, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(28, 43, 38, 0.12)', border: '1px solid rgba(28, 43, 38, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
              🛡️
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Resilient Dual-Storage Engine
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Uploaded receipts are encoded directly as Base64 Data URIs into MongoDB Atlas, backed by an in-memory store that guarantees 100% server uptime even under network outages.
            </p>
          </div>
        </div>
      </section>

      {/* ROLE EXPERIENCE TOGGLE GLASS SHOWCASE */}
      <section id="roles" style={{
        background: 'rgba(233, 229, 214, 0.45)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.7)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
        padding: '88px 24px'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              TAILORED WORKSPACES
            </div>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--ink)' }}>
              Designed for Patients & Insurance Officers
            </h2>

            {/* Glass Role Switcher Pills */}
            <div style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(16px)',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 16px rgba(28, 43, 38, 0.05)',
              marginTop: '24px'
            }}>
              <button
                type="button"
                onClick={() => setActiveRoleTab('patient')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeRoleTab === 'patient' ? 'var(--stamp-forest)' : 'transparent',
                  color: activeRoleTab === 'patient' ? '#ffffff' : 'var(--ink)',
                  fontWeight: activeRoleTab === 'patient' ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Patient Experience
              </button>
              <button
                type="button"
                onClick={() => setActiveRoleTab('insurer')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeRoleTab === 'insurer' ? 'var(--ink)' : 'transparent',
                  color: activeRoleTab === 'insurer' ? '#ffffff' : 'var(--ink)',
                  fontWeight: activeRoleTab === 'insurer' ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Insurer Assessment Desk
              </button>
            </div>
          </div>

          {/* Active Role Frosted Glass Box */}
          <div style={{
            background: 'rgba(253, 251, 247, 0.75)',
            backdropFilter: 'blur(24px) saturate(190%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            padding: '40px',
            boxShadow: '0 16px 40px rgba(28, 43, 38, 0.09), inset 0 1.5px 0 rgba(255, 255, 255, 0.95)'
          }}>
            {activeRoleTab === 'patient' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
                    Effortless Dossier Lodgement & Live Status Tracking
                  </h3>
                  <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
                    <li>Automatic Unique Patient ID generation (<span className="font-mono">TRNT-PAT-100482</span>)</li>
                    <li>Drag & drop itemized medical bill upload (PDF, PNG, JPG)</li>
                    <li>Real-time claim status tracking with instant timestamping</li>
                    <li>Personal profile editing & emergency contact management</li>
                  </ul>
                  <button
                    onClick={() => handleQuickDemoClick('patient@turant.com', 'password123')}
                    className="btn btn-primary"
                    style={{ borderRadius: '9999px', marginTop: '20px', padding: '10px 22px' }}
                  >
                    Try Patient Portal Demo →
                  </button>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(16px)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.9)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)', marginBottom: '8px' }}>
                    PATIENT DASHBOARD HIGHLIGHT
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Claim #AC/2026/CH/100482</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '12px' }}>₹45,500 • Emergency Surgery</div>
                  <div style={{ background: 'rgba(46, 83, 52, 0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--stamp-forest)', fontWeight: 600 }}>
                    ● SANCTIONED: ₹42,000 Approved
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
                    Institutional Audit Desk & Rubber Stamp Authorizations
                  </h3>
                  <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
                    <li>Complete active claims register with status and amount filters</li>
                    <li>Full document inspector modal to inspect uploaded hospital bills</li>
                    <li>Enforced validation: Approved payout caps cannot exceed claim limits</li>
                    <li>Instant rubber stamp imprinting (<span style={{ color: 'var(--stamp-forest)', fontWeight: 700 }}>SANCTIONED</span> / <span style={{ color: 'var(--stamp-crimson)', fontWeight: 700 }}>REJECTED</span>)</li>
                  </ul>
                  <button
                    onClick={() => handleQuickDemoClick('mahilmithranks2007@gmail.com', 'Mahil@19')}
                    className="btn btn-primary"
                    style={{ borderRadius: '9999px', marginTop: '20px', padding: '10px 22px', background: 'var(--ink)' }}
                  >
                    Try Insurer Audit Demo (Mahil) →
                  </button>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(16px)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.9)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                    INSURER AUDIT DESK HIGHLIGHT
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Officer: Mahil Mithran</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '12px' }}>mahilmithranks2007@gmail.com</div>
                  <RubberStamp status="Approved" approvedAmount={42000} date={new Date()} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DEDICATED LIVE LEDGER GLASS SECTION */}
      <section id="ledger" style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
            REAL-TIME AUDIT REGISTER
          </div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
            Live Claims Ledger & Rubber Stamp Trail
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', marginTop: '12px', lineHeight: 1.6 }}>
            Explore how reimbursement dossiers move seamlessly from patient submission to official assessment officer sanctioning.
          </p>
        </div>

        {/* Live Ledger Glass Table Mockup Frame */}
        <div style={{
          background: 'rgba(244, 241, 230, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(28, 43, 38, 0.1), inset 0 1.5px 0 rgba(255, 255, 255, 0.95)'
        }}>
          {/* Table Header Bar */}
          <div style={{
            background: 'rgba(28, 43, 38, 0.92)',
            backdropFilter: 'blur(16px)',
            color: '#ffffff',
            padding: '16px 24px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }} />
              LIVE SYSTEM OF RECORD REGISTER
            </div>
            <div className="font-mono" style={{ fontSize: '0.775rem', color: 'var(--parchment)' }}>
              SYNCED WITH MONGODB ATLAS
            </div>
          </div>

          {/* Sample Frosted Glass Ledger Rows */}
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Row 1 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              alignItems: 'center',
              boxShadow: '0 4px 14px rgba(28, 43, 38, 0.03)'
            }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)' }}>AC/2026/CH/482109</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>Rahul Sharma</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--ink-soft)' }}>TRNT-PAT-100482</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Description</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)', fontWeight: 500 }}>Apollo Emergency Appendectomy</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Requested Payout</div>
                <div className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>₹45,500</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <RubberStamp status="Approved" approvedAmount={42000} date={new Date()} />
              </div>
            </div>

            {/* Row 2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              alignItems: 'center',
              boxShadow: '0 4px 14px rgba(28, 43, 38, 0.03)'
            }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)' }}>AC/2026/CH/893201</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>Priya Verma</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--ink-soft)' }}>TRNT-PAT-209841</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Description</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)', fontWeight: 500 }}>Max Healthcare Cataract Surgery</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Requested Payout</div>
                <div className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>₹28,000</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <RubberStamp status="Pending" date={new Date()} />
              </div>
            </div>

            {/* Row 3 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              alignItems: 'center',
              boxShadow: '0 4px 14px rgba(28, 43, 38, 0.03)'
            }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)' }}>AC/2026/CH/310492</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>Vikram Singh</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--ink-soft)' }}>TRNT-PAT-394812</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Description</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)', fontWeight: 500 }}>Elective Cosmetic Consultation</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Requested Payout</div>
                <div className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>₹15,000</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <RubberStamp status="Rejected" date={new Date()} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DEDICATED SECURITY & COMPLIANCE DARK GLASS SECTION */}
      <section id="security" style={{
        background: 'rgba(28, 43, 38, 0.94)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        color: '#ffffff',
        padding: '88px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 60px rgba(28, 43, 38, 0.3)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              INSTITUTIONAL SECURITY
            </div>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
              Cryptographic Integrity & Tamper-Evident Storage
            </h2>
            <p style={{ color: 'var(--parchment)', opacity: 0.8, fontSize: '0.95rem', marginTop: '12px' }}>
              Built with bank-grade encryption protocols ensuring complete data privacy and audit compliance for health insurers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px'
          }}>
            {/* Security Glass Card 1 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '20px' }}>
                🔑
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                256-Bit JWT Cryptographic Auth
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--parchment)', opacity: 0.8, lineHeight: 1.6 }}>
                Every request carries an encrypted JWT bearer token signed with secret salt keys, preventing session hijacking and unauthorized API access.
              </p>
            </div>

            {/* Security Glass Card 2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(196, 179, 138, 0.18)', border: '1px solid rgba(196, 179, 138, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '20px' }}>
                📦
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                Base64 Data URI Persistence
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--parchment)', opacity: 0.8, lineHeight: 1.6 }}>
                Medical receipts and hospital discharge summaries are converted directly into immutable Base64 Data URIs stored inside MongoDB Atlas for 100% data retention.
              </p>
            </div>

            {/* Security Glass Card 3 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '20px' }}>
                🛡️
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                Strict Role-Based Isolation (RBAC)
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--parchment)', opacity: 0.8, lineHeight: 1.6 }}>
                Patients can strictly only view and track their own claims. Insurance Assessment Officers gain full audit ledger access with enforced payout cap validation.
              </p>
            </div>

            {/* Security Glass Card 4 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(196, 179, 138, 0.18)', border: '1px solid rgba(196, 179, 138, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '20px' }}>
                ⚡
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                Zero-Downtime Memory Core
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--parchment)', opacity: 0.8, lineHeight: 1.6 }}>
                A resilient in-memory database store backs the MongoDB Atlas cloud connection, ensuring continuous API operations even during internet or database maintenance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL LANDING CTA GLASS BANNER */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 24px', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(46, 83, 52, 0.92), rgba(28, 43, 38, 0.98))',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '64px 32px',
          color: '#ffffff',
          boxShadow: '0 28px 70px rgba(46, 83, 52, 0.32), inset 0 1.5px 0 rgba(255, 255, 255, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '16px', color: '#ffffff' }}>
            Ready to Experience Instant Claims Clearance?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--parchment)', maxWidth: '580px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Join patient reimbursement officers and insurance assessment teams using Turants for zero-delay claims processing.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onEnterPortal('register')}
              className="btn btn-primary"
              style={{
                borderRadius: '9999px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 700,
                background: '#ffffff',
                color: 'var(--ink)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}
            >
              Create Free Account →
            </button>
            <button
              onClick={() => onEnterPortal('login')}
              className="btn btn-ghost"
              style={{
                borderRadius: '9999px',
                padding: '14px 28px',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              Sign In to Existing Portal
            </button>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL LANDING FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.7)',
        background: 'rgba(244, 241, 230, 0.65)',
        backdropFilter: 'blur(20px)',
        padding: '32px 24px',
        fontSize: '0.85rem',
        color: 'var(--ink-soft)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Turants Platform</span> &copy; 2026 • Official Healthcare Claims Register
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            SYSTEM OF RECORD • REAL-TIME AUDIT TRAIL
          </div>
        </div>
      </footer>

    </div>
  );
}
