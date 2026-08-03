# 🎬 Turant — Video Demo Presentation & Content Guide

This document contains all the video demo materials, scene-by-scene script, screenshots, and live presentation content for evaluating the **Turant Healthcare Claims Management & Audit Platform**.

---

## 🔗 Quick Demo Links

- **Live Interactive Demo Showcase Page**: [https://turant-main.vercel.app/demo.html](https://turant-main.vercel.app/demo.html) *(or open `frontend/public/demo.html` locally)*
- **Live Production App**: [https://turant-main.vercel.app](https://turant-main.vercel.app)
- **Backend API Endpoint**: [https://turants-backend.onrender.com](https://turants-backend.onrender.com)

---

## 🔑 Demo Evaluation Accounts

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Patient** | `patient@aarogya.com` | `password123` | Log claims, track dossier status & rubber stamps |
| **Insurer** | `insurer@aarogya.com` | `password123` | Audit register, sanction amounts, apply rubber stamps |

---

## 🎙️ Video Presentation Script (90 Seconds)

### **Scene 1: Introduction [0:00 – 0:15]**
> *"Welcome to Turant—an official healthcare claims management and verification platform built with React 18, Node.js, and MongoDB. Turant allows patients to lodge reimbursement dossiers and enables insurance assessment officers to audit, sanction, or reject claims with official rubber stamps in real-time."*

### **Scene 2: Patient Claim Lodgement [0:15 – 0:45]**
> *"Logging in with quick patient credentials, we access the Patient Portal. Here, a patient submits a dossier for hospital stay expenses—entering ₹45,500 and attaching itemized proof receipts. Upon clicking submit, our optimistic state engine instantly logs the claim into the ledger as PENDING without flickering."*

### **Scene 3: Insurer Audit & Rubber Stamp [0:45 – 1:15]**
> *"Switching to the Insurer Assessment Officer role, the claims register displays live dossiers. Opening the review modal, the officer verifies the claim, sanctions ₹42,000, and adds audit remarks. Submitting the review instantly imprints an authentic green SANCTIONED rubber stamp directly on the record."*

### **Scene 4: Technical Architecture & Storage [1:15 – 1:30]**
> *"Documents are stored securely as Base64 Data URIs directly inside MongoDB, preventing file loss when cloud containers restart. Combined with JWT authentication and responsive glassmorphism UI, Turant delivers zero-delay claims processing."*

---

## 📸 Key Demo Screenshots

1. **Role Login Screen**: `frontend/public/demo_assets/login_screen.png`
2. **Patient Register Tracker**: `frontend/public/demo_assets/patient_portal.png`
3. **Insurer Rubber Stamp Audit**: `frontend/public/demo_assets/insurer_stamp.png`

---

## 🚀 How to Record / Present

1. Open **[https://turant-main.vercel.app/demo.html](https://turant-main.vercel.app/demo.html)** in your web browser.
2. Use **Loom**, **OBS Studio**, or Windows Game Bar (`Win + Alt + R`) to record your screen while reading the script aloud.
3. Or simply share the link to `demo.html` directly with evaluators!
