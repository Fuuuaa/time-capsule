"use client";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
};

export default function CapsuleFilters({
  query,
  setQuery,
  status,
  setStatus,
  sort,
  setSort,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
        className="bg-neutral-900 px-3 py-2 rounded flex-1 min-w-[200px]"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-neutral-900 px-3 py-2 rounded"
      >
        <option value="all">Все</option>
        <option value="open">Открытые</option>
        <option value="closed">Закрытые</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-neutral-900 px-3 py-2 rounded"
      >
        <option value="new">Сначала новые</option>
        <option value="old">Сначала старые</option>
      </select>
    </div>
  );
}
