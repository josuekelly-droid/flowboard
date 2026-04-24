import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, DollarSign, CheckSquare, Folder, ArrowRight, Star, Users, Menu } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Gérez votre activité freelance{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              simplement
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            FlowBoard centralise vos finances, tâches et fichiers en un seul endroit.
            Plus besoin de jongler entre 10 outils.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/login">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                Découvrir les fonctionnalités
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BadgeCheck className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-green-500" />
              <span>Gratuit</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              <span>+1000 utilisateurs</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-yellow-500" />
              <span>4.9/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              FlowBoard remplace 3 outils en 1. Économisez du temps et de l&apos;argent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <DollarSign className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Finances</CardTitle>
                <CardDescription className="text-sm">
                  Suivez vos revenus et dépenses en temps réel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li>✅ Suivi des transactions</li>
                  <li>✅ Graphiques de répartition</li>
                  <li>✅ Export PDF des rapports</li>
                  <li>✅ Solde en temps réel</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <CheckSquare className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Tâches</CardTitle>
                <CardDescription className="text-sm">
                  Organisez vos projets en mode Kanban
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li>✅ Tableau Kanban intuitif</li>
                  <li>✅ Drag & Drop fluide</li>
                  <li>✅ Priorités (Basse/Moyenne/Haute)</li>
                  <li>✅ Dates d&apos;échéance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Folder className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Fichiers</CardTitle>
                <CardDescription className="text-sm">
                  Stockez et partagez vos documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li>✅ Upload par glisser-déposer</li>
                  <li>✅ Prévisualisation d&apos;images</li>
                  <li>✅ Téléchargement rapide</li>
                  <li>✅ Stockage sécurisé</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Prêt à booster votre productivité ?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8">
            Rejoignez les freelances qui ont simplifié leur gestion quotidienne.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-base sm:text-lg px-8 sm:px-12 w-full sm:w-auto">
              Démarrer maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Pourquoi FlowBoard ?</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            En tant que freelance, vous perdez un temps précieux à jongler entre
            vos tableurs Excel, vos to-do lists et votre explorateur de fichiers.
            FlowBoard a été conçu pour centraliser ces trois piliers en une seule
            interface fluide et intuitive. Moins de friction, plus de création.
          </p>
        </div>
      </section>
    </div>
  )
}