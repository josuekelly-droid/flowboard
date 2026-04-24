import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  DollarSign,
  CheckSquare,
  Folder,
  LogOut,
  User,
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/finance", label: "Finances", icon: DollarSign },
  { href: "/dashboard/tasks", label: "Tâches", icon: CheckSquare },
  { href: "/dashboard/files", label: "Fichiers", icon: Folder },
  { href: "/dashboard/profile", label: "Profil", icon: User },
];

interface SidebarProps {
  currentPath: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white dark:bg-slate-950">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">FlowBoard</h1>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = currentPath === link.href || 
            (link.href !== "/dashboard" && currentPath.startsWith(link.href));
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${isActive ? "bg-slate-100 dark:bg-slate-800" : ""}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <form
          action={async () => {
            "use server";
            const { signOut } = await import("@/lib/auth");
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start"
            type="submit"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </form>
      </div>
    </div>
  );
}