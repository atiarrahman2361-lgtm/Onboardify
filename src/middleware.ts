import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_super_secret_key_for_dev_only'
)

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. Only run for /portal routes
    if (pathname.startsWith('/portal/')) {
        const parts = pathname.split('/')
        // parts looks like: ['', 'portal', 'some-slug', 'login']
        const slug = parts[2]
        const isLoginPage = pathname.endsWith('/login')

        if (!slug) return NextResponse.next()

        // 2. Check for the slug-specific auth cookie
        const token = request.cookies.get(`portal_auth_${slug}`)?.value

        // 3. Verify the token if it exists
        let isValid = false
        if (token) {
            try {
                const { payload } = await jwtVerify(token, JWT_SECRET)
                // Ensure the token slug matches the requested route slug
                if (payload.slug === slug) {
                    isValid = true
                }
            } catch (error) {
                isValid = false
            }
        }

        // 4. Redirect rules
        if (!isValid && !isLoginPage) {
            // Not authenticated, trying to access secure portal -> send to login
            const url = request.nextUrl.clone()
            url.pathname = `/portal/${slug}/login`
            return NextResponse.redirect(url)
        }

        if (isValid && isLoginPage) {
            // Authenticated, trying to access login -> send to portal
            const url = request.nextUrl.clone()
            url.pathname = `/portal/${slug}`
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

// Ensure middleware only runs on specific paths
export const config = {
    matcher: [
        '/portal/:path*',
    ],
}
