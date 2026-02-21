import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Resend } from "resend"
import ReminderEmail from "@/emails/ReminderEmail"

// Initialize Resend
// In a real app, you would verify this exists or handle gracefully
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789')

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("authorization")
        const cronSecret = process.env.CRON_SECRET

        // 1. Secure the cron endpoint
        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json(
                { error: "Unauthorized. Invalid CRON_SECRET." },
                { status: 401 }
            )
        }

        // 2. Find projects with pending items that haven't been updated in 3 days
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)

        const stalledProjects = await prisma.project.findMany({
            where: {
                updatedAt: {
                    lt: threeDaysAgo,
                },
                items: {
                    some: {
                        status: "pending",
                    },
                },
                clientEmail: {
                    not: null, // Only fetch projects that actually have a client email
                }
            },
            include: {
                items: {
                    where: {
                        status: "pending"
                    }
                },
            },
        })

        if (stalledProjects.length === 0) {
            return NextResponse.json({ message: "No reminders needed today." })
        }

        // 3. Send emails
        const emailPromises = stalledProjects.map(async (project) => {
            // We asserted clientEmail is not null in the query
            if (!project.clientEmail) return null

            // Send via Resend
            return resend.emails.send({
                from: "Onboardify <hello@onboardify.com>",
                to: [project.clientEmail],
                subject: `Pending Tasks for ${project.name}`,
                react: ReminderEmail({
                    clientEmail: project.clientEmail,
                    projectName: project.name,
                    portalUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://onboardify.com'}/portal/${project.slug}`,
                    pendingCount: project.items.length,
                }),
            })
        })

        const results = await Promise.all(emailPromises)

        return NextResponse.json({
            message: `Successfully processed ${stalledProjects.length} reminders.`,
            results,
        })
    } catch (error) {
        console.error("Cron Reminder Error:", error)
        return NextResponse.json(
            { error: "Internal Server Error during cron job." },
            { status: 500 }
        )
    }
}
