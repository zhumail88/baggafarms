"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bird,
  ClipboardList,
  Truck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Flocks", href: "/flocks", icon: Bird },
  { name: "Daily Logs", href: "/logs", icon: ClipboardList },
  { name: "Dispatch", href: "/dispatch", icon: Truck },
  { name: "Ledger", href: "/ledger", icon: Wallet },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-64 flex-col bg-zinc-950 border-r border-zinc-800 text-zinc-300">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Bird className="text-emerald-500" />
          BaggaFarms
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-600/10 text-emerald-500"
                  : "hover:bg-zinc-900 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400">
          <span>Worker/Owner User</span>
        </div>
      </div>
    </div>
  );
}
