import prisma from "@/lib/prisma"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Users, Clock, AlertTriangle, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

async function fetchDashboardData() {
    // Total Active Projects
    const totalProjects = await prisma.project.count()

    // Total Pending Requests
    const totalPending = await prisma.checklistItem.count({
        where: { status: 'pending' }
    })

    // Average Time to Completion (hours)
    const completedTasks = await prisma.checklistItem.findMany({
        where: { status: 'completed' },
        select: { createdAt: true, updatedAt: true }
    })

    let avgHours = 0
    if (completedTasks.length > 0) {
        const totalMs = completedTasks.reduce((acc, task) => {
            return acc + (task.updatedAt.getTime() - task.createdAt.getTime())
        }, 0)
        avgHours = Math.round(totalMs / completedTasks.length / (1000 * 60 * 60))
    }

    // Bottleneck Clients
    const projects = await prisma.project.findMany({
        include: {
            items: true,
            user: true
        }
    })

    const bottlenecked = projects.map(p => {
        const pendingCount = p.items.filter(i => i.status === 'pending').length
        const total = p.items.length
        const progress = total > 0 ? Math.round(((total - pendingCount) / total) * 100) : 0
        return {
            ...p,
            pendingCount,
            progress
        }
    }).filter(p => p.pendingCount > 0).sort((a, b) => b.pendingCount - a.pendingCount)

    return { totalProjects, totalPending, avgHours, bottlenecked }
}

export default async function DashboardPage() {
    const data = await fetchDashboardData()

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Header />
            <main className="flex-1 py-12 px-4 sm:px-6 container max-w-6xl mx-auto space-y-12">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Agency Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Overview of all active client onboarding pipelines.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="subtle-3d-card bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
                        <div className="p-4 bg-primary/10 rounded-full text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Projects</p>
                            <h3 className="text-3xl font-bold">{data.totalProjects}</h3>
                        </div>
                    </div>

                    <div className="subtle-3d-card bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
                        <div className="p-4 bg-amber-500/10 rounded-full text-amber-500">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Tasks</p>
                            <h3 className="text-3xl font-bold">{data.totalPending}</h3>
                        </div>
                    </div>

                    <div className="subtle-3d-card bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-500">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg. Completion</p>
                            <h3 className="text-3xl font-bold">{data.avgHours} <span className="text-lg text-muted-foreground font-normal">hours</span></h3>
                        </div>
                    </div>
                </div>

                {/* Bottleneck Table */}
                <div className="subtle-3d-card bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border bg-muted/30">
                        <h2 className="text-xl font-bold">Bottlenecked Projects</h2>
                        <p className="text-sm text-muted-foreground mt-1">Clients with the highest number of pending tasks.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Pending</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.bottlenecked.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No bottlenecked projects found. Great job!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.bottlenecked.map(project => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-xs font-bold text-primary">
                                                        {project.clientName ? project.clientName.charAt(0).toUpperCase() : (project.user?.name?.charAt(0) || '?')}
                                                    </div>
                                                    <div>
                                                        <p>{project.clientName || project.user?.name}</p>
                                                        <p className="text-xs text-muted-foreground">{project.clientEmail || project.user?.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{project.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div className="h-full bg-amber-500" style={{ width: `${project.progress}%` }}></div>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                                                    {project.pendingCount} blocked
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {new Date(project.updatedAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="outline" className="gap-2">
                                                    <Send className="w-3 h-3" /> Reminder
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    )
}
