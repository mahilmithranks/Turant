import React, { useState } from 'react';
import { RubberStamp, InkwellLogoIcon, DocumentIcon, ExternalLinkIcon } from './Icons.jsx';

export default function HomePage({ onEnterPortal, onQuickLogin }) {
  const [activeRoleTab, setActiveRoleTab] = useState('patient'); // 'patient' or 'insurer'
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
        radial-gradient(at 10% 10%, rgba(46, 83, 52, 0.12) 0px, transparent 50%),
        radial-gradient(at 90% 20%, rgba(196, 179, 138, 0.22) 0px, transparent 55%),
        radial-gradient(at 50% 85%, rgba(28, 43, 38, 0.08) 0px, transparent 65%)
      `,
      color: 'var(--ink)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* TOP LANDING NAVBAR */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(253, 251, 247, 0.82)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(184, 174, 149, 0.4)',
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Logo & Brand Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--stamp-forest), var(--ink))',
              padding: '8px 12px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(46, 83, 52, 0.25)'
            }}>
              <img src="/logo.png" alt="Turants Logo" style={{ height: '36px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}>
                Turants
              </div>
              <div style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-soft)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                Institutional Claims Ledger
              </div>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--ink-soft)'
          }} className="desktop-only">
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--stamp-forest)'} onMouseLeave={e => e.target.style.color = 'inherit'}>Features</a>
            <a href="#roles" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--stamp-forest)'} onMouseLeave={e => e.target.style.color = 'inherit'}>Role Workspaces</a>
            <a href="#ledger" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--stamp-forest)'} onMouseLeave={e => e.target.style.color = 'inherit'}>Live Ledger</a>
            <a href="#security" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--stamp-forest)'} onMouseLeave={e => e.target.style.color = 'inherit'}>Security</a>
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(46, 83, 52, 0.08)',
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--stamp-forest)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }} />
              API SERVICE ONLINE
            </div>

            <button
              onClick={() => onEnterPortal('login')}
              className="btn btn-ghost"
              style={{ borderRadius: '9999px', padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Sign In
            </button>
            <button
              onClick={() => onEnterPortal('register')}
              className="btn btn-primary"
              style={{ borderRadius: '9999px', padding: '8px 20px', fontSize: '0.85rem' }}
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
          {/* Tagline Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(233, 229, 214, 0.7)',
            border: '1px solid rgba(184, 174, 149, 0.6)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--stamp-forest)',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
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
                boxShadow: '0 8px 24px rgba(46, 83, 52, 0.25)'
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
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(184, 174, 149, 0.6)'
              }}
            >
              {isDemoLoading ? 'Loading Demo...' : '⚡ Try Insurer Demo (Mahil)'}
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

        {/* Right Hero Interactive Glass Card Mockup */}
        <div style={{ position: 'relative' }}>
          {/* Ambient Decorative Backglow */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(circle at 50% 50%, rgba(46, 83, 52, 0.25), transparent 70%)',
            filter: 'blur(30px)',
            zIndex: 0
          }} />

          {/* Live Card Container */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(244, 241, 230, 0.75)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '28px',
            boxShadow: `
              0 20px 50px rgba(28, 43, 38, 0.15),
              inset 0 1.5px 0 rgba(255, 255, 255, 0.95),
              inset 0 -1px 0 rgba(184, 174, 149, 0.3)
            `
          }} className="animate-fade-in">

            {/* Header Badge & Dossier ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="font-mono" style={{
                  background: 'rgba(46, 83, 52, 0.1)',
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

            {/* Dossier Body Preview */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.65)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(184, 174, 149, 0.3)',
              marginBottom: '20px',
              position: 'relative'
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

              {/* Rubber Stamp Imprint Graphic */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed rgba(184, 174, 149, 0.5)', paddingTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--stamp-forest)', fontWeight: 600 }}>
                  <DocumentIcon size={16} color="var(--stamp-forest)" />
                  <span>apollo_discharge_summary.pdf</span>
                </div>
                <RubberStamp status="Approved" approvedAmount={42000} date={new Date()} />
              </div>
            </div>

            {/* Live Audit Note Footer */}
            <div style={{
              background: 'rgba(46, 83, 52, 0.06)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(46, 83, 52, 0.15)',
              fontSize: '0.8rem',
              color: 'var(--ink)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--stamp-forest)', marginBottom: '2px' }}>
                🛡️ Assessment Officer Audit Note:
              </div>
              <div style={{ fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '0.775rem' }}>
                "Verified itemized bill receipt and discharge summary. Sanctioned ₹42,000 under policy limits."
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* METRICS & TRUST STATS GRID */}
      <section style={{
        background: 'rgba(28, 43, 38, 0.94)',
        backdropFilter: 'blur(16px)',
        color: '#ffffff',
        padding: '48px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#4ade80', marginBottom: '4px' }}>&lt; 0.4s</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Claim Clearance Speed</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8 }}>Optimistic state engine update</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--parchment)', marginBottom: '4px' }}>100%</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tamper-Evident Ledger</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8 }}>Base64 receipt URI persistence</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#4ade80', marginBottom: '4px' }}>256-bit</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>JWT Access Control</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8 }}>Strict role-based isolation</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--parchment)', marginBottom: '4px' }}>₹0</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Hidden Processing Overhead</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--parchment)', opacity: 0.8 }}>Transparent claims management</div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE SECTION */}
      <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
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
          {/* Feature 1 */}
          <div style={{
            background: 'rgba(244, 241, 230, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            border: '1px solid rgba(184, 174, 149, 0.4)',
            padding: '32px',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(46, 83, 52, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
              📄
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Optimistic Dossier Submission
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Patients can lodge reimbursement claims instantly with uploaded receipts. Claims are assigned unique file reference numbers (<span className="font-mono">AC/2026/CH/...</span>) with zero screen lag.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{
            background: 'rgba(244, 241, 230, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            border: '1px solid rgba(184, 174, 149, 0.4)',
            padding: '32px',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(156, 122, 46, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
              ✒️
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Official Rubber Stamp Authorization
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Insurance assessment officers audit documents, enter approved payout caps, and imprint authentic green <span style={{ color: 'var(--stamp-forest)', fontWeight: 700 }}>SANCTIONED</span> or red <span style={{ color: 'var(--stamp-crimson)', fontWeight: 700 }}>REJECTED</span> rubber stamps.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{
            background: 'rgba(244, 241, 230, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            border: '1px solid rgba(184, 174, 149, 0.4)',
            padding: '32px',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(28, 43, 38, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
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

      {/* ROLE EXPERIENCE TOGGLE SHOWCASE */}
      <section id="roles" style={{
        background: 'rgba(233, 229, 214, 0.4)',
        borderTop: '1px solid rgba(184, 174, 149, 0.4)',
        borderBottom: '1px solid rgba(184, 174, 149, 0.4)',
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stamp-forest)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              TAILORED WORKSPACES
            </div>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--ink)' }}>
              Designed for Patients & Insurance Officers
            </h2>

            {/* Role Switcher Pills */}
            <div style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid rgba(184, 174, 149, 0.5)',
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

          {/* Active Role Content Box */}
          <div style={{
            background: 'rgba(253, 251, 247, 0.9)',
            borderRadius: '24px',
            border: '1px solid rgba(184, 174, 149, 0.5)',
            padding: '40px',
            boxShadow: '0 12px 36px rgba(28, 43, 38, 0.08)'
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
                <div style={{ background: 'rgba(244, 241, 230, 0.8)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(184, 174, 149, 0.4)' }}>
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
                <div style={{ background: 'rgba(28, 43, 38, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(28, 43, 38, 0.15)' }}>
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

      {/* FINAL LANDING CTA BANNER */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--stamp-forest), var(--ink))',
          borderRadius: '28px',
          padding: '60px 32px',
          color: '#ffffff',
          boxShadow: '0 20px 50px rgba(46, 83, 52, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '16px', color: '#ffffff' }}>
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
                color: 'var(--ink)'
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
        borderTop: '1px solid rgba(184, 174, 149, 0.4)',
        background: 'rgba(244, 241, 230, 0.7)',
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
