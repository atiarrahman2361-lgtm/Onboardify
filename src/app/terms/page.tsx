import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />
            <main className="flex-1 py-12 px-6 relative">
                {/* Glow Effects */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_0%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_0%,#322557,transparent)] opacity-60"></div>

                <div className="max-w-3xl mx-auto space-y-8 subtle-3d-card p-8 md:p-12 rounded-3xl bg-card border-border shadow-xl">
                    <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
                    <p className="text-lg text-muted-foreground">Effective Date: {new Date().toLocaleDateString()}</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing or using Onboardify, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. User Responsibilities</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. Ensure you have the right to upload any documents or data to the platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. Service Limitations</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            While we strive for 100% uptime, Onboardify is provided "as is". We reserve the right to modify, suspend, or discontinue the service at any time without notice.
                        </p>
                    </section>

                    <p className="text-muted-foreground pt-8 border-t border-border">
                        These terms are governed by applicable local laws. For legal inquiries, please reach out to our team.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
