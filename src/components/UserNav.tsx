"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signOutAction } from "@/lib/auth/session"

interface UserNavProps {
    email: string
    image?: string
}

export function UserNav({ email, image }: UserNavProps) {
    const router = useRouter()

    const handleSignOut = async () => {
        toast.loading("Signing out...", { duration: 1000 })
        await signOutAction()
        setTimeout(() => {
            router.push("/sign-in")
            router.refresh()
            toast.success("Successfully signed out")
        }, 1000)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative h-10 w-10 rounded-full bg-primary/10 border-primary/20 hover:bg-primary/20 focus:ring-2 focus:ring-primary focus:outline-none transition-all overflow-hidden p-0">
                    {image ? (
                        <Image src={image} alt="Avatar" fill className="object-cover" />
                    ) : (
                        <User className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings/profile" className="cursor-pointer flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive cursor-pointer flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
