"use client";

import { useCapsules } from "@/store/capsules";

export default function DashboardPage() {
  const capsules = useCapsules((s) => s.capsules);
  const now = new Date();

  return (
    <div className="max-w-3xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Твои капсулы</h1>

      <div className="flex flex-col gap-4">
        {capsules.length === 0 && <p className="text-gray-500">Пока нет капсул</p>}

        {capsules.map((c) => {
          const openDate = new Date(c.openAt);
          const isOpen = openDate <= now;

          return (
            <div
              key={c.id}
              className={`border rounded p-4 transition ${
                isOpen ? "bg-green-50 border-green-400" : "bg-gray-100"
              }`}
            >
              <h2 className="text-xl font-semibold">{c.title}</h2>

              <p className="text-sm text-gray-500 mb-2">Откроется: {openDate.toLocaleString()}</p>

              {!isOpen && (
                <p className="text-red-600 font-medium">Запечатано до указанного времени</p>
              )}

              {isOpen && <p className="mt-2 whitespace-pre-wrap">{c.message}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
