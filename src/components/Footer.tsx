import Image from "next/image"
import Link from "next/link"
import { Github, Twitter, Linkedin, ArrowRight } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border bg-card/50 text-foreground pt-16 pb-8 flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_400px_at_50%_100%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_400px_at_50%_100%,#322557,transparent)] opacity-30"></div>
            <div className="container max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                            <Image
                                src="/logo.png"
                                alt="Onboardify Logo"
                                width={180}
                                height={40}
                                className="w-auto h-8 md:h-10 object-contain drop-shadow-sm"
                            />
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                            The modern standard for B2B client collaboration. Perfect your onboarding process, impress your clients, and keep projects perfectly organized from day one.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Link href="#" className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Github className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold tracking-tight text-foreground">Product</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/#features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold tracking-tight text-foreground">Company</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Sales</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Onboardify. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-medium text-muted-foreground">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
