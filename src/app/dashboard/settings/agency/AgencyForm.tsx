"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { updateAgencyAction } from "@/app/actions/settings"

interface AgencyFormProps {
    initialCompanyName: string
    initialSupportEmail: string
}

export function AgencyForm({ initialCompanyName, initialSupportEmail }: AgencyFormProps) {
    const [companyName, setCompanyName] = useState(initialCompanyName)
    const [supportEmail, setSupportEmail] = useState(initialSupportEmail)
    const [isSaving, setIsSaving] = useState(false)

    const handleAgencySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSaving(true)
        const toastId = toast.loading("Saving workspace settings...")

        const formData = new FormData()
        formData.append("companyName", companyName)
        formData.append("supportEmail", supportEmail)

        const res = await updateAgencyAction(formData)

        if (res.error) {
            toast.error(res.error, { id: toastId })
        } else {
            toast.success("Workspace updated successfully", { id: toastId })
        }
        setIsSaving(false)
    }

    return (
        <form onSubmit={handleAgencySubmit} className="space-y-6 max-w-xl p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium leading-none">
                    Company / Agency Name
                </label>
                <input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Digital"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                />
                <p className="text-[0.8rem] text-muted-foreground">
                    This is the name clients will see in invitations and automated emails.
                </p>
            </div>

            <div className="space-y-2">
                <label htmlFor="supportEmail" className="text-sm font-medium leading-none">
                    Support Email Address
                </label>
                <input
                    id="supportEmail"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="support@acmedigital.com"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                />
                <p className="text-[0.8rem] text-muted-foreground">
                    Replies to automated platform emails will be directed to this address.
                </p>
            </div>

            <Button type="submit" disabled={isSaving}>
                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Workspace"}
            </Button>
        </form>
    )
}
