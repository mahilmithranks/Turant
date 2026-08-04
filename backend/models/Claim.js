import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  claimReference: { type: String, unique: true, sparse: true },
  patientId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  claimAmount: { type: Number, required: true, index: true },
  description: { type: String, required: true },
  documentUrl: { type: String, default: '' },
  documentName: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending', index: true },
  submissionDate: { type: Date, default: Date.now, index: true },
  approvedAmount: { type: Number, default: null },
  insurerComments: { type: String, default: '' },
  reviewedAt: { type: Date, default: null }
});

// Compound Index for high-performance insurer filtering
claimSchema.index({ status: 1, submissionDate: -1 });
claimSchema.index({ email: 1, submissionDate: -1 });

export const Claim = mongoose.model('Claim', claimSchema);
