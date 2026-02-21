import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />
            <main className="flex-1 py-12 px-6 relative">
                {/* Glow Effects */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_0%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_0%,#322557,transparent)] opacity-60"></div>

                <div className="max-w-3xl mx-auto space-y-8 subtle-3d-card p-8 md:p-12 rounded-3xl bg-card border-border shadow-xl">
                    <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground">Effective Date: {new Date().toLocaleDateString()}</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We collect information you provide directly to us when using Onboardify, including account details, uploaded documents, and communication logs. We also collect usage data to improve our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. How We Use Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use your data strictly to operate and maintain the platform, communicate with you regarding your projects, and ensure the security of your onboarding processes.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. Data Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Onboardify employs industry-standard security measures to protect your data. All documents are encrypted at rest and in transit.
                        </p>
                    </section>

                    <p className="text-muted-foreground pt-8 border-t border-border">
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
