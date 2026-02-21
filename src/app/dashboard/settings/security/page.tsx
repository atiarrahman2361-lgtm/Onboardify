import { Button } from "@/components/ui/button"

export default function SecuritySettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Security</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your password and authentication settings.
                </p>
            </div>

            <div className="space-y-6 max-w-xl">
                <div className="space-y-4 p-6 rounded-xl border border-border bg-card shadow-sm">
                    <h4 className="font-semibold">Change Password</h4>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Current Password</label>
                        <input
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">New Password</label>
                        <input
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <input
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="pt-2">
                        <Button>Update Password</Button>
                    </div>
                </div>

                <div className="space-y-4 p-6 rounded-xl border border-red-200/50 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20 shadow-sm">
                    <h4 className="font-semibold text-red-600 dark:text-red-400">Danger Zone</h4>
                    <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated projects. This action cannot be undone.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                </div>
            </div>
        </div>
    )
}
