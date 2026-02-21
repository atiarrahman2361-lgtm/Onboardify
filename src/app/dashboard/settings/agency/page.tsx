import { getSession } from "@/lib/auth/session"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { AgencyForm } from "./AgencyForm"

export default async function AgencySettingsPage() {
    const session = await getSession()
    if (!session || !session.userId) {
        redirect("/sign-in")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.userId as string },
        select: { companyName: true, supportEmail: true }
    })

    if (!user) redirect("/sign-in")

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Agency Workspace</h3>
                <p className="text-sm text-muted-foreground">
                    Configure your company branding and details that clients will see.
                </p>
            </div>

            <AgencyForm
                initialCompanyName={user.companyName || ""}
                initialSupportEmail={user.supportEmail || ""}
            />
        </div>
    )
}
