import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Users, Target, ShieldCheck } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />
            <main className="flex-1 py-16 px-6 relative">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_0%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_0%,#322557,transparent)] opacity-40"></div>

                <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <section className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Transforming the way agencies work with clients.</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Onboardify was built out of frustration with messy email threads, lost attachments, and constantly asking "Where are we on this project?" We believe onboarding should be the highlight of a new client's experience.
                        </p>
                    </section>

                    <div className="grid md:grid-cols-3 gap-8 py-8">
                        <div className="subtle-3d-card bg-card p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-primary/10 rounded-full text-primary">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl">Our Mission</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">To eliminate friction in B2B service delivery and empower agencies to look like global enterprises from day one.</p>
                        </div>
                        <div className="subtle-3d-card bg-card p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-amber-500/10 rounded-full text-amber-500">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl">Our Focus</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">We obsess over the client experience. If the portal isn't drop-dead gorgeous and perfectly simple, it fails our test.</p>
                        </div>
                        <div className="subtle-3d-card bg-card p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-500">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl">Our Promise</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Enterprise-grade security, 99.9% uptime, and a platform that respects your brand above all else.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
