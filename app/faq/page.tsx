import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
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

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-balance">Frequently Asked Questions</h1>
            <p className="text-xl text-black dark:text-white text-pretty">
              Find answers to common questions about our AI legal platform.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">What is LegalAI Pro?</AccordionTrigger>
              <AccordionContent>
                LegalAI Pro is a comprehensive legal technology solution that combines AI-powered document
                drafting, research verification, case management, and client collaboration tools to streamline legal
                workflows for both lawyers and clients.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">How does the AI draft editor work?</AccordionTrigger>
              <AccordionContent>
                Our AI draft editor uses advanced natural language processing to generate legal documents based on your
                case details and petition type. You can edit the generated content, attach relevant research, and
                collaborate with your team in real-time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">Is my data secure and confidential?</AccordionTrigger>
              <AccordionContent>
                Yes, we take data security very seriously. All data is encrypted in transit and at rest, and we comply
                with industry-standard security practices. We never share your confidential legal information with third
                parties.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Can I collaborate with my clients on the platform?
              </AccordionTrigger>
              <AccordionContent>
                Clients can view case progress, review drafts, and communicate with their lawyers through our secure
                platform. Lawyers maintain full control over what information is shared with clients.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">What types of legal documents can I create?</AccordionTrigger>
              <AccordionContent>
                Our platform supports a wide range of legal documents including contracts, petitions, motions, briefs,
                and more. The AI is trained on various legal document types and can adapt to different practice areas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">How does research verification work?</AccordionTrigger>
              <AccordionContent>
                Our research verification system allows you to upload legal research documents, which are then analyzed
                for credibility and accuracy. The system provides credibility scores and helps you identify the most
                reliable sources for your cases.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">Is there a mobile app available?</AccordionTrigger>
              <AccordionContent>
                Currently, our platform is web-based and fully responsive, working seamlessly on mobile devices through
                your browser. We're working on dedicated mobile apps that will be available soon.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also set up
                invoicing and custom payment terms through our sales team.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">Can I cancel my subscription anytime?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time. Your account will remain active until the end of your
                current billing period, and you'll retain access to your data for 30 days after cancellation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">Do you offer training and support?</AccordionTrigger>
              <AccordionContent>
                Yes, we provide comprehensive onboarding, training materials, and ongoing support. Professional and
                Enterprise plans include priority support, and Enterprise customers get dedicated account management.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Contact CTA */}
          <div className="text-center mt-16 p-8 bg-muted/50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-black dark:text-white mb-6">
              Our support team is here to help you get the most out of our platform.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
