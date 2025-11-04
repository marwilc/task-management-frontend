// app/tasks/components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tasks",
      href: "/tasks",
    },
  ];
  return (
    <nav className="flex gap-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`hover:underline px-2 py-2 ${
            pathname === item.href ? "underline" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
