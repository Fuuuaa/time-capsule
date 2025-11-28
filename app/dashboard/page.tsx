"use client";

import { useCapsules } from "@/store/capsules";
import CapsuleCard from "@/components/CapsuleCard";
import CapsuleFilters from "@/components/CapsuleFilters";
import { useState } from "react";

export default function Dashboard() {
  const { capsules, removeCapsule } = useCapsules();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("new");

  const filtered = capsules
    .filter((c) => {
      const matchQuery =
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.message.toLowerCase().includes(query.toLowerCase());

      const open = Date.now() >= new Date(c.openAt).getTime();

      const matchStatus =
        status === "all" || (status === "open" && open) || (status === "closed" && !open);

      return matchQuery && matchStatus;
    })
    .sort((a, b) => {
      const tA = new Date(a.openAt).getTime();
      const tB = new Date(b.openAt).getTime();
      return sort === "new" ? tB - tA : tA - tB;
    });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мои капсулы</h1>

      <CapsuleFilters
        query={query}
        setQuery={setQuery}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <CapsuleCard key={c.id} capsule={c} onDelete={removeCapsule} />
        ))}
      </div>
    </main>
  );
}