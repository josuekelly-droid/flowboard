import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">FlowBoard</h3>
            <p className="text-sm text-muted-foreground">
              Votre hub de productivité tout-en-un pour freelances et créatifs.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/mentions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/cgu" className="text-muted-foreground hover:text-foreground transition-colors">
                  CGU
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@flowboard.com</li>
              <li>rue de l'Innovation, Paris, France</li>
            </ul>
          </div> */}
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FlowBoard. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}