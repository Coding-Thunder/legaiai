"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateCaseStatus } from "@/lib/slices/casesSlice"
import Link from "next/link"
import { Plus, Search, Eye } from "lucide-react"
import { useState } from "react"

export default function LawyerCasesPage() {
  const { cases } = useAppSelector((state) => state.cases)
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCaseTypes, setSelectedCaseTypes] = useState<string[]>([])
  const [showPriorityOnly, setShowPriorityOnly] = useState(false)

  const caseTypes = ["Civil", "Criminal", "Corporate", "Family", "Immigration", "Personal Injury"]

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesCaseType = selectedCaseTypes.length === 0 || selectedCaseTypes.includes(case_.petitionType)
    const matchesPriority = !showPriorityOnly || case_.priority === "high"
    return matchesSearch && matchesStatus && matchesCaseType && matchesPriority
  })

  const handleStatusChange = (caseId: string, newStatus: "active" | "pending" | "closed") => {
    dispatch(updateCaseStatus({ id: caseId, status: newStatus }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cases</h1>
          <p className="text-black dark:text-white">Manage all your legal cases</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/lawyer/cases/new">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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

            <div>
              <h4 className="text-sm font-medium mb-3">Case Types</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {caseTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`case-type-${type}`}
                      checked={selectedCaseTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCaseTypes([...selectedCaseTypes, type])
                        } else {
                          setSelectedCaseTypes(selectedCaseTypes.filter((t) => t !== type))
                        }
                      }}
                    />
                    <label htmlFor={`case-type-${type}`} className="text-sm font-medium">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="priority-filter"
                checked={showPriorityOnly}
                onCheckedChange={(checked) => setShowPriorityOnly(checked as boolean)}
              />
              <label htmlFor="priority-filter" className="text-sm font-medium">
                Show priority cases only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{case_.title}</CardTitle>
                  <CardDescription>
                    {case_.petitionType} • Created {case_.createdAt}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={case_.status}
                    onValueChange={(value: "active" | "pending" | "closed") => handleStatusChange(case_.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/lawyer/cases/${case_.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black dark:text-white">{case_.description}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-black dark:text-white">
                <span>Case ID: {case_.id}</span>
                <span>Client ID: {case_.clientId}</span>
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
            </CardContent>
          </Card>
        ))}

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No cases found</h3>
              <p className="text-black dark:text-white mb-4">
                {searchTerm || statusFilter !== "all" || selectedCaseTypes.length > 0 || showPriorityOnly
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first case to get started"}
              </p>
              {!searchTerm && statusFilter === "all" && selectedCaseTypes.length === 0 && !showPriorityOnly && (
                <Button asChild>
                  <Link href="/dashboard/lawyer/cases/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Case
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
