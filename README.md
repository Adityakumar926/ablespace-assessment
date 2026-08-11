# AbleSpace Full Stack Developer (Fresher) Technical Assessment

**Candidate**: Aditya Kumar  
**Role**: Full Stack Developer (Fresher)  
**Company**: AbleSpace  
**Figma Reference**: [Assessment Task Figma Design](https://www.figma.com/design/obONCFmoTFN27V5H9PHS2X/Assessment-Task?node-id=0-1)  

---

## 📁 Repository Structure

```
AbleSpace/
├── frontend/                     # Next.js 14 App Router + Tailwind CSS + TypeScript
│   ├── Multi-Theme System (Light, Dark, Emerald, Purple with LocalStorage persistence)
│   ├── Guest Login & Session Manager
│   └── Task Management System (Kanban & List views, Filters, Search, Task CRUD)
├── backend/                      # NestJS REST API Server (TypeScript)
│   ├── Guest Auth Module (`POST /api/auth/guest`)
│   ├── Tasks Module (`GET`, `POST`, `PATCH`, `DELETE /api/tasks`)
│   └── Themes Module (`GET`, `POST /api/themes`)
├── part-2/
│   └── part_2_product_understanding.md   # AbleSpace "Take Data" workflow breakdown & UX report
└── README.md                     # Monorepo setup & evaluation guide
```

---

## 🚀 Part 1: Task Management System Overview

### 1. Multi-Theme Implementation
- Supports **4 distinct themes**: `Light` (Default AbleSpace), `Dark`, `Emerald` (SpEd Green), and `Purple`.
- **Persistence**: Theme selection is stored in `localStorage` and automatically synchronized across browser refreshes.

### 2. Guest Login
- Implemented one-click **Guest Login** via `POST /api/auth/guest` returning a guest session token and badge state.

### 3. Task Management Features
- **Views**: Interactive Kanban Board (`To Do`, `In Progress`, `Under Review`, `Completed`) + Table List view toggle.
- **Task CRUD**: Create tasks, edit details, move across status columns, assign priorities (`Low`, `Medium`, `High`, `Urgent`), set due dates, add categories/tags, and delete tasks.
- **Search & Filtering**: Filter by priority, status, or search query.

---

## 📋 Part 2: Product Understanding Report

Located at [`part-2/part_2_product_understanding.md`](./part-2/part_2_product_understanding.md):
1. **Workflow Breakdown**: Detailed analysis of the AbleSpace "Take Data" screen from the Caseload tab (Special Education IEP goal tracking, trial counts, prompt hierarchy, frequency tallying, and timers).
2. **UX/UI Audit & Recommendations**: 5 concrete usability and functional enhancements (One-Handed Mobile Data Mode, Group Session View, Hands-Free Voice Logging, Offline-First Sync Queue, Real-Time Mastery Alerts).

---

## 🛠️ Quick Start & Local Setup

### 1. Launch Backend (NestJS Server)
```bash
cd backend
npm install
npm run dev
# Server running at http://localhost:4000/api
```

### 2. Launch Frontend (Next.js App)
```bash
cd frontend
npm install
npm test      # Runs Vitest automated test suite
npm run dev   # App running at http://localhost:3000
```
