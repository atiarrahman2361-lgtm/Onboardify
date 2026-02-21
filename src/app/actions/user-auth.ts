"use server"

import { cookies } from "next/headers"
import prisma from "@/lib/prisma"
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_super_secret_key_for_dev_only'
)

export async function signUpAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Email and password are required" }
    }

    try {
        // Simple check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: "User already exists with this email" }
        }

        // Create the user (In production, hash the password!)
        const user = await prisma.user.create({
            data: {
                email,
                name: email.split("@")[0]
            }
        })

        // Generate JWT
        const token = await new SignJWT({ userId: user.id, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30d')
            .sign(JWT_SECRET)

        cookies().set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/"
        })

        return { success: true }
    } catch (error) {
        console.error("Sign up error:", error)
        return { error: "Something went wrong during sign up" }
    }
}

export async function signInAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Email and password are required" }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return { error: "Invalid email or password" }
        }

        // Generate JWT
        const token = await new SignJWT({ userId: user.id, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30d')
            .sign(JWT_SECRET)

        cookies().set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/"
        })

        return { success: true }
    } catch (error) {
        console.error("Sign in error:", error)
        return { error: "Something went wrong during sign in" }
    }
}
