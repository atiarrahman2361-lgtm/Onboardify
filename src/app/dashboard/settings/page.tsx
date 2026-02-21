import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ProfileForm } from "./ProfileForm"

export default async function ProfileSettingsPage() {
    const session = await getSession()
    if (!session || !session.userId) {
        redirect("/sign-in")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.userId as string },
        select: { name: true, email: true, image: true }
    })

    if (!user) redirect("/sign-in")

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>

            <ProfileForm
                initialName={user.name || ""}
                initialEmail={user.email || ""}
                initialImage={user.image}
            />
        </div>
    )
}
