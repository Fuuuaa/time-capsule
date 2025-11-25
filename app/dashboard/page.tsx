"use client";

import { useCapsules } from "@/store/capsules";

export default function DashboardPage() {
  const capsules = useCapsules((s) => s.capsules);

  return (
    <div className="max-w-3xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Капсулы</h1>

      <div className="flex flex-col gap-4">
        {capsules.length === 0 && <p className="text-gray-500">Пока нет капсул</p>}

        {capsules.map((c) => (
          <div key={c.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-sm text-gray-500">
              Откроется: {new Date(c.openAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
