import React, { useState, useMemo } from 'react';
import { RubberStamp, SearchIcon, DocumentIcon } from './Icons.jsx';
import CustomSelect from './CustomSelect.jsx';

export default function InsurerPortal({ claims, onSelectClaimToReview, onRefreshClaims, isLoading }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const statusOptions = [
    { value: 'All', label: 'All Register Entries' },
    { value: 'Pending', label: 'Pending Stamp Only' },
    { value: 'Approved', label: 'Sanctioned Only' },
    { value: 'Rejected', label: 'Rejected Only' }
  ];

  // Filtered Claims
  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      if (statusFilter !== 'All' && claim.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mName = claim.name?.toLowerCase().includes(q);
        const mEmail = claim.email?.toLowerCase().includes(q);
        const mDesc = claim.description?.toLowerCase().includes(q);
        const mId = claim._id?.toLowerCase().includes(q);
        if (!mName && !mEmail && !mDesc && !mId) return false;
      }
      if (minAmount !== '' && claim.claimAmount < Number(minAmount)) return false;
      if (maxAmount !== '' && claim.claimAmount > Number(maxAmount)) return false;
      if (dateFrom && new Date(claim.submissionDate) < new Date(dateFrom)) return false;
      if (dateTo && new Date(claim.submissionDate) > new Date(dateTo + 'T23:59:59')) return false;

      return true;
    }).sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
  }, [claims, statusFilter, searchQuery, minAmount, maxAmount, dateFrom, dateTo]);

  const clearFilters = () => {
    setStatusFilter('All');
    setSearchQuery('');
    setMinAmount('');
    setMaxAmount('');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 24px' }}>
      
      {/* Page Heading */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', marginBottom: '4px' }}>
            Claims Assessment Register
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.875rem' }}>
            Inspect incoming medical dossiers, verify billing documents, and impress sanction/rejection rubber stamps.
          </p>
        </div>

        <button onClick={onRefreshClaims} className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>
          {isLoading ? 'Updating Register...' : 'Refresh Register'}
        </button>
      </div>

      {/* CARD CATALOG DRAWER FILTER BAR */}
      <div className="surface-register" style={{ padding: '16px', marginBottom: '24px', borderLeft: '4px solid var(--ink)', position: 'relative', zIndex: 20, overflow: 'visible' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label className="form-label" style={{ fontSize: '0.725rem' }}>Search Register / ID</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }}>
                <SearchIcon size={14} />
              </span>
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: '28px', height: '34px', fontSize: '0.85rem' }}
                placeholder="Patient, File ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="form-label" style={{ fontSize: '0.725rem' }}>Sanction Status</label>
            <CustomSelect
              options={statusOptions}
              value={statusFilter}
              onChange={val => setStatusFilter(val)}
            />
          </div>

          {/* Min Amount */}
          <div>
            <label className="form-label" style={{ fontSize: '0.725rem' }}>Min Amount (₹)</label>
            <input
              type="number"
              className="input-field font-mono"
              style={{ height: '34px', fontSize: '0.85rem' }}
              placeholder="0"
              value={minAmount}
              onChange={e => setMinAmount(e.target.value)}
            />
          </div>

          {/* Max Amount */}
          <div>
            <label className="form-label" style={{ fontSize: '0.725rem' }}>Max Amount (₹)</label>
            <input
              type="number"
              className="input-field font-mono"
              style={{ height: '34px', fontSize: '0.85rem' }}
              placeholder="100000"
              value={maxAmount}
              onChange={e => setMaxAmount(e.target.value)}
            />
          </div>

          {/* Date From */}
          <div>
            <label className="form-label" style={{ fontSize: '0.725rem' }}>Date From</label>
            <input
              type="date"
              className="input-field font-mono"
              style={{ height: '34px', fontSize: '0.775rem' }}
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
          </div>

          {/* Date To */}
          <div>
            <label className="form-label" style={{ fontSize: '0.725rem' }}>Date To</label>
            <input
              type="date"
              className="input-field font-mono"
              style={{ height: '34px', fontSize: '0.775rem' }}
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', fontSize: '0.775rem', cursor: 'pointer', textDecoration: 'underline' }}>
            Reset catalog filters
          </button>
        </div>
      </div>

      {/* LEDGER REGISTER VIEW */}
      <div className="surface-register" style={{ overflowX: 'auto' }}>
        {filteredClaims.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--ink-soft)' }}>
            <DocumentIcon size={36} color="var(--ledger-line)" />
            <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 500 }}>
              No register entries match your catalog filter.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div className="desktop-register-table">
              <table className="register-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>File Reference No.</th>
                    <th>Patient Details</th>
                    <th>Medical Description</th>
                    <th>Logged Date</th>
                    <th>Claim Amount</th>
                    <th>Status / Rubber Stamp</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.map((claim, idx) => {
                    const claimFileNo = `AC/2026/CH/${String(claim._id).slice(-6).toUpperCase()}`;

                    return (
                      <tr key={claim._id}>
                        <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
                          {claimFileNo}
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{claim.name}</div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--ink-soft)' }}>{claim.email}</div>
                        </td>
                        <td style={{ maxWidth: '260px' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {claim.description}
                          </div>
                        </td>
                        <td className="font-mono" style={{ fontSize: '0.775rem', color: 'var(--ink-soft)' }}>
                          {new Date(claim.submissionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="font-mono" style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)' }}>
                          <div>₹{claim.claimAmount?.toLocaleString('en-IN')}</div>
                          {claim.status === 'Approved' && (
                            <div style={{ fontSize: '0.725rem', color: 'var(--stamp-forest)', fontWeight: 700 }}>
                              Sanctioned: ₹{claim.approvedAmount?.toLocaleString('en-IN')}
                            </div>
                          )}
                        </td>
                        <td>
                          <RubberStamp status={claim.status} approvedAmount={claim.approvedAmount} date={claim.submissionDate} />
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => onSelectClaimToReview(claim)}
                            className={`btn ${claim.status === 'Pending' ? 'btn-primary' : 'btn-ghost'}`}
                            style={{ padding: '4px 12px', fontSize: '0.775rem' }}
                          >
                            {claim.status === 'Pending' ? 'Assess Dossier' : 'Edit Dossier'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE DOSSIER CARDS LIST VIEW */}
            <div className="mobile-claims-card-list" style={{ display: 'none', flexDirection: 'column', gap: '14px', padding: '12px' }}>
              {filteredClaims.map((claim, idx) => {
                const claimFileNo = `AC/2026/CH/${String(claim._id).slice(-6).toUpperCase()}`;

                return (
                  <div
                    key={claim._id}
                    className="surface-glass-card"
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      border: '1px solid rgba(184, 174, 149, 0.5)'
                    }}
                  >
                    {/* Header: File Ref + Stamp */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                      <div>
                        <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
                          #{String(idx + 1).padStart(2, '0')} • {claimFileNo}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--ink-soft)', marginTop: '2px' }} className="font-mono">
                          Logged: {new Date(claim.submissionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>

                      <RubberStamp status={claim.status} approvedAmount={claim.approvedAmount} date={claim.submissionDate} />
                    </div>

                    {/* Patient & Description */}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{claim.name}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--ink-soft)' }}>{claim.email}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--ink)', marginTop: '6px', fontStyle: 'italic' }}>
                        "{claim.description}"
                      </div>
                    </div>

                    {/* Claim Limit & Payout */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '10px',
                      borderTop: '1px dashed var(--ledger-line)',
                      fontSize: '0.85rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', fontWeight: 600 }}>Claim Requested</div>
                        <div className="font-mono" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>
                          ₹{claim.claimAmount?.toLocaleString('en-IN')}
                        </div>
                      </div>

                      {claim.status === 'Approved' && (
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--stamp-forest)', textTransform: 'uppercase', fontWeight: 600 }}>Sanctioned Payout</div>
                          <div className="font-mono" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--stamp-forest)' }}>
                            ₹{claim.approvedAmount?.toLocaleString('en-IN')}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Full Width Touch Button */}
                    <button
                      onClick={() => onSelectClaimToReview(claim)}
                      className={`btn ${claim.status === 'Pending' ? 'btn-primary' : 'btn-ghost'}`}
                      style={{ width: '100%', padding: '10px', fontSize: '0.85rem', borderRadius: '9999px', marginTop: '4px' }}
                    >
                      {claim.status === 'Pending' ? 'Assess Dossier →' : 'Edit Dossier decision'}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
