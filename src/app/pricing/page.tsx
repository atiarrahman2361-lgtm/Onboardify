import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Check, Info } from "lucide-react"
import Link from "next/link"
import { getSession } from "@/lib/auth/session"

export default async function PricingPage() {
    const session = await getSession()
    const targetLink = session?.userId ? "/dashboard/settings/billing" : "/sign-up"
    const buttonText = session?.userId ? "Manage Subscription" : "Get Started"

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />

            <main className="flex-1 py-24 px-4 sm:px-6 relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] -z-10 bg-[radial-gradient(ellipse_at_top,#d5c5ff,transparent)] dark:bg-[radial-gradient(ellipse_at_top,#322557,transparent)] opacity-50"></div>

                <div className="max-w-7xl mx-auto text-center space-y-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        Simple, transparent pricing.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        No hidden fees. No surprise charges. Choose the plan that best fits your agency's scale.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
                    {/* Starter Plan */}
                    <div className="subtle-3d-card bg-card border border-border rounded-3xl p-8 flex flex-col relative h-full animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">Starter</h3>
                            <p className="text-muted-foreground text-sm">Perfect for freelancers and solo agencies just getting started.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-extrabold">$29</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <Link href={targetLink} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold py-3 rounded-xl transition-colors text-center mb-8">
                            {buttonText}
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Up to 5 active clients</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Standard onboarding templates</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">1GB Secure Storage</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Email Support</span></li>
                        </ul>
                    </div>

                    {/* Professional Plan */}
                    <div className="subtle-3d-card bg-card border-2 border-primary rounded-3xl p-8 flex flex-col relative h-full shadow-2xl shadow-primary/10 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200 scale-105 z-10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">Professional</h3>
                            <p className="text-muted-foreground text-sm">Everything you need to scale your agency operations flawlessly.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-extrabold">$79</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <Link href={targetLink} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-semibold py-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-center mb-8">
                            {buttonText}
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-medium">Unlimited active clients</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /><span className="text-sm">Custom branding & domain</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /><span className="text-sm">100GB Secure Storage</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /><span className="text-sm">Priority Support</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /><span className="text-sm">Webhooks & API Access</span></li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="subtle-3d-card bg-card border border-border rounded-3xl p-8 flex flex-col relative h-full animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                            <p className="text-muted-foreground text-sm">Advanced security and control for large organizations.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-extrabold">$199</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <Link href="/contact" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold py-3 rounded-xl transition-colors text-center mb-8">
                            Contact Sales
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Everything in Professional, plus:</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Unlimited Storage</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Single Sign-On (SSO)</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Dedicated Account Manager</span></li>
                            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-sm">Custom MSA & SLA</span></li>
                        </ul>
                    </div>
                </div>

                {/* FAQ Snippet for Pricing */}
                <div className="max-w-4xl mx-auto mt-32 space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-3xl font-bold">Frequently asked about pricing</h2>
                        <p className="text-muted-foreground text-lg">Everything you need to know about our billing and plans.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl subtle-3d-card bg-card mb-4 flex gap-4">
                            <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Can I cancel at any time?</h3>
                                <p className="text-muted-foreground">Yes, all our plans are month-to-month. You can cancel your subscription at any time without any hidden fees or cancellation penalties.</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl subtle-3d-card bg-card mb-4 flex gap-4">
                            <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Do you offer annual discounts?</h3>
                                <p className="text-muted-foreground">Yes! If you choose to pay annually, you will receive a 20% discount across all tiers. Contact sales to set up an annual plan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

