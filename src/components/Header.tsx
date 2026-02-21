import { getSession } from "@/lib/auth/session"
import prisma from "@/lib/prisma"
import { HeaderClient } from "./HeaderClient"

export async function Header() {
    const session = await getSession()
    const email = session?.email as string | undefined
    let image: string | undefined = undefined

    if (session?.userId) {
        const user = await prisma.user.findUnique({
            where: { id: session.userId as string },
            select: { image: true }
        })
        if (user?.image) {
            image = user.image
        }
    }

    return <HeaderClient userEmail={email} userImage={image} />
}
