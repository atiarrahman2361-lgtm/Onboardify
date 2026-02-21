"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Building, Bell, Shield, CreditCard } from "lucide-react"

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/dashboard/settings/profile",
        icon: User,
    },
    {
        title: "Agency Workspace",
        href: "/dashboard/settings/agency",
        icon: Building,
    },
    {
        title: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Bell,
    },
    {
        title: "Security",
        href: "/dashboard/settings/security",
        icon: Shield,
    },
    {
        title: "Billing",
        href: "/dashboard/settings/billing",
        icon: CreditCard,
    },
]

interface SettingsSidebarProps extends React.HTMLAttributes<HTMLElement> { }

export function SettingsSidebar({ className, ...props }: SettingsSidebarProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {sidebarNavItems.map((item) => {
                const Icon = item.icon
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline-block">{item.title}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
