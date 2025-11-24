
"use client";
import Loading from "@/components/loading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getMatkul, getTugas } from "@/lib/api";
import { div, p } from "framer-motion/client";
import { useEffect, useState } from "react";

export default function Home({initialData} : {initialData: Matkul[]}) {
  const [matkul, setMatkul] = useState<Matkul[]>(initialData || []);
  const [tugas, setTugas] = useState<Matkul[]>(initialData || []);

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<"success"|"error">("success");


  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const data = await getMatkul();
        setMatkul(data)
      } catch (err) {
        console.error(err)
        showError("Gagal memuat data")
      }
      setLoading(false)
    }
    loadData();
  }, [])

  useEffect(()=> {
    async function loadData() {
      setLoading(true)
      try{
        const data = await getTugas();
        setTugas(data)
      } catch(err) {
        console.error(err)
        showError("Gagal memuat data");
      }
      setLoading(true)
    }
    loadData()
  }, [])

  function dateDisplay(dateString: string) {
    const d = new Date(dateString);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);

    const dd = String(local.getDate()).padStart(2, "0");
    const mm = String(local.getMonth() + 1).padStart(2, "0");
    const yyyy = local.getFullYear();

    const hh = String(local.getHours()).padStart(2, "0");
    const min = String(local.getMinutes()).padStart(2, "0");

    return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
  }

  function getStatus(tugas: Tugas) {
    const now = new Date();
    const deadline = new Date(tugas.deadline);

    if (tugas.status === "SELESAI") {
      return "SELESAI";
    }

    if (deadline < now) {
      return "EXPIRED";
    }

    return "BELUM";
  }



  function showSuccess (msg:string) {
    setMessageType("success");
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  function showError (msg:string) {
    setMessageType("error")
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div className="">
      {loading && <Loading />}
      {message && (
        <div
          className={`text-h4 text-background items-center justify-center fixed inset-0 flex flex-col w-fit h-fit px-5 py-3 mx-auto my-auto rounded-md ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          } ${
            message ? "scale-100" : "scale-0"
          } smooth transition-all duration-300`}
        >
          <h3>{message}</h3>
        </div>
      )}

      <h1 className="text-h1 text-primary font-bold">Hello User!</h1>
      <p className="text-p">
        Welcome back! The following is a summary of your assignments and
        courses.
      </p>

      <div className="mt-4 gap-5 flex flex-col">
        <div>
          <h2 className="text-h2 font-semibold text-primary">Mata Kuliah</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {matkul.map((m: any) => (
              <Card id={m.id} className="w-full gap-0 px-3 py-5 rounded-lg border-2 hover:border-primary smooth duration-200">
                <h3 className="font-semibold text-h4 text-primary">{m.nama}</h3>
                <p className="text-foreground/50">SKS: {m.sks}</p>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-h2 font-semibold text-primary">Tugas</h2>
          <div className="lg:grid flex flex-col grid-cols-2 gap-3">
            {tugas.map((t: any) => (
              <Card id={t.id} className="w-full flex justify-between gap-0 px-3 py-5 rounded-lg border-2 hover:border-primary smooth duration-200">
                <div>
                  <h3 className="font-semibold text-h4 text-primary">
                    {t.nama}
                  </h3>
                  <p className="text-red-600/70">
                    Deadline: {dateDisplay(t.deadline)}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-white rounded text-center mt-2 w-fit px-2 ${
                      getStatus(t) === "EXPIRED"
                        ? "bg-red-600"
                        : getStatus(t) == "SELESAI"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {" "}
                    {getStatus(t) == "EXPIRED"
                      ? "EXPIRED"
                      : getStatus(t) === "SELESAI"
                      ? "SUDAH DIKERJAKAN"
                      : "BELUM DIKERJAKAN"}
                  </p>

                </div>
              </Card>
            ))}
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
