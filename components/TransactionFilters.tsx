"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function TransactionFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [type, setType] = useState(searchParams.get("type") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")

  function applyFilters() {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (type) params.set("type", type)
    if (category) params.set("category", category)
    
    router.push(`/dashboard/finance?${params.toString()}`)
  }

  function resetFilters() {
    setSearch("")
    setType("")
    setCategory("")
    router.push("/dashboard/finance")
  }

  const hasFilters = search || type || category

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyFilters()
            }}
            className="pl-9"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        >
          <option value="">Tous les types</option>
          <option value="INCOME">Revenus</option>
          <option value="EXPENSE">Dépenses</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        >
          <option value="">Toutes les catégories</option>
          <option value="Travail">Travail</option>
          <option value="Alimentation">Alimentation</option>
          <option value="Loyer">Loyer</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
          <option value="Santé">Santé</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Button onClick={applyFilters} size="sm">
          <Search className="mr-2 h-4 w-4" />
          Filtrer
        </Button>
        {hasFilters && (
          <Button onClick={resetFilters} variant="ghost" size="sm">
            <X className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  )
}