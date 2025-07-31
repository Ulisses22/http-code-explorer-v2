import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://ulisses22.github.io/http-code-explorer-v2/"),
  title: "HTTP Status Codes Explorer - Comprehensive Guide & Examples",
  description:
    "Explore, understand, and learn about all HTTP Status Codes (1XX, 2XX, 3XX, 4XX, 5XX) with detailed descriptions, code examples, and developer tips. A comprehensive guide for web developers and API enthusiasts.",
  keywords: [
    "HTTP status codes",
    "web development",
    "API",
    "REST",
    "status codes",
    "HTTP",
    "developer tools",
    "frontend",
    "backend",
    "error codes",
    "success codes",
    "redirection codes",
  ],
  authors: [{ name: "Ulisses Alves", url: "https://ulissesalves.nexgate.ch/" }],
  creator: "Ulisses Alves",
  publisher: "Vercel v0",
  openGraph: {
    title: "HTTP Status Codes Explorer - Comprehensive Guide & Examples",
    description:
      "Explore, understand, and learn about all HTTP Status Codes (1XX, 2XX, 3XX, 4XX, 5XX) with detailed descriptions, code examples, and developer tips.",
    url: "https://ulisses22.github.io/http-code-explorer-v2/",
    siteName: "HTTP Status Codes Explorer",
    images: [
      {
        url: "/http-code-explorer-v2-logo.png?height=630&width=1200", // Imagem de placeholder
        width: 1200,
        height: 630,
        alt: "HTTP Status Codes Explorer Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTTP Status Codes Explorer - Comprehensive Guide & Examples",
    description:
      "Explore, understand, and learn about all HTTP Status Codes (1XX, 2XX, 3XX, 4XX, 5XX) with detailed descriptions, code examples, and developer tips.",
    images: ["/placeholder.svg?height=675&width=1200"], // Imagem de placeholder
  },
  alternates: {
    canonical: "https://ulisses22.github.io/http-code-explorer-v2/",
  },
    generator: 'v0.dev'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {children}
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      </body>
    </html>
  )
}
