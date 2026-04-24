export const runtime = "nodejs";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, CheckSquare, Folder, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId: session.user.id },
  });

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const tasksInProgress = await prisma.task.count({
    where: {
      userId: session.user.id,
      status: { in: ["TODO", "IN_PROGRESS"] },
    },
  });

  const totalFiles = await prisma.file.count({
    where: { userId: session.user.id },
  });

  const recentTransactions = await prisma.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: 5,
  });

  const recentTasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      status: { in: ["TODO", "IN_PROGRESS"] },
    },
    orderBy: { dueDate: "asc" },
    take: 5,
  });

  return (
    <div className="space-y-6 lg:space-y-8">
      
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">
          Bonjour, {session.user.name || session.user.email?.split("@")[0]}
        </h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          Voici un résumé de votre activité.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Link href="/dashboard/finance" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">💰 Finances</CardTitle>
              {balance >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 shrink-0" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 shrink-0" />
              )}
            </CardHeader>
            <CardContent>
              <p className={`text-2xl lg:text-3xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                {balance.toFixed(2)} €
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                +{totalIncome.toFixed(2)} € • -{totalExpense.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/tasks" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">✅ Tâches</CardTitle>
              <CheckSquare className="h-4 w-4 text-blue-500 shrink-0" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl lg:text-3xl font-bold">{tasksInProgress}</p>
              <p className="text-xs text-muted-foreground mt-1">Tâches en cours ou à faire</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/files" className="block sm:col-span-2 lg:col-span-1">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">📁 Fichiers</CardTitle>
              <Folder className="h-4 w-4 text-purple-500 shrink-0" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl lg:text-3xl font-bold">{totalFiles}</p>
              <p className="text-xs text-muted-foreground mt-1">Fichiers stockés</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Dernières transactions</CardTitle>
              <CardDescription>Vos 5 dernières opérations</CardDescription>
            </div>
            <Link href="/dashboard/finance" className="text-sm text-primary hover:underline flex items-center gap-1 shrink-0">
              Voir tout <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-6 text-sm">
                Aucune transaction pour le moment.
              </p>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between border-b pb-2 last:border-0 gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
                        {t.description || "Sans description"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(t.date).toLocaleDateString("fr-FR")} • {t.category}
                      </p>
                    </div>
                    <span className={`font-semibold text-sm whitespace-nowrap ${t.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                      {t.type === "INCOME" ? "+" : "-"}{t.amount.toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Tâches en cours</CardTitle>
              <CardDescription>À faire ou en progression</CardDescription>
            </div>
            <Link href="/dashboard/tasks" className="text-sm text-primary hover:underline flex items-center gap-1 shrink-0">
              Voir tout <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-6 text-sm">
                Aucune tâche en cours.
              </p>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between border-b pb-2 last:border-0 gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.status === "TODO" ? "À faire" : "En cours"}
                        {task.dueDate && ` • ${new Date(task.dueDate).toLocaleDateString("fr-FR")}`}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                        task.status === "TODO"
                          ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {task.status === "TODO" ? "À faire" : "En cours"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}