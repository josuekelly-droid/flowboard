"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

export function PublicNavbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">FlowBoard</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Fonctionnalités
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            À propos
          </Link>
          <ModeToggle />
          {session ? (
            <Link href="/dashboard">
              <Avatar className="h-9 w-9 hover:ring-2 hover:ring-primary transition-all">
                <AvatarImage src={session.user?.image || undefined} />
                <AvatarFallback className="text-sm">
                  {(session.user?.name || session.user?.email || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/login">
              <Button>Se connecter</Button>
            </Link>
          )}
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          {session ? (
            <Link href="/dashboard">
              <Avatar className="h-8 w-8 hover:ring-2 hover:ring-primary transition-all">
                <AvatarImage src={session.user?.image || undefined} />
                <AvatarFallback className="text-xs">
                  {(session.user?.name || session.user?.email || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm">Connexion</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}