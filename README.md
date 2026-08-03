# Minimal Claims Management Platform (AarogyaCare)

A full-stack, minimal Claims Management Platform built for patients to submit and track healthcare reimbursement claims, and for insurers to review, filter, and approve/reject claims with comments and approved amounts.

---

## 🌟 Key Features

### 1. Patient Side Portal
- **Submit a Claim**: Form to capture Patient Name, Email, Claim Amount (₹), Description, and File Attachment (Receipt or Prescription PNG/JPG/PDF).
- **Track Claims Dashboard**: Live status view showing claim status (`Pending`, `Approved`, `Rejected`), Submission Date, Approved Amount, Insurer Comments, and uploaded proof document link.

### 2. Insurer Side Portal
- **Claims Dashboard & Filtering**: Real-time filtering by status (`Pending`, `Approved`, `Rejected`), Claim Amount range (Min/Max ₹), Search string (Patient Name, Email, Description), and Submission Date sorting.
- **KPI Metrics Overview**: Summary cards displaying Total Claims, Pending Reviews, Total Approved Value (₹), and Rejection metrics.
- **Claim Review Panel**: Modal interface to review uploaded medical documents, approve or reject claims, specify custom approved reimbursement amounts, and leave comments for the patient.

### 3. Authentication & Storage Resilience
- **JWT Authentication**: Role-based access control (`patient` vs `insurer`).
- **Database Resilience**: Configured with MongoDB Atlas integration. If MongoDB is unavailable or unreachable, the system automatically falls back to an embedded in-memory database store so the app runs out-of-the-box with **0 setup errors**.
- **1-Click Demo Evaluator**: Navbar button to instantly toggle between Patient (`patient@aarogya.com`) and Insurer (`insurer@aarogya.com`) roles for evaluation ease.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, Glassmorphic CSS Design System.
- **Backend**: Node.js, Express.js, Mongoose, Multer (Document Storage), JsonWebToken, Bcryptjs.
- **Database**: MongoDB Atlas / MongoDB Mongoose.

---

## 🚀 How to Run the Application

### 1. Start the Backend API Server

```bash
cd backend
npm install
npm run dev
```

The backend server will start on **`http://localhost:5000`**.

### 2. Start the Frontend Application

In a separate terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 🔑 Pre-Seeded Evaluation Credentials

| Role | Email | Password |
|---|---|---|
| **Patient** | `patient@aarogya.com` | `password123` |
| **Insurer** | `insurer@aarogya.com` | `password123` |

---

## 📁 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user & receive JWT token |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `POST` | `/api/claims` | Submit a claim with document upload |
| `GET` | `/api/claims` | Fetch all claims with filters |
| `GET` | `/api/claims/:id` | Fetch specific claim details |
| `PATCH` | `/api/claims/:id/review` | Insurer approves/rejects claim |