// app/api/tasks/list/route.ts
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { order: "asc" },
  })

  return NextResponse.json(tasks)
}