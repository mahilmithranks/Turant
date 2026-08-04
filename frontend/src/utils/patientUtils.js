/**
 * Utility function to compute a guaranteed unique Patient ID for any user
 */
export function getPatientId(user) {
  if (!user) return '';
  if (user.patientId && String(user.patientId).startsWith('TRNT-PAT-')) {
    return user.patientId;
  }

  const seed = String(user.email || user.id || user._id || user.name || 'patient').toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const num = 100000 + (Math.abs(hash) % 900000);
  return `TRNT-PAT-${num}`;
}
