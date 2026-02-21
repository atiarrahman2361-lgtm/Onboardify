import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding database...")

    // Clean up existing
    await prisma.checklistItem.deleteMany()
    await prisma.project.deleteMany()
    await prisma.user.deleteMany()

    // 1. Create User (Agency)
    const agency = await prisma.user.create({
        data: {
            name: "Acme Agency",
            email: "hello@acme.com",
        }
    })

    // 2. Create Project
    const project = await prisma.project.create({
        data: {
            slug: "demo-slug",
            name: "Website Redesign Assets",
            description: "Onboarding required items for Acme Agency",
            userId: agency.id
        }
    })

    // 3. Create Checklist Items
    await prisma.checklistItem.createMany({
        data: [
            {
                title: "Provide High-Res Logo",
                description: "Upload your company logo in SVG or PNG format.",
                type: "file_upload",
                status: "pending",
                projectId: project.id,
            },
            {
                title: "Company Bio & Tagline",
                description: "Short paragraph describing your business.",
                type: "text_input",
                status: "pending",
                projectId: project.id,
            },
            {
                title: "Brand Guidelines Received",
                description: "Confirm you have read the provided brand strategy outline.",
                type: "checkbox",
                status: "pending",
                projectId: project.id,
            }
        ]
    })

    console.log("Database seeded successfully with project slug: demo-slug")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
