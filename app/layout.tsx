export const runtime = "nodejs"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/ThemeProvider"
import { PublicNavbar } from "@/components/PublicNavbar"
import { Footer } from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: "FlowBoard - Hub de Productivité pour Freelances",
    template: "%s | FlowBoard",
  },
  description:
    "FlowBoard centralise vos finances, tâches et fichiers en un seul endroit. Le hub de productivité conçu pour les freelances et créatifs.",
  keywords: [
    "productivité",
    "freelance",
    "gestion de projet",
    "kanban",
    "finances",
    "facturation",
    "organisation",
    "flowboard",
  ],
  authors: [{ name: "FlowBoard" }],
  creator: "FlowBoard",
  publisher: "FlowBoard",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://flowboard.vercel.app",
    siteName: "FlowBoard",
    title: "FlowBoard - Hub de Productivité pour Freelances",
    description:
      "Centralisez vos finances, tâches et fichiers en un seul endroit.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowBoard - Hub de Productivité",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowBoard - Hub de Productivité",
    description:
      "Centralisez vos finances, tâches et fichiers en un seul endroit.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://flowboard.vercel.app",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider>
            <PublicNavbar />
            {children}
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}