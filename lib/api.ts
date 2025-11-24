export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

// Wrapper untuk semua request ke backend
export async function request(path: string, options: RequestInit = {}) {
  console.log("SENDING:", BASE_URL + path);
  console.log("API KEY:", API_KEY);

  const res = await fetch(`${BASE_URL}${path}`, {   
    ...options,
    headers: {  
      "Content-Type": "application/json",
      "x-api-key" : API_KEY, // 🔥 FIX PALING PENTING
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("API ERROR:", await res.text());
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
}

//  MATA KULIAH

export async function getMatkul() {
  return request("/matkul");
}

export async function getMatkulById(id: string) {
  return request(`/matkul/${id}`);
}

export async function createMatkul(data: any) {
  return request("/matkul", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateMatkul(id: string, data: any) {
  return request(`/matkul/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteMatkul(id: string) {
  return request(`/matkul/${id}`, {
    method: "DELETE",
  });
}

//  TUGAS

export async function getTugas() {
  return request("/tugas");
}

export async function getTugasById(id: string) {
  return request(`/tugas/${id}`);
}

export async function createTugas(data: any) {
  return request("/tugas", {
    method: "POST",
    body: JSON.stringify({ ...data, matkulId: Number(data.matkulId) }),
  });
}

export async function updateTugas(id: string, data: any) {
  return request(`/tugas/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...data, matkulId: Number(data.matkulId) }),
  });
}

export async function deleteTugas(id: string) {
  return request(`/tugas/${id}`, {
    method: "DELETE",
  });
}



//  BOLOS TRACKER (Attendance)

export function getMonthAttendance(userId: string, month: string) {
  return request(`/attendance/month?userId=${userId}&month=${month}`);
}

export function presensi(userId: string, lat: number, lng: number) {
  return request(`/attendance/present`, {
    method: "POST",
    body: JSON.stringify({ userId, lat, lng }),
  });
}

export function izin(userId: string, reason: string) {
  return request(`/attendance/izin`, {
    method: "POST",
    body: JSON.stringify({ userId, reason }),
  });
}
