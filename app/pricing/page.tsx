import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="px-4 py-24">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-4">Tarifs</h1>
        <p className="text-lg text-muted-foreground mb-12">
          FlowBoard est actuellement gratuit et en phase beta.
        </p>
        <Card className="max-w-sm mx-auto border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-2xl">Gratuit</CardTitle>
            <CardDescription>Pour toujours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-4xl font-bold">0 €</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-green-500" />
                Transactions illimitées
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-green-500" />
                Tâches illimitées
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-green-500" />
                Stockage 1 Go
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-green-500" />
                Support par email
              </li>
            </ul>
            <Link href="/login" className="block">
              <Button className="w-full">Commencer</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}