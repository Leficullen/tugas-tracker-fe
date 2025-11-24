"use client";

import { useEffect, useState } from "react";
import {
  getTugas,
  createTugas,
  updateTugas,
  deleteTugas,
  getMatkul,
} from "@/lib/api";
import Loading from "@/components/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { stat } from "fs";
import clsx from "clsx";
import usePopup from "@/hook/usePopup";
import { ShowerHead } from "lucide-react";

export default function TugasPage({ initialData }: { initialData: Tugas[] }) {
  const [tugas, setTugas] = useState<Tugas[]>(initialData || []);
  const [matkul, setMatkul] = useState<Matkul[]>([]);
  const [nama, setNama] = useState("");
  const [editNama, setEditNama] = useState("");
  const [deadline, setDeadline] = useState(
    new Date().toISOString().slice(0, 16) // Updated to include date and time
  );
  const [editDeadline, setEditDeadline] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [status, setStatus] = useState("BELUM");
  const [editStatus, setEditStatus] = useState("");
  const [matkulId, setmatkulId] = useState("");
  const [editmatkulId, setEditmatkulId] = useState("");
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );


  // Load data tugas
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getTugas();
        setTugas(data);
      } catch (err) {
        console.error(err);
        showError("Gagal memuat data");
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Load data matkul
  useEffect(() => {
    async function loadMatkul() {
      setLoading(true);
      try {
        const data = await getMatkul();
        setMatkul(data);
      } catch (err) {
        console.error(err);
        showError("Gagal memuat data mata kuliah");
      }
      setLoading(false);
    }
    loadMatkul();
  }, []);

  // Create tugas
  async function handleCreate() {
    // if (!nama || !deadline || !matkulId || !status) {
    //   alert("Isi semua kolom! (Deskripsi opsional)");
    //   return;
    // }
    setLoading(true);
    try {
      const created = await createTugas({
        nama,
        deskripsi: deskripsi || "",
        deadline: new Date(deadline).toISOString(), // Updated to include full ISO format
        matkulId: Number(matkulId),
        status,
      });
      setTugas([created, ...tugas]);
      showSuccess("Tugas berhasil dibuat!");
      setNama("");
      setDeskripsi("");
      setDeadline(new Date().toISOString().slice(0, 16));
      setmatkulId("");
    } catch (err) {
      console.error(err);
      showError("Gagal membuat tugas. Silakan coba lagi.");
    }
    setLoading(false);
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      const updated = await updateTugas(editing.id, {
        nama: editNama,
        deskripsi: editDeskripsi,
        matkulId: Number(editmatkulId),
        deadline: new Date(editDeadline).toISOString(),
        status: editStatus,
      });

      setTugas(tugas.map((t) => (t.id === editing.id ? updated : t)));

      setEditing(null);

      showSuccess("Berjaya mmebuat tugas");
    } catch (err) {
      console.error(err);
      showError("Gagal mengupdate tugas");
    }
    setLoading(false);
  }
  // Delete tugas
  async function handleDelete(id: string) {
    setLoading(true);
    try {
      await deleteTugas(id);
      setTugas(tugas.filter((t) => t.id !== id));
      showSuccess("Tugas berhasil dihapus!");
    } catch (err) {
      console.error(err);
      showError("Gagal menghapus tugas. Silakan coba lagi.");
    }
    setLoading(false);
  }

  function getMatkulNameById(id: string): string {
    const matkulItem = matkul.find((m) => m.id == id);
    return matkulItem ? matkulItem.nama : "Unknown Matkul";
  }

  async function updateStatus(id: string, newStatus: string) {
    setLoading(true);
    try {
      const selectedTask = tugas.find((t) => t.id == id);
      if (!selectedTask) throw new Error("Task not found");
      const payload = {
        nama: selectedTask.nama,
        deskripsi: selectedTask.deskripsi,
        matkulId: selectedTask.matkulId,
        deadline: new Date(selectedTask.deadline).toISOString(),
        status: newStatus,
      };
      const updated = await updateTugas(id, payload);

      setTugas((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
      showError("Gagal mengupdate status");
    }
    setLoading(false);
  }

  function dateFormatter(dateString: string) {
    const d = new Date(dateString);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }
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
      {loading && <Loading />}
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
      <h1 className="text-h1 text-primary lg:text-start text-center font-bold">
        Manajemen Tugas
      </h1>

      <div
        className={`items-center  smooth justify-center mx-auto my-auto flex fixed flex-col inset-0  border ${
          editing
            ? "opacity-100 scale-100"
            : "scale-0 opacity-0 pointer-events-none"
        } `}
      >
        {/* EDIT MODAL */}
        <Card className="lg:w-[50%] w-[95%] lg:px-10 px-[5%] ">
          <div>
            <h2 className="text-h2 font-semibold text-primary text-center">
              {" "}
              Edit Tugas
            </h2>
          </div>
          <div className="flex flex-col">
            <Input
              className="border p-2 mt-3"
              placeholder="Nama mata kuliah"
              value={editNama}
              onChange={(e) => setEditNama(e.target.value)}
            />
            <div className="mt-3 grid grid-cols-2 gap-5 ">
              <Select
                value={editmatkulId}
                onValueChange={(value) => setEditmatkulId(value)}
              >
                <SelectTrigger className="w-full flex-1">
                  <SelectValue placeholder="Select a Matkul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Matkul</SelectLabel>
                    {matkul.map((m: any) => (
                      <SelectItem value={m.id} key={m.id}>
                        {m.nama}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="datetime-local"
                className="border p-2"
                placeholder="SKS"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
              />
            </div>

            <Textarea
              typeof="text"
              className="border p-2 mt-3 text-wrap"
              placeholder="Deskripsi mata kuliah"
              value={editDeskripsi}
              onChange={(e) => setEditDeskripsi(e.target.value)}
            />

            <div className="flex gap-3 mt-4">
              <Button
                className="bg-green-600 text-white px-3 py-2"
                onClick={handleUpdate}
              >
                Update
              </Button>

              <Button
                className="bg-red-600"
                onClick={() => {
                  setEditing(null);
                  setNama("");
                  setDeadline("");
                  setDeskripsi("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Input
        className="border p-2 mt-3"
        placeholder="Nama tugas"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <div className="flex items-center justify-between gap-5 mt-2">
        <Select onValueChange={(value) => setmatkulId(value)}>
          <SelectTrigger className="w-[180px] flex-1">
            <SelectValue placeholder="Select a Matkul" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Matkul</SelectLabel>
              {matkul.map((m: any) => (
                <SelectItem value={m.id} key={m.id}>
                  {m.nama}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <Select>
          <SelectTrigger className="w-[180px] flex-1">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Belum Dikerjakan" key="Belum Dikerjakan" onChange={()=> setStatus("Belum Dikerjakan")}>
                Belum Dikerjakan
              </SelectItem>
              <SelectItem value="Sudah Dikerjakan" key="Sudah Dikerjakan" onChange={() => setStatus("Suah Dikerjakan")}>
                Sudah Dikerjakan
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Input
          className="border p-2 w-fit text-foreground flex-1"
          type="datetime-local" // Updated to allow date and time input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <Textarea
        className="border p-2 mt-3"
        placeholder="Deskripsi Tugas"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
      />

      {/* <Select
        value={matkulId}
        onChange={(e) => setmatkulId(e.target.value)}
        className="border p-2 mt-3 ml-2"
      >
        <option value="">Pilih Mata Kuliah</option>
        {matkul.map((matkul) => (
          <option key={matkul.id} value={matkul.id}>
            {matkul.nama}
          </option>
        ))}
      </Select> */}

      <Button
        className="bg-green-600 text-white px-3 py-2 mt-2"
        onClick={handleCreate}
      >
        Tambah
      </Button>

      <ul className="mt-5 flex flex-col lg:grid grid-cols-2 gap-5">
        {tugas.map((t) => (
          <div
            key={t.id}
            className="lg:grid flex flex-col grid-cols-[75%_25%] border-2 rounded-xl hover:border-primary/70 transition-all ease-in duration-100"
          >
            <div className="py-3 px-5 whitespace-normal my-auto">
              <h2 className="font-bold wrap-break-word text-primary">
                {t.nama}
              </h2>
              <p>Mata Kuliah: {getMatkulNameById(t.matkulId)}</p>
              <p>Deadline: {dateDisplay(t.deadline)}</p>
              <p>Deskripsi: {t.deskripsi}</p>
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
            <div className="flex flex-col justify-center gap-2 bg-linear-to-b from-primary to-primary/85 w-full h-full p-3 rounded-b-lg lg:rounded-r-lg lg:rounded-l-none ">
              {getStatus(t) === "BELUM" ? (
                <Button
                  onClick={() => updateStatus(t.id, "SELESAI")}
                  className="bg-green-600 hover:bg-background hover:text-green-600 h-7 lg:h-10"
                >
                  Mark As Done
                </Button>
              ) : (
                <Button
                  onClick={() => updateStatus(t.id, "BELUM")}
                  className="bg-background hover:bg-background hover:text-green-600 h-7 lg:h-10 text-green-600"
                >
                  Unmark
                </Button>
              )}

              <Button
                className="bg-yellow-400 text-background hover:bg-background hover:text-yellow-400 px-2 py-1 h-7 lg:h-10"
                onClick={() => {
                  setEditing(t);
                  setEditNama(t.nama);
                  setEditDeadline(dateFormatter(t.deadline));
                  setEditStatus(t.status);
                  setEditmatkulId(t.matkulId);
                  setEditDeskripsi(t.deskripsi);
                }}
              >
                Edit
              </Button>

              <Button
                className="bg-red-600 text-background hover:text-red-600 hover:bg-background px-2 py-1 h-7 lg:h-10"
                onClick={() => handleDelete(t.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
