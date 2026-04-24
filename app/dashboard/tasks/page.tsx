
export const runtime = "nodejs"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { TaskBoard } from "@/components/TaskBoard"

export default async function TasksPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { order: "asc" },
  })

  const todoTasks = tasks.filter((t) => t.status === "TODO")
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS")
  const doneTasks = tasks.filter((t) => t.status === "DONE")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tâches</h1>
          <p className="text-muted-foreground">Gérez vos projets en mode Kanban</p>
        </div>
      </div>

      <TaskBoard
        todoTasks={todoTasks}
        inProgressTasks={inProgressTasks}
        doneTasks={doneTasks}
      />
    </div>
  )
}