"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

interface SubscriptionButtonProps {
    isPro: boolean;
}

export function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isPro) {
                const response = await fetch("/api/stripe/portal")

                if (!response.ok) {
                    throw new Error("Failed to load portal")
                }

                // Portal redirects directly, but if it returns JSON we'd use that.
                // Our /api/stripe/portal GET route does NextResponse.redirect(url), 
                // which might be tricky in fetch. 
                // Let's change how we handle it:
                window.location.href = "/api/stripe/portal"
            } else {
                const response = await fetch("/api/stripe/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // In a real app, you'd fetch this from your env or db
                        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_123456789",
                    }),
                })

                if (!response.ok) {
                    throw new Error("Failed to load checkout")
                }

                const data = await response.json()
                window.location.href = data.url
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button onClick={onClick} disabled={isLoading} variant={isPro ? "outline" : "default"}>
            {isLoading ? "Loading..." : isPro ? "Manage Subscription" : "Upgrade to Pro"}
        </Button>
    )
}
