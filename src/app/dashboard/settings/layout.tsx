import { Metadata } from "next"
import { SettingsSidebar } from "@/components/SettingsSidebar"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageTransition } from "@/components/PageTransition"

export const metadata: Metadata = {
    title: "Settings | Onboardify",
    description: "Manage your agency and profile settings.",
}

export default async function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession()

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
                <div className="space-y-6">
                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                        <p className="text-muted-foreground text-sm">
                            Manage your agency workspace, personal profile, and advanced configurations.
                        </p>
                    </div>
                    <div className="shrink-0 bg-border h-[1px] w-full mb-8"></div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        <aside className="lg:w-1/4 xl:w-1/5 shrink-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                            <SettingsSidebar />
                        </aside>
                        <div className="flex-1 max-w-3xl">
                            <PageTransition>
                                {children}
                            </PageTransition>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
