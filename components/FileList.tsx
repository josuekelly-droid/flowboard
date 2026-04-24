"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { File, FileText, Image, Trash2, Download, Eye } from "lucide-react"

interface FileItem {
  id: string
  name: string
  url: string
  size: number
  type: string
  createdAt: Date
}

interface FileListProps {
  files: FileItem[]
}

export function FileList({ files }: FileListProps) {
  const router = useRouter()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<string | null>(null)

  async function deleteFile(id: string) {
    await fetch("/api/files/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  function getFileIcon(type: string) {
    if (type.startsWith("image/")) return <Image className="h-5 w-5 text-blue-500" />
    if (type === "application/pdf") return <FileText className="h-5 w-5 text-red-500" />
    return <File className="h-5 w-5 text-muted-foreground" />
  }

  function previewFile(file: FileItem) {
    setPreviewUrl(file.url)
    setPreviewType(file.type)
  }

  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <File className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium">Aucun fichier</p>
          <p className="text-sm text-muted-foreground mt-1">
            Uploadez vos premiers fichiers
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mes fichiers</CardTitle>
          <CardDescription>{files.length} fichier{files.length > 1 ? "s" : ""} stocké{files.length > 1 ? "s" : ""}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                      {new Date(file.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {file.type.startsWith("image/") && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => previewFile(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <a href={file.url} download={file.name}>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteFile(file.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de prévisualisation */}
      {previewUrl && previewType?.startsWith("image/") && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={previewUrl}
              alt="Prévisualisation"
              className="max-w-full max-h-[80vh] rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => setPreviewUrl(null)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </>
  )
}