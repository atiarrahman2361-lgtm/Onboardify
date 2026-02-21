import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
    try {
        const session = await getSession()

        if (!session?.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId as string },
            select: { stripeCustomerId: true }
        })

        if (!user || !user.stripeCustomerId) {
            return new NextResponse('Stripe customer not found', { status: 404 })
        }

        const returnUrl = new URL(req.url)
        const baseUrl = `${returnUrl.protocol}//${returnUrl.host}`

        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${baseUrl}/dashboard/settings/billing`,
        })

        return NextResponse.redirect(stripeSession.url)
    } catch (error) {
        console.error('STRIPE_PORTAL_ERROR:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
