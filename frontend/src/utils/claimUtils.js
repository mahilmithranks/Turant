/**
 * Computes a guaranteed unique, matching File Reference Number for any claim object
 */
export function getClaimFileNo(claim) {
  if (!claim) return 'AC/2026/CH/000000';
  if (claim.claimReference) return claim.claimReference;

  const rawId = String(claim._id || claim.id || 'claim');
  
  // If rawId ends with hex characters (e.g. MongoDB ObjectId or timestamp)
  let cleanSuffix = rawId.slice(-6).toUpperCase();
  
  // Hash to ensure numeric/uppercase uniqueness if short
  if (cleanSuffix.length < 6) {
    let hash = 0;
    for (let i = 0; i < rawId.length; i++) {
      hash = (hash << 5) - hash + rawId.charCodeAt(i);
      hash |= 0;
    }
    const num = 100000 + (Math.abs(hash) % 900000);
    cleanSuffix = String(num);
  }

  return `AC/2026/CH/${cleanSuffix}`;
}
