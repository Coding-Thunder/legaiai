"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { Briefcase, FileText, Search, TrendingUp, Plus, Clock } from "lucide-react"

export default function LawyerDashboardPage() {
  const { cases } = useAppSelector((state) => state.cases)
  const { drafts } = useAppSelector((state) => state.drafts)
  const { researchList } = useAppSelector((state) => state.research)
  const { user } = useAppSelector((state) => state.auth)

  const activeCases = cases.filter((c) => c.status === "active").length
  const pendingCases = cases.filter((c) => c.status === "pending").length
  const draftCount = drafts.filter((d) => d.status === "draft").length
  const verifiedResearch = researchList.filter((r) => r.verified).length

  const recentCases = cases.slice(0, 3)
  const recentDrafts = drafts.slice(0, 3)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-black dark:text-white">Welcome back, {user?.name}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/lawyer/cases/new">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCases}</div>
            <p className="text-xs text-black dark:text-white">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
            <Clock className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCases}</div>
            <p className="text-xs text-black dark:text-white">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Documents</CardTitle>
            <FileText className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftCount}</div>
            <p className="text-xs text-black dark:text-white">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Research</CardTitle>
            <Search className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedResearch}</div>
            <p className="text-xs text-black dark:text-white">Ready to use</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
            <CardDescription>Your latest case activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{case_.title}</p>
                  <p className="text-sm text-black dark:text-white">{case_.petitionType}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      case_.status === "active"
                        ? "bg-green-100 text-green-800"
                        : case_.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {case_.status}
                  </span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard/lawyer/cases">View All Cases</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Drafts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Drafts</CardTitle>
            <CardDescription>Your latest document drafts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDrafts.map((draft) => (
              <div key={draft.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{draft.petitionType} Draft</p>
                  <p className="text-sm text-black dark:text-white">Case ID: {draft.caseId}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      draft.status === "draft"
                        ? "bg-blue-100 text-blue-800"
                        : draft.status === "submitted"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {draft.status}
                  </span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard/lawyer/drafts">View All Drafts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 flex-col">
              <Link href="/dashboard/lawyer/cases/new">
                <Plus className="h-6 w-6 mb-2" />
                Create New Case
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col bg-transparent">
              <Link href="/dashboard/lawyer/research">
                <Search className="h-6 w-6 mb-2" />
                Search Research
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col bg-transparent">
              <Link href="/dashboard/lawyer/research/verify">
                <TrendingUp className="h-6 w-6 mb-2" />
                Verify Research
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
