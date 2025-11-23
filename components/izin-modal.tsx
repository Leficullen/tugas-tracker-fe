"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function IzinModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
        <h1 className="font-bold text-h3 mb-2 text-primary">Ajukan Izin</h1>

        <Textarea
          placeholder="Masukkan alasan izin..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => {
              onSubmit(text);
              setText("");
            }}
          >
            Kirim
          </Button>

          <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
