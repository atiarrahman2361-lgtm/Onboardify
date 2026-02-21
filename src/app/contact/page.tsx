import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />
            <main className="flex-1 flex flex-col items-center py-12 px-6 relative">
                {/* Glow Effects */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_0%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_0%,#322557,transparent)] opacity-60"></div>

                <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Let's Connect</h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Ready to streamline your client onboarding? Reach out to our team to discuss your specific needs.
                    </p>

                    <form className="subtle-3d-card p-8 rounded-3xl mt-12 bg-card text-left space-y-6 shadow-xl border border-border">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Work Email</label>
                                <input
                                    type="email"
                                    placeholder="jane@company.com"
                                    className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Acme Corp"
                                    className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Estimated Monthly Clients</label>
                                <select className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all">
                                    <option value="1-10">1 - 10</option>
                                    <option value="11-50">11 - 50</option>
                                    <option value="51-200">51 - 200</option>
                                    <option value="200+">200+</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Project Details / Inquiry</label>
                            <textarea
                                rows={5}
                                placeholder="Tell us about your current onboarding process and what you're looking to improve..."
                                className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold text-lg py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
