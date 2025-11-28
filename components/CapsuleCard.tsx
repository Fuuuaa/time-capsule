"use client";

import Link from "next/link";
import { Capsule } from "@/store/capsules";
import { motion } from "framer-motion";

type Props = {
  capsule: Capsule;
  onDelete?: (id: string) => void;
};

export default function CapsuleCard({ capsule, onDelete }: Props) {
  const now = Date.now();
  const openAt = new Date(capsule.openAt).getTime();
  const isOpen = now >= openAt;
  const diff = Math.max(0, openAt - now);

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative bg-neutral-900 rounded-xl p-4 shadow transition hover:shadow-purple-500/30"
    >
      <Link href={`/capsule/${capsule.id}`}>
        <div className="flex flex-col gap-2 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg truncate">{capsule.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded ${
                isOpen ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {isOpen ? "ОТКРЫТА" : "ЗАКРЫТА"}
            </span>
          </div>

          <p className="text-sm text-zinc-400 truncate">{capsule.message}</p>

          {!isOpen && (
            <div className="text-sm text-purple-400 font-mono">
              ⏳ {days}d {hours}h {minutes}m {seconds}s
            </div>
          )}

          <div className="text-xs text-zinc-500">
            📅 {new Date(capsule.openAt).toLocaleString()}
          </div>
        </div>
      </Link>

      {onDelete && (
        <button
          onClick={() => onDelete(capsule.id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-xs text-red-500 hover:text-red-400"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}
