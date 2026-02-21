import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CalendarDays, GitCommitHorizontal } from "lucide-react"

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />
            <main className="flex-1 py-16 px-6 relative">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#d5c5ff,transparent)] dark:bg-[radial-gradient(ellipse_at_top,#322557,transparent)] opacity-40"></div>

                <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Changelog</h1>
                    <p className="text-muted-foreground text-lg mb-12">New updates and improvements to Onboardify.</p>

                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">

                        {/* Entry 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm text-primary">
                                <GitCommitHorizontal className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] subtle-3d-card bg-card p-6 rounded-2xl border border-border">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg">Advanced Portal Features</h3>
                                    <time className="text-xs text-muted-foreground flex items-center gap-1 font-medium"><CalendarDays className="w-3 h-3" /> Nov 20, 2024</time>
                                </div>
                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>Huge update focusing on automation and security:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><strong className="text-foreground">Magic Link Auth:</strong> Passwordless, secure JWT access for clients.</li>
                                        <li><strong className="text-foreground">Vercel Blob Integrations:</strong> Secure drag-and-drop file uploads up to 10MB.</li>
                                        <li><strong className="text-foreground">Cron Emails:</strong> Automated daily reminders for bottlenecked clients.</li>
                                        <li><strong className="text-foreground">Admin Analytics:</strong> Powerful new dashboard overlooking project health.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Entry 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm text-muted-foreground">
                                <GitCommitHorizontal className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] subtle-3d-card bg-card p-6 rounded-2xl border border-border opacity-80 hover:opacity-100 transition-opacity">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg">The Foundation Update</h3>
                                    <time className="text-xs text-muted-foreground flex items-center gap-1 font-medium"><CalendarDays className="w-3 h-3" /> Oct 15, 2024</time>
                                </div>
                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>Initial release of Onboardify's core infrastructure.</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Interactive client portal checklists.</li>
                                        <li>Dark mode and responsive branding.</li>
                                        <li>Agency dashboard scaffolding.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
