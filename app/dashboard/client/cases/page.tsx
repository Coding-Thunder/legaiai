"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { Search, Eye, FileText, Briefcase } from "lucide-react"
import { useState } from "react"

export default function ClientCasesPage() {
  const { cases } = useAppSelector((state) => state.cases)
  const { drafts } = useAppSelector((state) => state.drafts)
  const { user } = useAppSelector((state) => state.auth)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter cases for this client
  const clientCases = cases.filter((c) => c.clientId === user?.id)

  const filteredCases = clientCases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getCaseDrafts = (caseId: string) => {
    return drafts.filter((d) => d.caseId === caseId)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Cases</h1>
          <p className="text-black dark:text-white">View and track your legal cases</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/search">
            <Search className="h-4 w-4 mr-2" />
            Find Lawyers
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.length > 0 ? (
          filteredCases.map((case_) => {
            const caseDrafts = getCaseDrafts(case_.id)
            return (
              <Card key={case_.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{case_.title}</CardTitle>
                      <CardDescription>
                        {case_.petitionType} • Created {case_.createdAt} • Lawyer: {case_.lawyerId}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          case_.status === "active" ? "default" : case_.status === "pending" ? "secondary" : "outline"
                        }
                      >
                        {case_.status}
                      </Badge>
                      <Button size="sm" asChild>
                        <Link href={`/dashboard/client/cases/${case_.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-black dark:text-white mb-4">{case_.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-black dark:text-white">
                      <span>Case ID: {case_.id}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {caseDrafts.length} documents
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {caseDrafts.map((draft) => (
                        <Badge key={draft.id} variant="outline" className="text-xs">
                          {draft.petitionType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              {clientCases.length === 0 ? (
                <>
                  <Briefcase className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No cases yet</h3>
                  <p className="text-black dark:text-white mb-4">Find a lawyer to start your first legal case</p>
                  <Button asChild>
                    <Link href="/dashboard/client/search">
                      <Search className="h-4 w-4 mr-2" />
                      Find Lawyers
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Search className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No cases found</h3>
                  <p className="text-black dark:text-white">Try adjusting your search or filter criteria</p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
