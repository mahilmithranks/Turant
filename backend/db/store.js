import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Claim } from '../models/Claim.js';

let isMongoConnected = false;

// Initial mock data for fallback or database seeding
const initialUsers = [
  {
    name: 'Rahul Sharma',
    email: 'patient@aarogya.com',
    password: '', // will hash on init
    role: 'patient',
    createdAt: new Date('2026-07-15T10:00:00Z')
  },
  {
    name: 'Dr. Ananya Roy (Star Health)',
    email: 'insurer@aarogya.com',
    password: '', // will hash on init
    role: 'insurer',
    createdAt: new Date('2026-07-01T10:00:00Z')
  }
];


const initialClaims = [];


let memoryUsers = [];
let memoryClaims = [];

export async function initDatabase(mongoUri) {
  const defaultHash = await bcrypt.hash('password123', 10);
  
  memoryUsers = initialUsers.map(u => ({ ...u, password: defaultHash }));
  memoryClaims = [...initialClaims];

  if (!mongoUri) {
    console.log('ℹ️ No MONGO_URI provided. Running in resilient In-Memory Database Mode.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully!');
    
    // Seed MongoDB if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial users into MongoDB...');
      for (const u of memoryUsers) {
        await User.create(u);
      }
    }
    const claimCount = await Claim.countDocuments();
    if (claimCount === 0) {
      console.log('🌱 Seeding initial claims into MongoDB...');
      for (const c of memoryClaims) {
        await Claim.create(c);
      }
    }
  } catch (err) {
    isMongoConnected = false;
    console.warn(`⚠️ Could not connect to MongoDB (${err.message}). Defaulting seamlessly to In-Memory Store.`);
  }
}

export const dbStore = {
  async clearAllClaims() {
    memoryClaims = [];
    if (isMongoConnected) {
      await Claim.deleteMany({});
    }
  },

  get isConnected() {
    return isMongoConnected;
  },


  async findUserByEmail(email) {
    if (isMongoConnected) {
      return await User.findOne({ email: email.toLowerCase() });
    }
    return memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  async createUser({ name, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (isMongoConnected) {
      const newUser = await User.create({ name, email: email.toLowerCase(), password: hashedPassword, role });
      return newUser;
    }
    const newUser = {
      _id: 'usr_' + Date.now(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'patient',
      createdAt: new Date()
    };
    memoryUsers.push(newUser);
    return newUser;
  },

  async createClaim(claimData) {
    if (isMongoConnected) {
      return await Claim.create(claimData);
    }
    const newClaim = {
      _id: 'clm_' + Date.now(),
      ...claimData,
      status: 'Pending',
      submissionDate: new Date(),
      approvedAmount: null,
      insurerComments: '',
      reviewedAt: null
    };
    memoryClaims.unshift(newClaim);
    return newClaim;
  },

  async getClaims({ role, userEmail, status, minAmount, maxAmount, search }) {
    let list = [];
    if (isMongoConnected) {
      const query = {};
      if (role === 'patient' && userEmail) {
        query.email = userEmail.toLowerCase();
      }
      if (status && status !== 'All') {
        query.status = status;
      }
      if (minAmount !== undefined && minAmount !== '') {
        query.claimAmount = { ...query.claimAmount, $gte: Number(minAmount) };
      }
      if (maxAmount !== undefined && maxAmount !== '') {
        query.claimAmount = { ...query.claimAmount, $lte: Number(maxAmount) };
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      list = await Claim.find(query).sort({ submissionDate: -1 }).lean();
      return list;

    }

    // In-memory filter logic
    list = [...memoryClaims];
    if (role === 'patient' && userEmail) {
      list = list.filter(c => c.email.toLowerCase() === userEmail.toLowerCase());
    }
    if (status && status !== 'All') {
      list = list.filter(c => c.status === status);
    }
    if (minAmount !== undefined && minAmount !== '') {
      list = list.filter(c => c.claimAmount >= Number(minAmount));
    }
    if (maxAmount !== undefined && maxAmount !== '') {
      list = list.filter(c => c.claimAmount <= Number(maxAmount));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    // Sort descending by date
    list.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    return list;
  },

  async getClaimById(id) {
    if (isMongoConnected) {
      return await Claim.findById(id).lean();
    }
    return memoryClaims.find(c => c._id === id);
  },


  async updateClaimReview(id, { status, approvedAmount, insurerComments }) {
    const updateData = {
      status,
      approvedAmount: status === 'Approved' ? Number(approvedAmount) : 0,
      insurerComments: insurerComments || '',
      reviewedAt: new Date()
    };

    if (isMongoConnected) {
      return await Claim.findByIdAndUpdate(id, updateData, { new: true });
    }

    const index = memoryClaims.findIndex(c => c._id === id);
    if (index !== -1) {
      memoryClaims[index] = {
        ...memoryClaims[index],
        ...updateData
      };
      return memoryClaims[index];
    }
    return null;
  }
};
