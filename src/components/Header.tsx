import { getSession } from "@/lib/auth/session"
import { HeaderClient } from "./HeaderClient"

export async function Header() {
    const session = await getSession()
    const email = session?.email as string | undefined

    return <HeaderClient userEmail={email} />
}
