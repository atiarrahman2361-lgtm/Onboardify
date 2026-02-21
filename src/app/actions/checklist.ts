"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { put } from "@vercel/blob"

export async function submitTextAction(itemId: string, projectId: string, textValue: string) {
    if (!textValue || textValue.trim() === "") {
        return { error: "Text cannot be empty." }
    }

    try {
        await prisma.checklistItem.update({
            where: { id: itemId },
            data: {
                value: textValue,
                status: "completed",
            },
        })

        revalidatePath(`/portal/${projectId}`)
        return { success: true }
    } catch (error) {
        console.error("Failed to submit text:", error)
        return { error: "Failed to update item." }
    }
}

export async function toggleCheckboxAction(itemId: string, projectId: string) {
    try {
        await prisma.checklistItem.update({
            where: { id: itemId },
            data: {
                status: "completed",
                value: "true",
            },
        })

        revalidatePath(`/portal/${projectId}`)
        return { success: true }
    } catch (error) {
        console.error("Failed to toggle checkbox:", error)
        return { error: "Failed to update item." }
    }
}

export async function uploadFileAction(formData: FormData, itemId: string, projectId: string) {
    const file = formData.get("file") as File
    if (!file) {
        return { error: "No file provided." }
    }

    try {
        const blob = await put(file.name, file, { access: 'public' })

        await prisma.checklistItem.update({
            where: { id: itemId },
            data: {
                value: blob.url,
                status: "completed",
            },
        })

        revalidatePath(`/portal/${projectId}`)
        return { success: true, url: blob.url }
    } catch (error) {
        console.error("Failed to upload file:", error)
        return { error: "Failed to upload file to Vercel Blob." }
    }
}
