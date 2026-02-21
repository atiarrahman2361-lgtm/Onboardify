import { Button } from "@/components/ui/button"
import { CreditCard, Download, CheckCircle2 } from "lucide-react"

export default function BillingSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your subscription plan and payment methods.
                </p>
            </div>

            <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-lg flex items-center">
                                Professional Plan <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">Active</span>
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                You are currently on the Professional plan. Billed at $49/month.
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">$49<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                        </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium mb-3">Plan Features:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Unlimited Projects</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 100GB Secure Storage</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Custom Branding</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Priority Support</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button>Manage Subscription</Button>
                        <Button variant="outline">Upgrade to Enterprise</Button>
                    </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
                    <h4 className="font-semibold">Payment Methods</h4>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Visa ending in 4242</p>
                                <p className="text-xs text-muted-foreground">Expires 12/2026</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto">
                        + Add Payment Method
                    </Button>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
                    <h4 className="font-semibold">Billing History</h4>
                    <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="py-3 px-4">Oct 1, 2026</td>
                                    <td className="py-3 px-4">$49.00</td>
                                    <td className="py-3 px-4"><span className="text-green-600 dark:text-green-400">Paid</span></td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 shadow-none"><Download className="w-4 h-4" /></Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">Sep 1, 2026</td>
                                    <td className="py-3 px-4">$49.00</td>
                                    <td className="py-3 px-4"><span className="text-green-600 dark:text-green-400">Paid</span></td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 shadow-none"><Download className="w-4 h-4" /></Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
