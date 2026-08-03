import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './Icons.jsx';

export default function CustomSelect({ options, value, onChange, placeholder = 'Select option...', style, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        ...style
      }}
      className={className}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '8px 14px',
          background: isOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${isOpen ? 'var(--ink)' : 'rgba(184, 174, 149, 0.6)'}`,
          borderRadius: '10px',
          color: 'var(--ink)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: isOpen
            ? '0 0 0 3px rgba(28, 43, 38, 0.12), 0 4px 12px rgba(28, 43, 38, 0.08)'
            : '0 2px 6px rgba(28, 43, 38, 0.04)',
          transition: 'all 0.15s ease'
        }}
      >
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon
          size={16}
          color="var(--ink-soft)"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0
          }}
        />
      </button>

      {/* Floating Menu Popover */}
      {isOpen && (
        <div
          className="animate-fade"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 9999,
            background: 'rgba(253, 251, 247, 0.96)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(184, 174, 149, 0.8)',
            borderRadius: '12px',
            padding: '6px',
            boxShadow: `
              0 12px 32px rgba(28, 43, 38, 0.18),
              0 2px 8px rgba(28, 43, 38, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `,
            maxHeight: '220px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(46, 83, 52, 0.3) transparent'
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isSelected ? 'rgba(46, 83, 52, 0.1)' : 'transparent',
                  color: isSelected ? 'var(--stamp-forest)' : 'var(--ink)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  transition: 'all 0.12s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(233, 229, 214, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--stamp-forest)', fontWeight: 700 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
