# Tugas Tracker – Frontend

Project ini dibuat untuk Final Project Web Development RISTEK Fasilkom UI 2025. Aplikasi ini membantu mahasiswa mengelola mata kuliah dan tugas (CRUD), serta memantau status pengerjaan tugas.

Frontend dibangun menggunakan **Next.js** dan nantinya akan terhubung ke backend melalui REST API.

---

## 🛠 Tech Stack
- Next.js (App Router)
- React
- TailwindCSS
- TypeScript

---

## 📁 Folder Structure

Struktur folder utama di project ini:
```
app/
│── layout.tsx          → Layout root app
│── page.tsx            → Homepage
│
│── courses/            → Halaman manajemen mata kuliah
│    └── page.tsx
│
│── tasks/              → Halaman manajemen tugas
│    └── page.tsx
│
components/
│── ui/                 → Reusable UI components (optional)
│── CourseCard.tsx
│── TaskCard.tsx
│
lib/
│── api.ts              → Helper untuk memanggil API backend
│── utils.ts            → Helper untuk formatting, dsb
│
hooks/
│── useCourses.ts       → Custom Hook untuk data mata kuliah (optional)
│
public/
│── assets/             → Gambar/icon
│
styles/
│── globals.css
```
---
