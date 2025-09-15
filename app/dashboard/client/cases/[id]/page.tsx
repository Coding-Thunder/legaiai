"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { ArrowLeft, FileText, User, Calendar } from "lucide-react"
import { useParams } from "next/navigation"

export default function ClientCaseDetailPage() {
  const params = useParams()
  const caseId = params.id as string

  const { cases } = useAppSelector((state) => state.cases)
  const { drafts } = useAppSelector((state) => state.drafts)
  const { lawyers } = useAppSelector((state) => state.lawyers)
  const { user } = useAppSelector((state) => state.auth)

  const case_ = cases.find((c) => c.id === caseId && c.clientId === user?.id)
  const caseDrafts = drafts.filter((d) => d.caseId === caseId)
  const lawyer = lawyers.find((l) => l.id === case_?.lawyerId)

  if (!case_) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Case not found</h3>
            <p className="text-black dark:text-white mb-4">
              The case you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button asChild>
              <Link href="/dashboard/client/cases">Back to Cases</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/client/cases">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cases
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{case_.title}</h1>
          <p className="text-black dark:text-white">Case ID: {case_.id}</p>
        </div>
        <Badge variant={case_.status === "active" ? "default" : case_.status === "pending" ? "secondary" : "outline"}>
          {case_.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-black dark:text-white">Title</label>
                <p className="text-lg">{case_.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-black dark:text-white">Description</label>
                <p>{case_.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black dark:text-white">Petition Type</label>
                  <p>{case_.petitionType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-black dark:text-white">Created Date</label>
                  <p>{case_.createdAt}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-black dark:text-white">Status</label>
                <div className="mt-1">
                  <Badge
                    variant={
                      case_.status === "active" ? "default" : case_.status === "pending" ? "secondary" : "outline"
                    }
                  >
                    {case_.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Case Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Documents</CardTitle>
              <CardDescription>Documents prepared by your lawyer for this case</CardDescription>
            </CardHeader>
            <CardContent>
              {caseDrafts.length > 0 ? (
                <div className="space-y-3">
                  {caseDrafts.map((draft) => (
                    <div key={draft.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-black dark:text-white" />
                          <div>
                            <p className="font-medium">{draft.petitionType}</p>
                            <p className="text-sm text-black dark:text-white">Last updated: {draft.updatedAt}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            draft.status === "draft"
                              ? "secondary"
                              : draft.status === "submitted"
                                ? "default"
                                : "outline"
                          }
                        >
                          {draft.status}
                        </Badge>
                      </div>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="text-black dark:text-white mb-2">Document Preview:</p>
                        <p className="line-clamp-3">{draft.content}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-black dark:text-white">
                        <span>Research attached: {draft.attachedResearch.length}</span>
                        <Button size="sm" variant="outline">
                          View Full Document
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
                  <p className="text-black dark:text-white">Your lawyer will create documents for this case soon</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lawyer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Lawyer
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lawyer ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      {lawyer.isFirm ? (
                        <div className="text-xs font-medium">{lawyer.firmName?.charAt(0)}</div>
                      ) : (
                        <User className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{lawyer.name}</p>
                      <p className="text-sm text-black dark:text-white">
                        {lawyer.isFirm ? lawyer.firmName : "Individual Practitioner"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black dark:text-white">Bar Number:</span>
                      <span>{lawyer.barNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black dark:text-white">Experience:</span>
                      <span>{lawyer.experience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black dark:text-white">Rating:</span>
                      <span>{lawyer.rating}/5.0</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-black dark:text-white mb-1">Specialization:</p>
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialization.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/client/lawyers/${lawyer.id}`}>View Profile</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-black dark:text-white">Lawyer information not available</p>
              )}
            </CardContent>
          </Card>

          {/* Case Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Case Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div>
                  <p className="text-sm font-medium">Case Created</p>
                  <p className="text-xs text-black dark:text-white">{case_.createdAt}</p>
                </div>
              </div>
              {caseDrafts.map((draft) => (
                <div key={draft.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full" />
                  <div>
                    <p className="text-sm font-medium">
                      {draft.petitionType} {draft.status}
                    </p>
                    <p className="text-xs text-black dark:text-white">{draft.updatedAt}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
