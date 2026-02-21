"use server"

import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import prisma from "@/lib/prisma"

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "default_super_secret_key_for_dev_only"
)

export async function verifyClientEmail(slug: string, email: string) {
    try {
        // 1. Find the project and verify the provided clientEmail matches
        const project = await prisma.project.findUnique({
            where: { slug },
            select: { clientEmail: true },
        })

        if (!project) {
            return { error: "Project not found" }
        }

        if (!project.clientEmail) {
            return { error: "No client email is configured for this project. Please contact the agency." }
        }

        if (project.clientEmail.toLowerCase() !== email.toLowerCase()) {
            return { error: "Invalid email address for this portal." }
        }

        // 2. Issuing the JWT token using jose
        const token = await new SignJWT({ slug, email: project.clientEmail })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d") // Valid for 7 days
            .sign(JWT_SECRET)

        // 3. Set the HttpOnly Secure Cookie
        cookies().set({
            name: `portal_auth_${slug}`,
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: `/portal/${slug}`,
            sameSite: "lax",
        })

        return { success: true }
    } catch (error) {
        console.error("Auth action error:", error)
        return { error: "Internal Server Error" }
    }
}

export async function verifyToken(slug: string, token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload.slug === slug
    } catch (error) {
        return false
    }
}
