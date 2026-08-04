import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Claim } from '../models/Claim.js';

let isMongoConnected = false;

export function generatePatientId(seed = '') {
  let hash = 0;
  const str = String(seed || '').toLowerCase().trim();
  if (str) {
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
  } else {
    hash = Math.floor(Math.random() * 1000000);
  }
  const absHash = Math.abs(hash);
  const uniqueNum = 100000 + (absHash % 900000);
  return `TRNT-PAT-${uniqueNum}`;
}

export function generateClaimReference() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `AC/2026/CH/${randomNum}`;
}

// Initial mock data for fallback or database seeding
const initialUsers = [
  {
    name: 'Rahul Sharma',
    email: 'patient@turant.com',
    password: '', // will hash as password123
    role: 'patient',
    patientId: 'TRNT-PAT-100482',
    createdAt: new Date('2026-07-15T10:00:00Z')
  },
  {
    name: 'Dr. Ananya Roy (Star Health)',
    email: 'insurer@turant.com',
    password: '', // will hash as password123
    role: 'insurer',
    createdAt: new Date('2026-07-01T10:00:00Z')
  },
  {
    name: 'Mahil Mithran (Star Health Insurer)',
    email: 'mahilmithranks2007@gmail.com',
    password: 'Mahil@19',
    role: 'insurer',
    createdAt: new Date('2026-08-01T10:00:00Z')
  }
];

const initialClaims = [];

let memoryUsers = [];
let memoryClaims = [];

let lastConnectAttempt = 0;
let lastConnectFailed = false;

async function ensureMongoConnected() {
  const state = mongoose.connection.readyState;
  if (state === 1 || state === 2) return true;
  const uri = process.env.MONGO_URI;
  if (!uri) return false;

  // Fail fast if previous connection attempt failed within last 15s to keep API responses <1ms
  if (lastConnectFailed && (Date.now() - lastConnectAttempt < 15000)) {
    return false;
  }

  lastConnectAttempt = Date.now();
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 2,
      family: 4
    });
    isMongoConnected = true;
    lastConnectFailed = false;
    return true;
  } catch (err) {
    lastConnectFailed = true;
    return false;
  }
}

export async function initDatabase(mongoUri) {
  const defaultHash = await bcrypt.hash('password123', 10);
  
  memoryUsers = await Promise.all(initialUsers.map(async u => ({
    ...u,
    password: u.password ? await bcrypt.hash(u.password, 10) : defaultHash
  })));
  memoryClaims = [...initialClaims];

  if (!mongoUri) {
    console.log('ℹ️ No MONGO_URI provided. Running in resilient In-Memory Database Mode.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000,
      socketTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 2,
      family: 4
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Seed MongoDB if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial users into MongoDB Atlas users collection...');
      for (const u of memoryUsers) {
        await User.create(u);
      }
    } else {
      // Ensure mahilmithranks2007@gmail.com exists in Mongo as Insurer
      const mahilInMongo = await User.findOne({ email: 'mahilmithranks2007@gmail.com' });
      if (!mahilInMongo) {
        const mahilHash = await bcrypt.hash('Mahil@19', 10);
        await User.create({
          name: 'Mahil Mithran (Star Health Insurer)',
          email: 'mahilmithranks2007@gmail.com',
          password: mahilHash,
          role: 'insurer'
        });
        console.log('🌱 Created insurer account mahilmithranks2007@gmail.com in MongoDB Atlas');
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

  async findUserByEmail(identifier) {
    if (!identifier) return null;
    const rawInput = identifier.trim();
    const cleanEmail = rawInput.toLowerCase();
    const upperPatientId = rawInput.toUpperCase();
    const aliasEmail = cleanEmail.endsWith('@aarogya.com')
      ? cleanEmail.replace('@aarogya.com', '@turant.com')
      : (cleanEmail.endsWith('@turant.com') ? cleanEmail.replace('@turant.com', '@aarogya.com') : null);

    const connected = await ensureMongoConnected();
    let userObj = null;
    if (connected) {
      const mongoUser = await User.findOne({
        $or: [
          { email: cleanEmail },
          { patientId: upperPatientId },
          { patientId: rawInput },
          ...(aliasEmail ? [{ email: aliasEmail }] : [])
        ]
      }).lean();

      if (mongoUser) {
        userObj = mongoUser;
      }

      if (userObj) {
        if (userObj.role === 'patient' && !userObj.patientId) {
          const generatedId = generatePatientId(userObj.email || userObj._id);
          await User.findByIdAndUpdate(userObj._id, { patientId: generatedId });
          userObj.patientId = generatedId;
        }
        return userObj;
      }
    }

    userObj = memoryUsers.find(u => 
      u.email.toLowerCase() === cleanEmail ||
      (u.patientId && (u.patientId.toUpperCase() === upperPatientId || u.patientId === rawInput)) ||
      (aliasEmail && u.email.toLowerCase() === aliasEmail)
    );

    if (userObj && userObj.role === 'patient' && !userObj.patientId) {
      userObj.patientId = generatePatientId(userObj.email || userObj._id);
    }
    return userObj;
  },

  async createUser({ name, email, password, role }) {
    const cleanEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'patient';
    const patientId = userRole === 'patient' ? generatePatientId(cleanEmail) : undefined;

    const connected = await ensureMongoConnected();
    if (connected) {
      const createdUserDoc = await User.create({
        name,
        email: cleanEmail,
        password: hashedPassword,
        role: userRole,
        patientId
      });
      console.log(`✅ Saved new user directly to MongoDB Atlas users collection (${cleanEmail}) with Patient ID: ${patientId || 'N/A'}`);
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
      patientId,
      createdAt: new Date()
    };

    memoryUsers.push(newUserObj);
    return newUserObj;
  },

  async updateUserProfile(userId, { name, phone, dob, gender, bloodGroup, address, emergencyContact, policyNumber }) {
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (dob !== undefined) updateData.dob = dob;
    if (gender !== undefined) updateData.gender = gender;
    if (bloodGroup !== undefined) updateData.bloodGroup = bloodGroup;
    if (address !== undefined) updateData.address = address;
    if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
    if (policyNumber !== undefined) updateData.policyNumber = policyNumber;

    const connected = await ensureMongoConnected();
    if (connected) {
      try {
        const updatedDoc = await User.findByIdAndUpdate(userId, updateData, { new: true }).lean();
        if (updatedDoc) return updatedDoc;
      } catch (err) {}
    }

    const index = memoryUsers.findIndex(u => u._id === userId || String(u._id) === String(userId));
    if (index !== -1) {
      memoryUsers[index] = { ...memoryUsers[index], ...updateData };
      return memoryUsers[index];
    }
    return null;
  },

  async createClaim(claimData) {
    if (!claimData.claimReference) {
      claimData.claimReference = generateClaimReference();
    }

    const connected = await ensureMongoConnected();
    if (connected) {
      const createdClaim = await Claim.create(claimData);
      console.log(`✅ Saved new claim directly to MongoDB Atlas claims collection for ${claimData.email}`);
      const claimObj = createdClaim.toObject();
      return claimObj;
    }

    const newClaimObj = {
      _id: 'clm_' + Date.now() + Math.round(Math.random() * 1000),
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
