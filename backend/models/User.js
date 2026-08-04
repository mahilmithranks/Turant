import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'insurer'], default: 'patient' },
  patientId: { type: String, unique: true, sparse: true },
  phone: { type: String, default: '' },
  dob: { type: String, default: '' },
  gender: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  address: { type: String, default: '' },
  emergencyContact: { type: String, default: '' },
  policyNumber: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
