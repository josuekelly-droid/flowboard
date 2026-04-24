export const runtime = "nodejs";

import { headers } from "next/headers";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path") || "/dashboard";

  return (
    <div className="flex min-h-screen bg-background">
      
      <aside className="hidden lg:block w-64 shrink-0 border-r bg-white dark:bg-slate-950">
        <div className="sticky top-0 h-screen">
          <Sidebar currentPath={currentPath} />
        </div>
      </aside>

      
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 w-full">
        {children}
      </main>

      {/* Navigation mobile en bas - visible jusqu'à 1024px */}
      <MobileNav currentPath={currentPath} />
    </div>
  );
}