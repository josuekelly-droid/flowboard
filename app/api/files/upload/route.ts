// app/api/files/upload/route.ts
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Chemin unique
  const uniqueName = `${Date.now()}-${file.name}`
  const uploadDir = join(process.cwd(), "public", "uploads")
  const filePath = join(uploadDir, uniqueName)

  // Créer le dossier si nécessaire
  await writeFile(filePath, buffer)

  const url = `/uploads/${uniqueName}`

  const savedFile = await prisma.file.create({
    data: {
      name: file.name,
      url,
      size: file.size,
      type: file.type,
      userId: session.user.id,
    },
  })

  return NextResponse.json(savedFile)
}