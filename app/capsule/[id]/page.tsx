"use client";

import { useParams } from "next/navigation";
import { useCapsules } from "@/store/capsules";

export default function CapsulePage() {
  const { id } = useParams();
  const capsules = useCapsules((s) => s.capsules);

  const capsule = capsules.find((c) => c.id === id);

  if (!capsule) return <p className="p-10">Капсула не найдена</p>;

  const isOpen = new Date(capsule.openAt) <= new Date();

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-4">{capsule.title}</h1>

      {!isOpen && <p className="text-red-500 text-lg">Откроется позже</p>}

      {isOpen && (
        <>
          <p className="text-sm text-gray-500 mb-2">
            Открыто: {new Date(capsule.openAt).toLocaleString()}
          </p>
          <p>{capsule.message}</p>
        </>
      )}
    </div>
  );
}
