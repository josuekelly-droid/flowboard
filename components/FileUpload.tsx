"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, File, Loader2 } from "lucide-react"

export function FileUpload() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024,
  })

  async function handleUpload() {
    if (selectedFiles.length === 0) return
    setUploading(true)

    for (const file of selectedFiles) {
      const formData = new FormData()
      formData.append("file", file)
      await fetch("/api/files/upload", { method: "POST", body: formData })
    }

    setSelectedFiles([])
    setUploading(false)
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Uploader des fichiers</CardTitle>
        <CardDescription className="text-sm">Glissez-déposez ou cliquez pour sélectionner</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-8 sm:h-12 w-8 sm:w-12 text-muted-foreground mb-2 sm:mb-4" />
          {isDragActive ? (
            <p className="text-sm sm:text-lg font-medium">Déposez les fichiers ici...</p>
          ) : (
            <>
              <p className="text-sm sm:text-lg font-medium">Glissez-déposez vos fichiers ici</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                ou cliquez pour parcourir (max 10 MB)
              </p>
            </>
          )}
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2 sm:space-y-3">
            <p className="font-medium text-sm">
              {selectedFiles.length} fichier{selectedFiles.length > 1 ? "s" : ""} sélectionné{selectedFiles.length > 1 ? "s" : ""} :
            </p>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted rounded-lg p-2 sm:p-3 gap-2"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <File className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate max-w-[150px] sm:max-w-[300px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
                  onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))}
                >
                  <X className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={handleUpload} disabled={uploading} className="w-full" size="sm">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Upload en cours...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Uploader {selectedFiles.length} fichier{selectedFiles.length > 1 ? "s" : ""}
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}