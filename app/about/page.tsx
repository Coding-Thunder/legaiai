import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            LegalAI Pro
          </Link>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-balance">About LegalAI Pro</h1>
          <p className="text-xl text-black dark:text-white mb-8 text-pretty">
            We're revolutionizing the legal industry with AI-powered tools that enhance productivity, accuracy, and
            collaboration between lawyers and clients.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Empowering Legal Professionals</h3>
              <p className="text-black dark:text-white mb-6">
                Our platform combines cutting-edge AI technology with deep legal expertise to create tools that truly
                understand the needs of modern legal practice.
              </p>
              <p className="text-black dark:text-white">
                From AI-assisted document drafting to research verification and case management, we're building the
                future of legal technology.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black dark:text-white">
                    Leveraging the latest AI advancements to solve real legal challenges.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black dark:text-white">
                    Ensuring precision and reliability in every legal document and research.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black dark:text-white">
                    Facilitating seamless communication between lawyers and clients.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Sarah Johnson</CardTitle>
                <CardDescription>CEO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black dark:text-white">
                  Former BigLaw partner with 15+ years of experience in corporate law and legal technology.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Michael Chen</CardTitle>
                <CardDescription>CTO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black dark:text-white">
                  AI researcher and former Google engineer specializing in natural language processing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Emily Rodriguez</CardTitle>
                <CardDescription>Head of Legal Affairs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black dark:text-white">
                  Legal expert ensuring our platform meets the highest standards of legal compliance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
          <p className="text-black dark:text-white mb-8">
            Join thousands of legal professionals who are already using our platform to streamline their workflow.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
