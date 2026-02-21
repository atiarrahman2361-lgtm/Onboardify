import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero Section with Sharp CSS B2B Grid Pattern */}
        <section className="relative w-full flex-1 flex flex-col justify-center items-center text-center px-4 py-24 md:py-32 overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#322557,transparent)]"></div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_0%_300px,#f9d489,transparent)] dark:bg-[radial-gradient(circle_800px_at_0%_300px,#503d15,transparent)] opacity-50"></div>

          <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
            <div className="inline-flex items-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-3 py-1 text-sm font-medium mb-4 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              The modern standard for B2B client collaboration
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Client Onboarding, <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">Perfected.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Deliver a premium, frictionless onboarding experience for your B2B clients. Keep projects on track, organize documents securely, and shine from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/sign-up" className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground text-lg font-semibold px-8 py-4 rounded-full shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="flex items-center justify-center text-lg font-medium px-8 py-4 rounded-full border border-border bg-card/50 backdrop-blur hover:bg-card hover:border-primary/50 transition-all duration-300 w-full sm:w-auto subtle-3d-card">
                Discover Features
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 bg-card/30 border-t border-border relative">
          <div className="container max-w-6xl mx-auto px-4 z-10 relative">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need to succeed</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Focus on building relationships, not managing spreadsheets. We handle the heavy lifting for you.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl subtle-3d-card flex flex-col items-start gap-4 hover:border-primary/50 group bg-card">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Interactive Checklists</h3>
                <p className="text-muted-foreground leading-relaxed">Guide your clients step-by-step through the requirements. Track progress in real-time with visual completion bars.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl subtle-3d-card flex flex-col items-start gap-4 hover:border-amber-500/50 group bg-card">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-inner">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-muted-foreground leading-relaxed">Built on a modern stack for instant load times and seamless interactions. Your clients will love the smooth experience.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl subtle-3d-card flex flex-col items-start gap-4 hover:border-primary/50 group bg-card">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Secure by Default</h3>
                <p className="text-muted-foreground leading-relaxed">Enterprise-grade security for peace of mind. All data and documents are safely encrypted and strictly isolated.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-24 bg-background border-t border-border">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get your clients fully onboarded in three simple steps.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center relative">
              <div className="space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl font-bold border border-primary/20">1</div>
                <h3 className="text-xl font-bold">Invite Client</h3>
                <p className="text-muted-foreground">Send a secure magic link to your client to access their personalized portal.</p>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold border border-amber-500/20">2</div>
                <h3 className="text-xl font-bold">Collect Assets</h3>
                <p className="text-muted-foreground">Clients follow interactive checklists to securely upload required files and information.</p>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold border border-emerald-500/20">3</div>
                <h3 className="text-xl font-bold">Start Working</h3>
                <p className="text-muted-foreground">Get notified when everything is ready. Download assets and kick off the project immediately.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-24 bg-card/30 border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Everything you need to know about the platform.</p>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl subtle-3d-card bg-card mb-4">
                <h3 className="text-xl font-bold mb-2">Is client data secure?</h3>
                <p className="text-muted-foreground">Yes. We use industry-standard encryption for all data at rest and in transit. Your clients' sensitive files are completely isolated and secure.</p>
              </div>
              <div className="p-6 rounded-2xl subtle-3d-card bg-card mb-4">
                <h3 className="text-xl font-bold mb-2">Can I customize the onboarding checklists?</h3>
                <p className="text-muted-foreground">Absolutely. You can create custom checklists tailored to specific project types, ranging from simple file uploads to text inputs and checkboxes.</p>
              </div>
              <div className="p-6 rounded-2xl subtle-3d-card bg-card">
                <h3 className="text-xl font-bold mb-2">Do my clients need an account?</h3>
                <p className="text-muted-foreground">No. Clients access their secure portal via magic links, removing friction and login barriers from the onboarding process.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
