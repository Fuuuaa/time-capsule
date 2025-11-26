"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
      <div className="max-w-5xl mx-auto p-4 flex gap-6">
        <Link href="/">Главная</Link>
        <Link href="/create">Создать капсулу</Link>
        <Link href="/dashboard">Капсулы</Link>
      </div>
    </nav>
  );
}
