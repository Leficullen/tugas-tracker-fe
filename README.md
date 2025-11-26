# Tugas Tracker – Frontend

Project ini dibuat untuk Final Project Web Development RISTEK Fasilkom UI 2025. Aplikasi ini membantu mahasiswa mengelola mata kuliah dan tugas (CRUD), serta memantau status pengerjaan tugas.

Frontend dibangun menggunakan **Next.js** dan nantinya akan terhubung ke backend melalui REST API.

---

# PROJECT DOCS!
Untuk saat ini, proyek ini masih belum bisa dijalankan secara sempurna di global karena terdapat masalah saat deployment untuk Backend. Oleh karena itu, untuk melihat proyek ini dapat dilakukan dengan cara berikut:

1. Lakukan Cloning pada repository ini di bagian Frontend dan Backend
2. Install Dependencies dengan menggunakan npm install
3. Jalankan proyek dengan npm run dev
4. Proyek dapat diakses melalui https://localhost:3000
5. NOTE: Fitur Tugas Tracker tidak akan berfungsi sepenuhnya jika Backend belum dijalankan! (Repo Backend: https://github.com/Leficullen/tugas-tracker-be)

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
