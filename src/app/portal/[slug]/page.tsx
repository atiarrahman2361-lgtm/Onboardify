import { ThemeToggle } from "@/components/theme-toggle"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ChecklistClientItem } from "@/components/ChecklistClientItem"

export default async function ClientPortal({ params }: { params: { slug: string } }) {
    // Fetch project data from database
    const project = await prisma.project.findUnique({
        where: { slug: params.slug },
        include: {
            user: true,
            items: {
                orderBy: { createdAt: "asc" }
            }
        }
    })

    if (!project) return notFound()

    const completedTasks = project.items.filter(t => t.status === "completed").length
    const totalTasks = project.items.length
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return (
        <div className="min-h-screen bg-background">
            {/* 3D Navbar */}
            <header className="sticky top-0 z-50 subtle-3d-navbar px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="text-primary font-bold text-lg leading-none">
                            {project.user.name ? project.user.name.charAt(0) : 'A'}
                        </span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground">{project.user.name}</h1>
                </div>
                <ThemeToggle />
            </header>

            <main className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
                {/* Hero Section */}
                <section className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Let&apos;s get your project started.
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Please complete the tasks below for <span className="font-medium text-foreground">{project.name}</span>.
                        All your files and information are securely saved.
                    </p>

                    <div className="max-w-md mx-auto mt-8 p-6 rounded-2xl subtle-3d-card bg-card/50">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-medium">Your Progress</span>
                            <span className="text-2xl font-bold text-amber-500">{progress}%</span>
                        </div>
                        <div className="h-4 w-full bg-muted rounded-full overflow-hidden border border-border inset-shadow-sm">
                            <div
                                className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3 text-left">
                            {completedTasks} of {totalTasks} tasks completed
                        </p>
                    </div>
                </section>

                {/* The Checklist */}
                <section className="space-y-6">
                    <h3 className="text-2xl font-bold border-b border-border pb-2">Required Items</h3>

                    <div className="grid gap-4">
                        {project.items.map((task, idx) => (
                            <ChecklistClientItem
                                key={task.id}
                                task={task}
                                projectId={project.slug}
                                index={idx}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
