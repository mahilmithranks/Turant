import React, { useState } from 'react';
import { getFileUrl } from '../config.js';

export default function DocumentInspectorModal({ isOpen, onClose, documentUrl, documentName }) {
  if (!isOpen || !documentUrl) return null;

  const [zoomLevel, setZoomLevel] = useState(1);
  const fullDocUrl = getFileUrl(documentUrl);
  const isImage = /^data:image\//i.test(documentUrl) || /\.(jpg|jpeg|png|webp|gif)($|\?)/i.test(documentUrl);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12, 22, 19, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2000,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(253, 251, 247, 0.98)',
          borderRadius: '20px',
          border: '1.5px solid rgba(184, 174, 149, 0.5)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(233, 229, 214, 0.7)',
          borderBottom: '1px solid var(--ledger-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>
                {documentName || 'Medical Proof Document'}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)' }} className="font-mono">
                INLINE DOCUMENT INSPECTION MODE (NO DOWNLOAD REQUIRED)
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isImage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FFFFFF', padding: '2px 8px', borderRadius: '9999px', border: '1px solid var(--ledger-line)' }}>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="btn btn-ghost"
                  style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '9999px' }}
                  title="Zoom Out"
                >
                  ➖
                </button>
                <span className="font-mono" style={{ fontSize: '0.75rem', padding: '0 6px', fontWeight: 600 }}>
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="btn btn-ghost"
                  style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '9999px' }}
                  title="Zoom In"
                >
                  ➕
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="btn btn-ghost"
                  style={{ padding: '4px 8px', fontSize: '0.7rem', borderRadius: '9999px' }}
                >
                  Reset
                </button>
              </div>
            )}

            <a
              href={fullDocUrl}
              download={documentName || 'medical-proof-document'}
              className="btn btn-ghost"
              style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '9999px' }}
            >
              📥 Save Copy
            </a>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary"
              style={{ padding: '6px 18px', fontSize: '0.825rem', borderRadius: '9999px' }}
            >
              Close Inspector ✕
            </button>
          </div>
        </div>

        {/* Viewport Area */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#1A2320'
        }}>
          {isImage ? (
            <div style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.15s ease-out',
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={fullDocUrl}
                alt={documentName || 'Attached Document'}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}
              />
            </div>
          ) : (
            <iframe
              src={fullDocUrl}
              title="Full Document Viewer"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '8px',
                background: '#FFFFFF'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
