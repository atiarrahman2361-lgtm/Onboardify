"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { verifyClientEmail } from "@/app/actions/auth"
import { Lock, ArrowRight, Loader2 } from "lucide-react"

export default function PortalLoginPage({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        startTransition(async () => {
            const result = await verifyClientEmail(params.slug, email)
            if (result?.error) {
                setError(result.error)
            } else {
                // Success! The cookie is set. Redirect to the portal.
                router.push(`/portal/${params.slug}`)
                router.refresh() // Ensure middleware runs and page data is fresh
            }
        })
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_0%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_0%,#322557,transparent)] opacity-50"></div>

            <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/logo.png"
                        alt="Onboardify Logo"
                        width={180}
                        height={40}
                        className="w-auto h-8 opacity-80"
                        priority
                    />
                </div>

                <div className="subtle-3d-card p-8 sm:p-10 rounded-3xl bg-card border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-amber-500"></div>

                    <div className="text-center space-y-3 mb-8">
                        <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 border border-primary/20">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Secure Portal Access</h1>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Enter your email address to access your secure project portal and pending tasks.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="client@company.com"
                                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                                required
                                disabled={isPending}
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20 text-center animate-in fade-in zoom-in duration-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-6 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                                </>
                            ) : (
                                <>
                                    Access Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-muted-foreground mt-8">
                        Protected by enterprise-grade encryption. Your connection is secure.
                    </p>
                </div>
            </div>
        </div>
    )
}
