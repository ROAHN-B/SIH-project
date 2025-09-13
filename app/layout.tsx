import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
// ✅ 1. Import the AlertProvider
import { AlertProvider } from "@/app/contexts/alert-context"

export const metadata: Metadata = {
  title: "KrishiMitra - Smart Crop Advisory System",
  description: "Smart Crop Advisory System for Small and Marginal Farmers - SIH 25",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>
          {/* ✅ 2. Wrap your children with the AlertProvider */}
          <AlertProvider>{children}</AlertProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}