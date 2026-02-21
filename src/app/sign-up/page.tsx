"use client"

import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signUpAction } from "../actions/user-auth"

export default function SignUpPage() {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast.loading("Creating account...", { duration: 1000 })

        const formData = new FormData(e.currentTarget)
        const res = await signUpAction(formData)

        if (res.error) {
            toast.error(res.error)
            return
        }

        toast.success("Account created successfully!")
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_0%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_0%,#322557,transparent)] opacity-50"></div>

            <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Link href="/" className="flex justify-center mb-8 hover:opacity-90 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="Onboardify Logo"
                        width={220}
                        height={50}
                        className="w-auto h-10 object-contain drop-shadow-sm"
                        priority
                    />
                </Link>

                <div className="subtle-3d-card p-8 sm:p-10 rounded-3xl bg-card border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-amber-500"></div>

                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight">Get Started</h1>
                        <p className="text-sm text-muted-foreground">Create your account and perfect your onboarding.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Work Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-6 flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" /> Create Account
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <button type="button" className="w-full bg-background border border-border font-medium py-3 rounded-lg shadow-sm hover:bg-muted hover:shadow transition-all duration-300 flex items-center justify-center gap-2">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.25024 6.60998L5.27028 9.76498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L20.1 21.25C22.45 19.1 23.49 15.965 23.49 12.275Z" fill="#4285F4"></path><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.23999 6.54998C0.474976 8.04998 0 9.76498 0 11.9999C0 14.2349 0.474976 15.9499 1.23999 17.4499L5.26498 14.2949Z" fill="#FBBC05"></path><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 20.1054 21.095L16.0804 17.945C14.9504 18.72 13.5804 19.2051 12.0004 19.2051C8.8704 19.2051 6.21537 17.095 5.26538 14.195L1.24036 17.35C3.25538 21.2699 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path></svg>
                        Google
                    </button>
                </div>

                <p className="text-center text-sm text-muted-foreground pt-4">
                    Already have an account? <Link href="/sign-in" className="text-primary hover:underline font-semibold">Sign in</Link>
                </p>
            </div>
        </div>
    )
}
