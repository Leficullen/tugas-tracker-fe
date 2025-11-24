"use client";

import { useEffect, useState } from "react";
import Calendar from "@/components/calendar";
import IzinModal from "@/components/izin-modal";

import { getMonthAttendance, presensi, izin } from "@/lib/api";

import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";


export default function BolosPage() {
  const userId = "user123"; 

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [izinOpen, setIzinOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  async function load() {
    setLoading(true);
    try {
      const raw = await getMonthAttendance(
        userId,
        `${year}-${String(month).padStart(2, "0")}`
      );

      const mapped: Record<number, string> = {};

      raw.forEach((item: any) => {
        const day = new Date(item.date).getUTCDate();
        mapped[day] = item.status;
      });

      // auto mark bolos: hari sudah lewat & tidak ada entry
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const isPast = new Date(year, month - 1, d) < new Date();
        if (!mapped[d] && isPast) mapped[d] = "BOLOS";
      }

      setData(mapped);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [month, year]);

  async function handlePresensi() {
    if (!navigator.geolocation) return showError("Lokasi tidak didukung.");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        await presensi(userId, pos.coords.latitude, pos.coords.longitude);
      showSuccess("Presensi berhasil!");
        load();
      } catch (err: any) {
        console.error(err.message)
        showError("Gagal");
      }
    });
  }

  async function handleIzin(reason: string) {
    try {
      await izin(userId, reason);
      showSuccess("Izin terkirim");
      load();
    } catch {
      showError("Gagal mengirim izin");
    }
    setIzinOpen(false);
  }

  function nextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  }

  function prevMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  }

  function showSuccess(msg: string) {
    setMessageType("success");
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  function showError(msg: string) {
    setMessageType("error");
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div className="">
      {message && (
        <div
          className={`text-h4 text-background items-center justify-center fixed inset-0 flex flex-col w-fit h-fit px-5 py-3 mx-auto my-auto rounded-md shadow-lg ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          } ${
            message ? "scale-100" : "scale-0"
          } smooth transition-all duration-300`}
        >
          <h3>{message}</h3>
        </div>
      )}
      <h1 className="font-bold text-h1 text-primary lg:text-start text-center">
        Bolos Tracker
      </h1>

      <div className="flex gap-3 mt-5 lg:grid grid-cols-3 flex-col">
        <Button onClick={handlePresensi} className="bg-green-600">
          Presensi
        </Button>
        <Button onClick={() => setIzinOpen(true)} className="bg-yellow-500">
          Izin
        </Button>
        <div className="space-x-3 justify-between items-center flex lg:items-center border-primary/50 border-2 rounded-full">
          <Button onClick={prevMonth} className="rounded-full items-center">
            {"<"}
          </Button>
          <span className="text-h2 font-semibold">
            {year} - {String(month).padStart(2, "0")}
          </span>
          <Button onClick={nextMonth} className="rounded-full items-center">
            {">"}
          </Button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <Calendar year={year} month={month} data={data} />
      )}

      <IzinModal
        open={izinOpen}
        onClose={() => setIzinOpen(false)}
        onSubmit={handleIzin}
      />
    </div>
  );
}
function showerror(arg0: string) {
  throw new Error("Function not implemented.");
}

function showSuccess(arg0: string) {
  throw new Error("Function not implemented.");
}

