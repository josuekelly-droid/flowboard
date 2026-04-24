// app/api/tasks/update/route.ts
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const { id, status, order } = await req.json()

  const task = await prisma.task.update({
    where: { id },
    data: { status, order },
  })

  return NextResponse.json(task)
}