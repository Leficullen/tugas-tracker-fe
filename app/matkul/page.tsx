"use client";
import { useEffect, useState } from "react";
import { getMatkul, createMatkul, updateMatkul, deleteMatkul } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Loading from "@/components/loading";
import { MessageSquare } from "lucide-react";

export default function MatkulPage({ initialData }: { initialData: Matkul[] }) {
  const [matkul, setMatkul] = useState<Matkul[]>(initialData || []);
  const [nama, setNama] = useState("");
  const [sks, setSks] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [editNama, setEditNama] = useState("");
  const [editSks, setEditSks] = useState(0);
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getMatkul();
        setMatkul(data);
      } catch (err) {
        console.error(err);
        showError("Data gagal dimuat");
      }
      setLoading(false);
    }
    loadData();
  }, []);

  async function handleCreate() {
    if (!nama || !sks) {
      showError("Nama dan SKS harus diisi!");
      return;
    }
    if (sks <= 0 || sks > 6 ) {
      showError("SKS is Invalid");
      return;
    }
    try {
      setLoading(true)
      const created = await createMatkul({ nama, sks: Number(sks), deskripsi });  
      setMatkul([...matkul, created]);
      setNama("");
      setSks(0);
      setDeskripsi("");
      
      showSuccess("Tugas berhasil dibuat!");
    } catch (err) {
      console.error(err);
      showError("Gagal membuat tugas.");
    }
    setLoading(false);
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      const updated = await updateMatkul(editing.id, {
        nama: editNama,
        sks: Number(editSks),
        deskripsi: editDeskripsi,
      });
      setMatkul(matkul.map((m) => (m.id === editing.id ? updated : m)));
      setEditNama("");
      setEditSks(0);
      setEditDeskripsi("");
      setEditing(null);
    } catch (err) {
      console.error(err);
      showError("Update Failed");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      await deleteMatkul(id); // Call the API to delete the item;
      setMatkul(matkul.filter((m) => m.id !== id));
      showSuccess("Mata kuliah berhasil dihapus!");
    } catch (err) {
      console.error(err);
      showError("Gagal menghapus mata kuliah.");
    }
    setLoading(false);
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
    <div className="mx-auto min-h-screen w-full ">
      {loading && (
        <div>
          <Loading />
        </div>
      )}

      {message && (
        <div
          className={`text-h3 font-semibold text-background items-center justify-center fixed inset-0 flex flex-col w-fit h-fit px-5 py-3 mx-auto my-auto rounded-md ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          } ${
            message ? "scale-100" : "scale-0"
          } smooth transition-all duration-300`}
        >
          <h3>{message}</h3>
        </div>
      )}

      <div
        className={`items-center  smooth justify-center mx-auto my-auto flex fixed flex-col inset-0  border ${
          editing
            ? "opacity-100 scale-100"
            : "scale-0 opacity-0 pointer-events-none"
        } `}
      >
        <Card className="lg:w-[50%] lg:px-10 px-[5%] w-[95%]">
          <div>
            <h2 className="text-h2 font-semibold text-primary text-center">
              {" "}
              Edit Matkul
            </h2>
          </div>
          <div className="flex flex-col">
            <Input
              className="border p-2 mt-3"
              placeholder="Nama mata kuliah"
              value={editNama}
              onChange={(e) => setEditNama(e.target.value)}
            />
            <Textarea
              className="border p-2 mt-3"
              placeholder="Deskripsi mata kuliah"
              value={editDeskripsi}
              onChange={(e) => setEditDeskripsi(e.target.value)}
            />

            <Input
              type="number"
              className="border p-2 mt-3"
              placeholder="SKS"
              value={editSks}
              onChange={(e) => setEditSks(Number(e.target.value))}
            />
            <div className="flex gap-3 mt-4">
              <Button
                className="bg-green-500 text-white px-3 py-2"
                onClick={handleUpdate}
              >
                Update
              </Button>

              <Button
                className="bg-red-500"
                onClick={() => {
                  setEditing(null);
                  setNama("");
                  setSks(0);
                  setDeskripsi("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <h1 className="text-h1 text-center lg:text-start text-primary font-bold">
        Matkul Management
      </h1>

      <div className="flex flex-col">
        <Input
          className="border p-2 mt-3"
          placeholder="Nama mata kuliah"
          onChange={(e) => setNama(e.target.value)}
          value={nama}
        />
        <Textarea
          className="border p-2 mt-3"
          placeholder="Deskripsi mata kuliah"
          onChange={(e) => setDeskripsi(e.target.value)}
          value={deskripsi}
        />

        <Input
          type="number"
          className="border p-2 mt-3 w-fit"
          placeholder="SKS"
          onChange={(e) => setSks(Number(e.target.value))}
          value={sks}
        />

        <Button
          className="bg-green-500 text-white px-3 py-2 mt-3 w-fit"
          onClick={() => handleCreate()}
        >
          Tambah
        </Button>
      </div>

      <ul className="mt-5 flex flex-col gap-3 lg:grid grid-cols-2 ">
        {matkul.map((m: any) => (
          <Card
            key={m.id}
            className="flex justify-between border-2 py-3 px-5 rounded-lg hover:border-primary/70 transition-all ease-in duration-100"
          >
            <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center">
              <div>
                <p className="font-bold">{m.nama}</p>
                <p>SKS: {m.sks}</p>
                <p>Deskripsi: {m.deskripsi}</p>
              </div>

              <div className="space-x-2 lg:mt-0 mt-2">
                <Button
                  className="bg-yellow-400 px-2 lg:py-1 h-7 lg:h-10"
                  onClick={() => {
                    setEditing(m);
                    setEditNama(m.nama);
                    setEditSks(m.sks);
                    setEditDeskripsi(m.deskripsi);
                  }}
                >
                  Edit
                </Button>

                <Button
                  className="bg-red-500 text-white px-2 lg:py-1 h-7 lg:h-10"
                  onClick={() => handleDelete(m.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
}
