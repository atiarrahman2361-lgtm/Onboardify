import { Button } from "@/components/ui/button"
import { CreditCard, Download, CheckCircle2 } from "lucide-react"
import { SubscriptionButton } from "@/components/SubscriptionButton"
import { getSession } from "@/lib/auth/session"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function BillingSettingsPage() {
    const session = await getSession()
    if (!session) {
        redirect("/sign-in")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.userId as string },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
        }
    })

    const isPro = !!(
        user?.stripeSubscriptionId &&
        user.stripeCurrentPeriodEnd &&
        user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    )

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h3 className="text-lg font-medium">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your subscription plan and payment methods.
                </p>
            </div>

            <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4 transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-lg flex items-center">
                                {isPro ? "Professional Plan" : "Free Plan"}
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${isPro ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                                    {isPro ? "Active" : "Current"}
                                </span>
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                {isPro ? "You are currently on the Professional plan. Billed at $49/month." : "You are currently on the Free plan. Upgrade for more features."}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{isPro ? "$49" : "$0"}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                        </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium mb-3">Plan Features:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            {isPro ? (
                                <>
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Unlimited Projects</span>
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 100GB Secure Storage</span>
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Custom Branding</span>
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Priority Support</span>
                                </>
                            ) : (
                                <>
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-muted-foreground" /> 1 Project</span>
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-muted-foreground" /> 500MB Storage</span>
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-muted-foreground" /> Standard Support</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <SubscriptionButton isPro={isPro} />
                    </div>
                </div>

                {isPro && (
                    <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4 transition-all hover:shadow-md">
                        <h4 className="font-semibold">Payment Methods</h4>
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Card on file</p>
                                    <p className="text-xs text-muted-foreground">Managed via Stripe</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <a href="/api/stripe/portal">Edit</a>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
