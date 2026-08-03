# 🚀 Deployment Guide — Turants Claims Platform

This guide walks you through deploying the **Turants Claims Platform** (Node.js/Express Backend + React/Vite Frontend + MongoDB Atlas).

---

## 🛠️ Step 1: Database (MongoDB Atlas)

Your database is **already hosted live** on MongoDB Atlas.

- **MongoDB Connection String (`MONGO_URI`)**:
  ```env
  mongodb+srv://mahilmithranks2007_db_user:S8kBpYkAby6LOhPR@cluster0.fv6adr5.mongodb.net/aarogya_claims?retryWrites=true&w=majority&appName=Cluster0
  ```
- **JWT Secret (`JWT_SECRET`)**:
  ```env
  3OXRwlugN07ln8cHidvtQYmKoZTIr+DOAGvT9MoJRN8=
  ```

---

## 🌐 Step 2: Deploy Backend (Render.com - Free Web Service)

1. Push your repository to **GitHub**.
2. Log in to [Render.com](https://render.com).
3. Click **New +** → **Web Service**.
4. Connect your GitHub Repository.
5. Set the following details:
   - **Name**: `turants-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `MONGO_URI` | `mongodb+srv://mahilmithranks2007_db_user:S8kBpYkAby6LOhPR@cluster0.fv6adr5.mongodb.net/aarogya_claims?retryWrites=true&w=majority&appName=Cluster0` |
   | `JWT_SECRET` | `3OXRwlugN07ln8cHidvtQYmKoZTIr+DOAGvT9MoJRN8=` |
   | `PORT` | `5000` |
7. Click **Create Web Service**.
8. Note down your backend URL (e.g. `https://turants-backend.onrender.com`).

---

## 💻 Step 3: Deploy Frontend (Vercel or Render Static Site)

### Option A: Vercel (Recommended for Frontend)

1. Log in to [Vercel.com](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository.
4. Set the following details:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option B: Render Static Site

1. On Render, click **New +** → **Static Site**.
2. Connect your GitHub Repository.
3. Set the details:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Click **Create Static Site**.

---

## ⚡ Step 4: Quick Local Production Build Verification

You can test production builds locally anytime by running:

```bash
# Build Frontend
cd frontend
npm run build

# Start Backend
cd ../backend
npm start
```
