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

async function ensureMongoConnected() {
  if (mongoose.connection.readyState === 1) return true;
  const uri = process.env.MONGO_URI;
  if (!uri) return false;
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isMongoConnected = true;
    return true;
  } catch (err) {
    console.error('⚠️ Could not connect to MongoDB Atlas:', err.message);
    return false;
  }
}

export async function initDatabase(mongoUri) {
  const defaultHash = await bcrypt.hash('password123', 10);
  
  memoryUsers = initialUsers.map(u => ({ ...u, password: defaultHash }));
  memoryClaims = [...initialClaims];

  if (!mongoUri) {
    console.log('ℹ️ No MONGO_URI provided. Running in resilient In-Memory Database Mode.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Seed MongoDB if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial users into MongoDB Atlas users collection...');
      for (const u of memoryUsers) {
        await User.create(u);
      }
    }
    const claimCount = await Claim.countDocuments();
    if (claimCount === 0) {
      console.log('🌱 Seeding initial claims into MongoDB Atlas claims collection...');
      for (const c of memoryClaims) {
        await Claim.create(c);
      }
    }
  } catch (err) {
    isMongoConnected = false;
    console.warn(`⚠️ Could not connect to MongoDB Atlas (${err.message}). Running in resilient In-Memory Store.`);
  }
}

export const dbStore = {
  async clearAllClaims() {
    memoryClaims = [];
    const connected = await ensureMongoConnected();
    if (connected) {
      await Claim.deleteMany({});
    }
  },

  get isConnected() {
    return mongoose.connection.readyState === 1 || isMongoConnected;
  },

  async findUserByEmail(email) {
    const cleanEmail = email.toLowerCase().trim();
    const connected = await ensureMongoConnected();
    if (connected) {
      const mongoUser = await User.findOne({ email: cleanEmail }).lean();
      if (mongoUser) return mongoUser;
    }
    return memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
  },

  async createUser({ name, email, password, role }) {
    const cleanEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'patient';

    const connected = await ensureMongoConnected();
    if (connected) {
      const createdUserDoc = await User.create({
        name,
        email: cleanEmail,
        password: hashedPassword,
        role: userRole
      });
      console.log(`✅ Saved new user directly to MongoDB Atlas users collection: ${cleanEmail}`);
      const userObj = createdUserDoc.toObject();
      memoryUsers.push(userObj);
      return userObj;
    }

    const newUserObj = {
      _id: 'usr_' + Date.now(),
      name,
      email: cleanEmail,
      password: hashedPassword,
      role: userRole,
      createdAt: new Date()
    };

    memoryUsers.push(newUserObj);
    return newUserObj;
  },

  async createClaim(claimData) {
    const connected = await ensureMongoConnected();
    if (connected) {
      const createdClaim = await Claim.create(claimData);
      console.log(`✅ Saved new claim directly to MongoDB Atlas claims collection for ${claimData.email}`);
      const claimObj = createdClaim.toObject();
      return claimObj;
    }

    const newClaimObj = {
      _id: 'clm_' + Date.now(),
      ...claimData,
      status: 'Pending',
      submissionDate: new Date(),
      approvedAmount: null,
      insurerComments: '',
      reviewedAt: null
    };

    memoryClaims.unshift(newClaimObj);
    return newClaimObj;
  },

  async getClaims({ role, userEmail, status, minAmount, maxAmount, search }) {
    const connected = await ensureMongoConnected();
    if (connected) {
      const query = {};
      if (role === 'patient' && userEmail) {
        query.email = userEmail.toLowerCase().trim();
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
      const list = await Claim.find(query).sort({ submissionDate: -1 }).lean();
      return list;
    }

    // In-memory filter fallback
    let list = [...memoryClaims];
    if (role === 'patient' && userEmail) {
      list = list.filter(c => c.email.toLowerCase() === userEmail.toLowerCase().trim());
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
    list.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    return list;
  },

  async getClaimById(id) {
    const connected = await ensureMongoConnected();
    if (connected) {
      try {
        const mongoClaim = await Claim.findById(id).lean();
        if (mongoClaim) return mongoClaim;
      } catch (err) {
        // Fall back to memory store if ID is not a valid Mongo ObjectId
      }
    }
    return memoryClaims.find(c => c._id === id || String(c._id) === String(id));
  },

  async updateClaimReview(id, { status, approvedAmount, insurerComments }) {
    const updateData = {
      status,
      approvedAmount: status === 'Approved' ? Number(approvedAmount) : 0,
      insurerComments: insurerComments || '',
      reviewedAt: new Date()
    };

    const connected = await ensureMongoConnected();
    if (connected) {
      try {
        const updatedDoc = await Claim.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (updatedDoc) {
          console.log(`✅ Updated claim ${id} review decision in MongoDB Atlas`);
          return updatedDoc;
        }
      } catch (err) {
        // Fall back to memory store if ID is not a valid Mongo ObjectId
      }
    }

    const index = memoryClaims.findIndex(c => c._id === id || String(c._id) === String(id));
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
