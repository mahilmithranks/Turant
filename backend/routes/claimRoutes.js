import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { dbStore } from '../db/store.js';
import { authenticateToken, authorizeRoles } from './authRoutes.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'document-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max limit
});

// Submit a new Claim (Patient only)
router.post('/', authenticateToken, authorizeRoles('patient'), upload.single('document'), async (req, res) => {
  try {
    const { name, email, claimAmount, description } = req.body;

    if (!name || !email || !claimAmount || !description) {
      return res.status(400).json({ error: 'All fields (Name, Email, Claim Amount, Description) are mandatory.' });
    }

    if (isNaN(claimAmount) || Number(claimAmount) <= 0) {
      return res.status(400).json({ error: 'Please enter a valid positive claim amount.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Uploading a medical document or receipt proof is mandatory.' });
    }


    let documentUrl = '';
    let documentName = '';

    if (req.file) {
      documentUrl = `/uploads/${req.file.filename}`;
      documentName = req.file.originalname;
    }

    // Force user email from authenticated JWT token for strict data integrity
    const patientEmail = req.user.email.toLowerCase();

    const claim = await dbStore.createClaim({
      patientId: req.user.id,
      name,
      email: patientEmail,
      claimAmount: Number(claimAmount),
      description,
      documentUrl,
      documentName
    });

    res.status(201).json({
      message: 'Claim submitted successfully!',
      claim
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get claims with filters (Strict RBAC: Patients only see their own claims; Insurers view all claims)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, minAmount, maxAmount, search } = req.query;

    const claims = await dbStore.getClaims({
      role: req.user.role,
      userEmail: req.user.role === 'patient' ? req.user.email : null,
      status,
      minAmount,
      maxAmount,
      search
    });

    res.json({ claims, isMongo: dbStore.isConnected, userRole: req.user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single claim details (Patient ownership check)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const claim = await dbStore.getClaimById(req.params.id);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found.' });
    }

    // Role safety check: patients can only view their own claims
    if (req.user.role === 'patient' && claim.email.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(403).json({ error: 'Access denied. Patients can only access their own claims.' });
    }

    res.json({ claim });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Review/Manage Claim (Insurer only)
router.patch('/:id/review', authenticateToken, authorizeRoles('insurer'), async (req, res) => {
  try {
    const { status, approvedAmount, insurerComments } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be either Approved or Rejected.' });
    }

    const targetClaim = await dbStore.getClaimById(req.params.id);
    if (!targetClaim) {
      return res.status(404).json({ error: 'Claim not found.' });
    }

    if (status === 'Approved') {
      if (approvedAmount === undefined || isNaN(approvedAmount) || Number(approvedAmount) <= 0) {
        return res.status(400).json({ error: 'Valid approved amount greater than zero is required when approving a claim.' });
      }
      if (Number(approvedAmount) > Number(targetClaim.claimAmount)) {
        return res.status(400).json({
          error: `Approved amount (₹${approvedAmount}) cannot exceed the requested claim amount limit (₹${targetClaim.claimAmount}).`
        });
      }
    }


    const updatedClaim = await dbStore.updateClaimReview(req.params.id, {
      status,
      approvedAmount: status === 'Approved' ? Number(approvedAmount) : 0,
      insurerComments: insurerComments || ''
    });

    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found.' });
    }

    res.json({
      message: `Claim successfully ${status.toLowerCase()}!`,
      claim: updatedClaim
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear all claims (For clean testing)
router.delete('/clear-all', async (req, res) => {
  try {
    await dbStore.clearAllClaims();
    res.json({ message: 'All old claim data cleared successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


