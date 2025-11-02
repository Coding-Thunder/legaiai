import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Users,
  FileText,
  Search,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import ApiTestComponent from "@/components/ApiTestComponent";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 dark:bg-black/95 dark:supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">LegalAI Pro</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-black dark:text-white hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-black dark:text-white hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-black dark:text-white hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Legal Platform
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              Transform Your Legal Practice with
              <span className="text-accent"> AI Intelligence</span>
            </h2>
            <p className="text-xl text-black dark:text-white mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              Streamline case management, generate professional legal documents
              with AI assistance, verify research credibility, and enhance
              client collaboration—all in one comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/auth/register">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-black dark:text-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free to try</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Secure platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Professional tools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Integration Test Section */}
      <section className="container mx-auto px-4 py-12">
        <ApiTestComponent />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h3 className="text-4xl font-bold mb-6 text-balance">
            Everything You Need for Modern Legal Practice
          </h3>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto text-pretty">
            Comprehensive tools designed specifically for lawyers and their
            clients to work together efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-accent/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">AI Draft Editor</CardTitle>
              <CardDescription className="text-base">
                Generate professional legal documents with intelligent AI
                assistance and formatting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Smart document templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Real-time collaboration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Version control
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Research Verification</CardTitle>
              <CardDescription className="text-base">
                Upload and verify legal research with advanced credibility
                scoring algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Source credibility analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Citation verification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Research repository
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Case Management</CardTitle>
              <CardDescription className="text-base">
                Organize cases efficiently and maintain seamless communication
                with clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Case timeline tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Client portal access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Document sharing
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Secure Collaboration</CardTitle>
              <CardDescription className="text-base">
                Bank-level security for all client communications and document
                sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  GDPR compliant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Audit trails
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Smart Analytics</CardTitle>
              <CardDescription className="text-base">
                Gain insights into case performance and client satisfaction
                metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Performance dashboards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Time tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Revenue analytics
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Payment Processing</CardTitle>
              <CardDescription className="text-base">
                Streamlined billing and payment collection with automated
                invoicing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Automated invoicing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Multiple payment methods
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Financial reporting
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h3 className="text-4xl font-bold mb-6 text-balance">
              Get Started in Minutes
            </h3>
            <p className="text-xl text-black dark:text-white max-w-2xl mx-auto text-pretty">
              Simple onboarding process designed to get you up and running
              quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">
                  1
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-4">
                Create Your Account
              </h4>
              <p className="text-black dark:text-white">
                Sign up as a lawyer or client and complete your profile in under
                2 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent-foreground">
                  2
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-4">
                Set Up Your Workspace
              </h4>
              <p className="text-black dark:text-white">
                Configure your dashboard, import existing cases, and invite team
                members.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary-foreground">
                  3
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-4">
                Start Collaborating
              </h4>
              <p className="text-black dark:text-white">
                Begin creating documents, managing cases, and collaborating with
                clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6 text-balance">
            Modern Legal Practice Management
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-pretty opacity-90">
            Discover how AI-powered tools can enhance your legal workflow and
            client collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link href="/auth/register">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-bold">LegalAI Pro</h4>
              </div>
              <p className="text-black dark:text-white text-sm">
                Empowering legal professionals with AI-driven tools for modern
                practice management.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/integrations"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-black dark:text-white">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-sm text-black dark:text-white">
            <p>&copy; 2024 LegalAI Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Scale({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  );
}
