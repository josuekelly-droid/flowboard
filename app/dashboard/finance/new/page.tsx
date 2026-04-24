
export const runtime = "nodejs"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewTransactionPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  async function createTransaction(formData: FormData) {
    "use server"

    const session = await auth()
    if (!session?.user?.id) return

    const type = formData.get("type") as string
    const amount = parseFloat(formData.get("amount") as string)
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const date = new Date(formData.get("date") as string)

    await prisma.transaction.create({
      data: {
        type: type as "INCOME" | "EXPENSE",
        amount,
        category: category || "Autre",
        description: description || null,
        date,
        userId: session.user.id,
      },
    })

    redirect("/dashboard/finance")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/finance">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nouvelle transaction</h1>
          <p className="text-muted-foreground">Ajoutez un revenu ou une dépense</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails de la transaction</CardTitle>
          <CardDescription>Remplissez les informations ci-dessous</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTransaction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <select
                id="type"
                name="type"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="INCOME">Revenu</option>
                <option value="EXPENSE">Dépense</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Montant *</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                name="category"
                placeholder="Ex: Travail, Alimentation, Loyer..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Ex: Salaire de janvier"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Enregistrer la transaction
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}