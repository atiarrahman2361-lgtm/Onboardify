import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Onboardify | The Modern Standard for B2B Client Onboarding",
  description: "Deliver a premium, frictionless onboarding experience for your B2B clients. Keep projects on track, organize documents securely, and shine from day one.",
  keywords: ["Client Onboarding", "B2B SaaS", "Client Portal", "Document Management", "Onboarding Software", "Professional Services"],
  authors: [{ name: "Onboardify Team" }],
  openGraph: {
    title: "Onboardify | Streamline Client Onboarding",
    description: "The modern standard for B2B client collaboration. Perfect your onboarding process.",
    url: "https://onboardify.com",
    siteName: "Onboardify",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Onboardify Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onboardify | Perfect Client Onboarding",
    description: "Deliver a premium onboarding experience for your B2B clients.",
    images: ["/logo.png"],
  },
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
