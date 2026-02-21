export default function AgencySettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Agency Workspace</h3>
                <p className="text-sm text-muted-foreground">
                    Configure your company branding and details that clients will see.
                </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-3 min-h-[300px]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h4 className="text-lg font-semibold">Workspace Settings Coming Soon</h4>
                <p className="text-sm text-muted-foreground max-w-sm">
                    This module is under active development. You will soon be able to set your company name, custom domain, and white-labeling options.
                </p>
            </div>
        </div>
    )
}
