
export const runtime = "nodejs"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { prisma } from "@/lib/prisma"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  async function updateProfile(formData: FormData) {
    "use server"

    const session = await auth()
    if (!session?.user?.id) return

    const name = formData.get("name") as string
    const image = formData.get("image") as string

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || null,
        image: image || null,
      },
    })

    redirect("/dashboard/profile")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Profil</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          Gérez vos informations personnelles
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informations</CardTitle>
          <CardDescription className="text-sm">
            Connecté avec : {session.user.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 shrink-0">
                <AvatarImage src={session.user.image || undefined} />
                <AvatarFallback className="text-xl sm:text-2xl">
                  {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 w-full space-y-2">
                <Label htmlFor="image">URL de l&apos;avatar</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://exemple.com/avatar.jpg"
                  defaultValue={session.user.image || ""}
                  className="text-sm"
                />
              </div>
            </div>

            
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                name="name"
                placeholder="Votre nom"
                defaultValue={session.user.name || ""}
                className="text-sm"
              />
            </div>

            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={session.user.email || ""}
                disabled
                className="text-sm bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                L&apos;email ne peut pas être modifié.
              </p>
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              Enregistrer les modifications
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}