import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const session = await getSession()

        if (!session?.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { priceId } = body

        if (!priceId) {
            return new NextResponse('Price ID is required', { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId as string },
            select: { email: true, stripeCustomerId: true }
        })

        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        // Return current URL for cancel/success routing
        const returnUrl = new URL(req.url)
        const baseUrl = `${returnUrl.protocol}//${returnUrl.host}`

        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_dummy') {
            // Mock checkout process for users without Stripe keys configured
            await prisma.user.update({
                where: { id: session.userId as string },
                data: {
                    stripeSubscriptionId: `sub_mock_${Date.now()}`,
                    stripeCustomerId: `cus_mock_${session.userId}`,
                    stripePriceId: priceId,
                    stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
                },
            });
            return NextResponse.json({ url: `${baseUrl}/dashboard/settings/billing?success=true` })
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${baseUrl}/dashboard/settings/billing?success=true`,
            cancel_url: `${baseUrl}/dashboard/settings/billing?canceled=true`,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.stripeCustomerId ? undefined : user.email!,
            customer: user.stripeCustomerId as string | undefined,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: session.userId as string,
            },
        })

        return NextResponse.json({ url: stripeSession.url })
    } catch (error) {
        console.error('STRIPE_CHECKOUT_ERROR:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
