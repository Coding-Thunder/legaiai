"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateCaseStatus } from "@/lib/slices/casesSlice"
import Link from "next/link"
import { ArrowLeft, FileText, Plus, Edit } from "lucide-react"
import { useParams } from "next/navigation"

export default function CaseDetailPage() {
  const params = useParams()
  const caseId = params.id as string
  const dispatch = useAppDispatch()

  const { cases } = useAppSelector((state) => state.cases)
  const { drafts } = useAppSelector((state) => state.drafts)

  const case_ = cases.find((c) => c.id === caseId)
  const caseDrafts = drafts.filter((d) => d.caseId === caseId)

  if (!case_) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Case not found</h3>
            <p className="text-black dark:text-white mb-4">The case you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/dashboard/lawyer/cases">Back to Cases</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleStatusChange = (newStatus: "active" | "pending" | "closed") => {
    dispatch(updateCaseStatus({ id: caseId, status: newStatus }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/lawyer/cases">
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black dark:text-white">Client ID</label>
                  <p>{case_.clientId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-black dark:text-white">Status</label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      size="sm"
                      variant={case_.status === "active" ? "default" : "outline"}
                      onClick={() => handleStatusChange("active")}
                    >
                      Active
                    </Button>
                    <Button
                      size="sm"
                      variant={case_.status === "pending" ? "default" : "outline"}
                      onClick={() => handleStatusChange("pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={case_.status === "closed" ? "default" : "outline"}
                      onClick={() => handleStatusChange("closed")}
                    >
                      Closed
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Case Drafts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Case Drafts</CardTitle>
                  <CardDescription>Legal documents for this case</CardDescription>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/dashboard/lawyer/drafts?caseId=${caseId}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Draft
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {caseDrafts.length > 0 ? (
                <div className="space-y-3">
                  {caseDrafts.map((draft) => (
                    <div key={draft.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-black dark:text-white" />
                        <div>
                          <p className="font-medium">{draft.petitionType} Draft</p>
                          <p className="text-sm text-black dark:text-white">
                            Updated {draft.updatedAt} • {draft.attachedResearch.length} research attached
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No drafts yet</h3>
                  <p className="text-black dark:text-white mb-4">Create your first draft for this case</p>
                  <Button asChild>
                    <Link href={`/dashboard/lawyer/drafts?caseId=${caseId}`}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Draft
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href={`/dashboard/lawyer/drafts?caseId=${caseId}`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Draft
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/lawyer/research">
                  <FileText className="h-4 w-4 mr-2" />
                  Find Research
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Case Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-black dark:text-white">Total Drafts</span>
                <span className="font-medium">{caseDrafts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-black dark:text-white">Draft Status</span>
                <span className="font-medium">
                  {caseDrafts.filter((d) => d.status === "draft").length} Draft,{" "}
                  {caseDrafts.filter((d) => d.status === "submitted").length} Submitted
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-black dark:text-white">Research Attached</span>
                <span className="font-medium">
                  {caseDrafts.reduce((acc, draft) => acc + draft.attachedResearch.length, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
