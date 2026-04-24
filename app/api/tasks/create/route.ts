// app/api/tasks/create/route.ts
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const { title, status } = await req.json()

  const count = await prisma.task.count({
    where: { userId: session.user.id, status },
  })

  const task = await prisma.task.create({
    data: {
      title,
      status,
      order: count,
      userId: session.user.id,
    },
  })

  return NextResponse.json(task)
}