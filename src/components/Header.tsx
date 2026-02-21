"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: "Features", href: "/#features" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "FAQ", href: "/#faq" },
    ]

    return (
        <header className="sticky top-0 z-50 subtle-3d-navbar px-6 py-4 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300">
            <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="Onboardify Logo"
                        width={180}
                        height={40}
                        className="w-auto h-8 md:h-10 object-contain drop-shadow-sm"
                        priority
                    />
                </Link>
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-foreground hover:bg-accent rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <Link href="/sign-in" className="text-sm font-medium hover:text-primary transition-colors">
                    Sign In
                </Link>
                <Link href="/sign-up" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Get Started
                </Link>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden flex flex-col pt-6 pb-2 space-y-4 animate-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium text-foreground py-2 border-b border-border hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 pt-4">
                        <Link
                            href="/sign-in"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-center text-foreground font-medium py-3 border border-border rounded-lg subtle-3d-card"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-center bg-primary text-primary-foreground font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
