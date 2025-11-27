"use client";

import { useCapsules } from "@/store/capsules";
import { useEffect, useState } from "react";

function formatRemaining(ms: number) {
  const total = Math.floor(ms / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return `${d}д ${h}ч ${m}м ${s}с`;
}

export default function DashboardPage() {
  const capsules = useCapsules((s) => s.capsules);
  const removeCapsule = useCapsules((s) => s.removeCapsule);
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((v) => v + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const now = new Date();

  return (
    <div className="max-w-3xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Твои капсулы</h1>

      <div className="flex flex-col gap-4">
        {capsules.length === 0 && <p className="text-gray-500">Пока нет капсул</p>}

        {capsules.map((c) => {
          const openDate = new Date(c.openAt);
          const diff = openDate.getTime() - now.getTime();
          const isOpen = diff <= 0;

          return (
            <div
              key={c.id}
              className={`border rounded p-4 flex justify-between items-start gap-4 ${
                isOpen ? "bg-green-50 border-green-400" : "bg-gray-100"
              }`}
            >
              <div>
                <h2 className="text-xl font-semibold">{c.title}</h2>

                <p className="text-sm text-gray-500">Откроется: {openDate.toLocaleString()}</p>

                {!isOpen && (
                  <p className="text-red-600 mt-2">⏳ Осталось: {formatRemaining(diff)}</p>
                )}

                {isOpen && <p className="mt-2 whitespace-pre-wrap">{c.message}</p>}
              </div>

              <button
                onClick={() => removeCapsule(c.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Удалить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
