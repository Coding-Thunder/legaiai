"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { ArrowLeft, Star, User, Building, Phone, Mail, MapPin, Calendar, Award } from "lucide-react"
import { useParams } from "next/navigation"

export default function LawyerProfilePage() {
  const params = useParams()
  const lawyerId = params.id as string

  const { lawyers } = useAppSelector((state) => state.lawyers)
  const { cases } = useAppSelector((state) => state.cases)

  const lawyer = lawyers.find((l) => l.id === lawyerId)
  const lawyerCases = cases.filter((c) => c.lawyerId === lawyerId)

  if (!lawyer) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Lawyer not found</h3>
            <p className="text-black dark:text-white mb-4">The lawyer profile you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/dashboard/client/search">Back to Search</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  // Mock additional data
  const mockReviews = [
    {
      id: 1,
      client: "John D.",
      rating: 5,
      comment: "Excellent lawyer, very professional and knowledgeable. Helped me with my property dispute case.",
      date: "2024-01-10",
    },
    {
      id: 2,
      client: "Sarah M.",
      rating: 4,
      comment: "Great communication and kept me informed throughout the process. Highly recommended.",
      date: "2024-01-05",
    },
    {
      id: 3,
      client: "Mike R.",
      rating: 5,
      comment: "Outstanding service. Resolved my case quickly and efficiently.",
      date: "2023-12-20",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/client/search">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{lawyer.name}</h1>
          <p className="text-black dark:text-white">{lawyer.isFirm ? lawyer.firmName : "Individual Practitioner"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  {lawyer.isFirm ? (
                    <Building className="h-12 w-12 text-black dark:text-white" />
                  ) : (
                    <User className="h-12 w-12 text-black dark:text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{lawyer.name}</CardTitle>
                  <CardDescription className="text-lg mb-3">
                    {lawyer.isFirm ? lawyer.firmName : "Individual Practitioner"}
                  </CardDescription>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(lawyer.rating)}
                      <span className="text-sm text-black dark:text-white ml-2">
                        {lawyer.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-black dark:text-white">Bar Number</p>
                  <p className="font-medium">{lawyer.barNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-black dark:text-white">Experience</p>
                  <p className="font-medium">{lawyer.experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-black dark:text-white">Cases Handled</p>
                  <p className="font-medium">{lawyerCases.length}+</p>
                </div>
                <div>
                  <p className="text-sm text-black dark:text-white">Success Rate</p>
                  <p className="font-medium">95%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black dark:text-white leading-relaxed">
                {lawyer.isFirm
                  ? `${lawyer.firmName} is a leading law firm with ${lawyer.experience} years of experience in ${lawyer.specialization.join(", ")}. Our team of experienced attorneys is dedicated to providing exceptional legal services to our clients.`
                  : `${lawyer.name} is an experienced attorney with ${lawyer.experience} years of practice in ${lawyer.specialization.join(", ")}. Committed to providing personalized legal solutions and achieving the best outcomes for clients.`}
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-black dark:text-white" />
                  <div>
                    <p className="font-medium">Licensed Attorney</p>
                    <p className="text-sm text-black dark:text-white">Bar Certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-black dark:text-white" />
                  <div>
                    <p className="font-medium">Practicing Since</p>
                    <p className="text-sm text-black dark:text-white">{2024 - lawyer.experience}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Client Reviews</CardTitle>
              <CardDescription>What clients are saying</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{review.client}</p>
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-sm text-black dark:text-white">{review.date}</p>
                    </div>
                    <p className="text-black dark:text-white">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-black dark:text-white" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-black dark:text-white">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-black dark:text-white" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-black dark:text-white">
                    {lawyer.name.toLowerCase().replace(" ", ".")}@lawfirm.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-black dark:text-white" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-black dark:text-white">
                    123 Legal Street
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consultation */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Consultation</CardTitle>
              <CardDescription>Get legal advice from this lawyer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold">$200</p>
                <p className="text-sm text-black dark:text-white">Initial consultation fee</p>
              </div>
              <Button className="w-full">Schedule Consultation</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Practice Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Practice Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lawyer.specialization.map((spec) => (
                  <div key={spec} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">{spec}</span>
                    <Badge variant="outline" className="text-xs">
                      Expert
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">✓ Available for new clients</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
