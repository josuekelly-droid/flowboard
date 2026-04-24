// app/api/files/delete/route.ts
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { unlink } from "fs/promises"
import { join } from "path"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const { id } = await req.json()

  const file = await prisma.file.findUnique({ where: { id } })

  if (file) {
    // Supprimer le fichier physique
    const filePath = join(process.cwd(), "public", file.url)
    try {
      await unlink(filePath)
    } catch (e) {
      // Le fichier n'existe peut-être plus sur le disque
    }

    await prisma.file.delete({ where: { id } })
  }

  return NextResponse.json({ success: true })
}