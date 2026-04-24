"use client"

import Link from "next/link";
import {
  LayoutDashboard,
  DollarSign,
  CheckSquare,
  Folder,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navLinks = [
  { href: "/dashboard", label: "Accueil", icon: LayoutDashboard },
  { href: "/dashboard/finance", label: "Finances", icon: DollarSign },
  { href: "/dashboard/tasks", label: "Tâches", icon: CheckSquare },
  { href: "/dashboard/files", label: "Fichiers", icon: Folder },
];

interface MobileNavProps {
  currentPath: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
  const isActive = (href: string) => {
    if (href === "/dashboard") return currentPath === href;
    return currentPath.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-t shadow-lg">
      <div className="flex items-center justify-around h-16 px-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg min-w-0 flex-1 transition-colors ${
                active
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-[10px] leading-tight truncate max-w-full">
                {link.label}
              </span>
            </Link>
          );
        })}
        
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg min-w-0 flex-1 text-muted-foreground hover:text-red-500 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="text-[10px] leading-tight truncate max-w-full">
            Quitter
          </span>
        </button>
      </div>
    </nav>
  );
}