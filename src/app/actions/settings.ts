"use server"

import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth/session"
import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"

export async function updateProfileAction(formData: FormData) {
    const session = await getSession()
    if (!session || !session.userId) {
        return { error: "Unauthorized" }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string

    if (!name || !email) {
        return { error: "Name and email are required" }
    }

    try {
        await prisma.user.update({
            where: { id: session.userId as string },
            data: { name, email },
        })

        revalidatePath("/dashboard")
        return { success: true }
    } catch (error) {
        console.error("Failed to update profile", error)
        return { error: "Failed to update profile settings" }
    }
}

export async function uploadAvatarAction(formData: FormData) {
    const session = await getSession()
    if (!session || !session.userId) {
        return { error: "Unauthorized" }
    }

    const file = formData.get("file") as File
    if (!file) {
        return { error: "No file provided" }
    }

    try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            // Mock upload by converting to base64 if no Blob token is configured
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`

            await prisma.user.update({
                where: { id: session.userId as string },
                data: { image: base64Data },
            })

            revalidatePath("/dashboard")
            return { success: true, url: base64Data }
        }

        const blob = await put(`avatars/${session.userId}-${file.name}`, file, {
            access: "public",
        })

        await prisma.user.update({
            where: { id: session.userId as string },
            data: { image: blob.url },
        })

        revalidatePath("/dashboard")
        return { success: true, url: blob.url }
    } catch (error) {
        console.error("Failed to upload avatar", error)
        return { error: "Failed to upload avatar" }
    }
}

export async function updateAgencyAction(formData: FormData) {
    const session = await getSession()
    if (!session || !session.userId) {
        return { error: "Unauthorized" }
    }

    const companyName = formData.get("companyName") as string
    const supportEmail = formData.get("supportEmail") as string

    if (!companyName || !supportEmail) {
        return { error: "Company name and support email are required" }
    }

    try {
        await prisma.user.update({
            where: { id: session.userId as string },
            data: { companyName, supportEmail },
        })

        revalidatePath("/dashboard")
        return { success: true }
    } catch (error) {
        console.error("Failed to update agency settings", error)
        return { error: "Failed to update agency settings" }
    }
}
