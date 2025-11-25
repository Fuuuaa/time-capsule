"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCapsules } from "@/store/capsules";
import { v4 as uuid } from "uuid";

export default function CreateCapsulePage() {
  const router = useRouter();
  const addCapsule = useCapsules((s) => s.addCapsule);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [openAt, setOpenAt] = useState("");

  const createCapsule = () => {
    if (!title || !message || !openAt) return;

    addCapsule({
      id: uuid(),
      title,
      message,
      openAt,
      createdAt: new Date().toISOString(),
    });

    router.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Создать капсулу</h1>

      <div className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Название капсулы"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 rounded min-h-[140px]"
          placeholder="Сообщение в будущее"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={openAt}
          onChange={(e) => setOpenAt(e.target.value)}
        />

        <button
          onClick={createCapsule}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Создать
        </button>
      </div>
    </div>
  );
}
