# 🎬 Turant — Video Demo Recording Script & Checklist

Follow this step-by-step guide to record your 60-to-90 second demo video on your own computer.

---

## 📋 Quick Checklist Before Pressing Record

1. **Open the App in your browser**: [https://turant-main.vercel.app](https://turant-main.vercel.app)
2. **Screen Recorder**: Use **Loom**, **OBS Studio**, or press `Windows Key + Alt + R` (built-in Windows screen recorder).
3. **Demo Credentials**:
   - **Patient**: `patient@turant.com` / `password123` *(or click the "Patient Demo" button)*
   - **Insurer Officer (Mahil)**: `mahilmithranks2007@gmail.com` / `Mahil@19` *(or click "Insurer (Mahil)" button)*
   - **Insurer Officer (Dr. Ananya)**: `insurer@turant.com` / `password123`

---

## 🎙️ Step-by-Step Script & On-Screen Actions

### **Scene 1: Introduction & Landing Page [0:00 – 0:15]**
- **🖥️ Screen Action**: Start on `https://turant-main.vercel.app`. Hover slightly over the glassmorphic login card and point out the quick-login role buttons.
- **🗣️ Voiceover Narration**:
  > *"Hello! Today I’m presenting **Turant**, an institutional healthcare claims management and verification platform built with React 18, Node.js, and MongoDB. Turant allows patients to lodge reimbursement dossiers and enables insurance assessment officers to audit, sanction, or reject claims with official rubber stamps in real-time."*

---

### **Scene 2: Patient Claim Lodgement [0:15 – 0:45]**
- **🖥️ Screen Action**: 
  1. Click **"Sign in as Patient"**.
  2. Scroll down to the **Log New Reimbursement Claim** form.
  3. Enter:
     - **Requested Claim Amount**: `₹45,500`
     - **Medical Description**: `Apollo Hospital - Emergency Appendectomy & 3-day recovery stay.`
     - **Upload File**: Select any sample PDF/image receipt file.
  4. Click **"Log Claim into Register"**, check the legal declaration box, and confirm.
  5. Show the new claim immediately appearing in the tracker with **PENDING** status.
- **🗣️ Voiceover Narration**:
  > *"First, we log in as a **Patient**. On the Patient Dashboard, we submit a reimbursement dossier for hospital surgical expenses—entering ₹45,500 and uploading an itemized bill receipt. When we click submit, our optimistic state engine instantly updates the ledger, showing the claim as **PENDING** without any screen flickering."*

---

### **Scene 3: Insurer Audit & Official Rubber Stamp [0:45 – 1:15]**
- **🖥️ Screen Action**:
  1. Click **Sign Out** in the top navigation bar.
  2. Log in as Insurer (`mahilmithranks2007@gmail.com` / `Mahil@19` or click **"Insurer (Mahil)"** button).
  3. On the Insurer Portal, find the newly submitted claim row and click **"Assess Dossier"**.
  4. In the modal, select **SANCTION**, enter Approved Payout: `₹42,000`, and type audit note: `Verified itemized bill and discharge summary. Sanctioned under policy limits.`
  5. Click **"SANCTION →"** and confirm.
  6. Point out the official green **SANCTIONED** rubber stamp now visible on the ledger row.
- **🗣️ Voiceover Narration**:
  > *"Next, we log in as an **Insurer Assessment Officer**. The claims register lists all active dossiers. We open the claim modal, inspect the medical documents, sanction a payout of ₹42,000, and add audit notes. Submitting the review imprints an authentic green **SANCTIONED** rubber stamp directly onto the ledger record in real-time."*

---

### **Scene 4: Technical Architecture & Storage [1:15 – 1:30]**
- **🖥️ Screen Action**: Scroll through the claims register or show the clean glassmorphism navigation header.
- **🗣️ Voiceover Narration**:
  > *"Behind the scenes, uploaded receipts are stored persistently as Base64 Data URIs inside MongoDB, ensuring zero data loss when cloud containers restart. With JWT security and role-based access, Turant offers zero-delay claims processing. Thank you!"*
