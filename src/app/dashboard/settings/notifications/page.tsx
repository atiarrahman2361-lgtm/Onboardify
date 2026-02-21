import { Switch } from "@/components/ui/switch"

export default function NotificationsSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Configure how you receive alerts and email reminders.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium">New Client Registration</label>
                        <p className="text-[0.8rem] text-muted-foreground">Receive an email when a new client signs up.</p>
                    </div>
                    <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium">Task Completed</label>
                        <p className="text-[0.8rem] text-muted-foreground">Receive an email when a client completes a checklist item.</p>
                    </div>
                    <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium">File Uploaded</label>
                        <p className="text-[0.8rem] text-muted-foreground">Receive an email when a client uploads a document.</p>
                    </div>
                    <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card opacity-50 cursor-not-allowed">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium">Marketing Emails</label>
                        <p className="text-[0.8rem] text-muted-foreground">Receive product updates from Onboardify.</p>
                    </div>
                    <Switch disabled />
                </div>
            </div>
        </div>
    )
}
