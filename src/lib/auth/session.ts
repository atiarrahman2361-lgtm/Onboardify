"use server"

import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_super_secret_key_for_dev_only'
)

export async function getSession() {
    const token = cookies().get("auth_token")?.value
    if (!token) return null

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload
    } catch (error) {
        return null
    }
}

export async function signOutAction() {
    cookies().delete("auth_token")
    return { success: true }
}
