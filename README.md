# AbleSpace Full Stack Developer (Fresher) Technical Assessment

**Candidate**: Aditya Kumar  
**Role**: Full Stack Developer (Fresher)  
**Company**: AbleSpace  
**Live Deployed Application**: [https://ablespaceassisment.netlify.app/](https://ablespaceassisment.netlify.app/)  
**GitHub Repository**: [https://github.com/Adityakumar926/ablespace-assessment](https://github.com/Adityakumar926/ablespace-assessment)  
**Figma Reference**: [Assessment Task Figma Design](https://www.figma.com/design/obONCFmoTFN27V5H9PHS2X/Assessment-Task?node-id=0-1)  

---

## 🌐 Live Application & Submission Links

- 🚀 **Live Working URL**: [https://ablespaceassisment.netlify.app/](https://ablespaceassisment.netlify.app/)
- 📦 **GitHub Repository**: [https://github.com/Adityakumar926/ablespace-assessment](https://github.com/Adityakumar926/ablespace-assessment)
- 📸 **Application Walkthrough (Markdown)**: [`part-2/AbleSpace_Application_Walkthrough.md`](./part-2/AbleSpace_Application_Walkthrough.md)
- 📄 **Application Walkthrough (PDF)**: [`part-2/AbleSpace_Application_Walkthrough.pdf`](./part-2/AbleSpace_Application_Walkthrough.pdf)
- 📄 **Part 2 Product Report (Markdown)**: [`part-2/part_2_product_understanding.md`](./part-2/part_2_product_understanding.md)
- 📄 **Part 2 Product Report (PDF)**: [`part-2/part_2_product_understanding.pdf`](./part-2/part_2_product_understanding.pdf)

---

## 📁 Repository Structure

```
AbleSpace/
├── frontend/                             # Next.js 14 App Router + Tailwind CSS + TypeScript
│   ├── Multi-Theme System (Light, Dark, Emerald, Purple with LocalStorage persistence)
│   ├── Guest Login & Session Token Manager
│   └── Task Management System (Kanban & List views, Filters, Search, Task CRUD)
├── backend/                              # NestJS REST API Server (TypeScript)
│   ├── Guest Auth Module (`POST /api/auth/guest`)
│   ├── Tasks Module (`GET`, `POST`, `PATCH`, `DELETE /api/tasks`)
│   └── Themes Module (`GET`, `POST /api/themes`)
├── part-2/
│   ├── screenshots/                      # 7 Application Screenshots (Kanban, List, Themes, Guest Modal)
│   ├── AbleSpace_Application_Walkthrough.md   # Visual Application Walkthrough Report
│   ├── AbleSpace_Application_Walkthrough.pdf  # PDF copy of Walkthrough Report
│   ├── part_2_product_understanding.md   # AbleSpace "Take Data" workflow breakdown & UX report
│   └── part_2_product_understanding.pdf  # PDF copy of Part 2 submission
├── netlify.toml                          # Netlify monorepo deployment config
└── README.md                             # Monorepo setup & evaluation guide
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

## 📋 Part 2: Product Understanding & Walkthrough Reports

1. **Visual Walkthrough Report**: Located at [`part-2/AbleSpace_Application_Walkthrough.md`](./part-2/AbleSpace_Application_Walkthrough.md) featuring 7 screenshot figures showcasing all features, themes, modals, and micro-interactions.
2. **Product Analysis Report**: Located at [`part-2/part_2_product_understanding.md`](./part-2/part_2_product_understanding.md) detailing the AbleSpace "Take Data" screen from the Caseload tab and 5 UX/UI recommendations.

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
