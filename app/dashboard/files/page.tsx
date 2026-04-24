
export const runtime = "nodejs"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { FileUpload } from "@/components/FileUpload"
import { FileList } from "@/components/FileList"

export default async function FilesPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const files = await prisma.file.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Fichiers</h1>
        <p className="text-muted-foreground">Stockez et gérez vos documents</p>
      </div>

      <FileUpload />
      <FileList files={files} />
    </div>
  )
}