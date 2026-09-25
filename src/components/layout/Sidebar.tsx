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
    <div className="hidden md:flex h-screen sticky top-0 w-64 flex-col bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-800 text-zinc-300">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg">
            <Bird className="text-emerald-500 w-5 h-5" />
          </div>
          BaggaFarms
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm"
                  : "hover:bg-zinc-900 hover:text-white border border-transparent"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-emerald-500" : "text-zinc-500")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
