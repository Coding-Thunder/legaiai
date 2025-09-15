"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { Briefcase, FileText, Search, Clock, Eye, CreditCard } from "lucide-react"

export default function ClientDashboardPage() {
  const { cases } = useAppSelector((state) => state.cases)
  const { drafts } = useAppSelector((state) => state.drafts)
  const { user } = useAppSelector((state) => state.auth)

  // Filter cases for this client
  const clientCases = cases.filter((c) => c.clientId === user?.id)
  const activeCases = clientCases.filter((c) => c.status === "active").length
  const pendingCases = clientCases.filter((c) => c.status === "pending").length

  // Get drafts for client's cases
  const clientDrafts = drafts.filter((d) => clientCases.some((c) => c.id === d.caseId))
  const recentCases = clientCases.slice(0, 3)
  const recentDrafts = clientDrafts.slice(0, 3)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-black dark:text-white">Welcome back, {user?.name}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/search">
            <Search className="h-4 w-4 mr-2" />
            Find Lawyers
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientCases.length}</div>
            <p className="text-xs text-black dark:text-white">All your legal cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Clock className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCases}</div>
            <p className="text-xs text-black dark:text-white">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
            <Clock className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCases}</div>
            <p className="text-xs text-black dark:text-white">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientDrafts.length}</div>
            <p className="text-xs text-black dark:text-white">Legal documents</p>
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
            {recentCases.length > 0 ? (
              <>
                {recentCases.map((case_) => (
                  <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{case_.title}</p>
                      <p className="text-sm text-black dark:text-white">{case_.petitionType}</p>
                    </div>
                    <div className="flex items-center gap-2">
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
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/client/cases/${case_.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/dashboard/client/cases">View All Cases</Link>
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No cases yet</h3>
                <p className="text-black dark:text-white mb-4">Find a lawyer to start your first case</p>
                <Button asChild>
                  <Link href="/dashboard/client/search">
                    <Search className="h-4 w-4 mr-2" />
                    Find Lawyers
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Latest legal documents from your cases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDrafts.length > 0 ? (
              <>
                {recentDrafts.map((draft) => (
                  <div key={draft.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-black dark:text-white" />
                      <div>
                        <p className="font-medium">{draft.petitionType}</p>
                        <p className="text-sm text-black dark:text-white">Case: {draft.caseId}</p>
                      </div>
                    </div>
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
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/dashboard/client/cases">View All Documents</Link>
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
                <p className="text-black dark:text-white">Documents will appear here once your lawyer creates them</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 flex-col">
              <Link href="/dashboard/client/search">
                <Search className="h-6 w-6 mb-2" />
                Find Lawyers
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col bg-transparent">
              <Link href="/dashboard/client/cases">
                <Briefcase className="h-6 w-6 mb-2" />
                View Cases
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col bg-transparent">
              <Link href="/dashboard/client/payments">
                <CreditCard className="h-6 w-6 mb-2" />
                Payment History
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
