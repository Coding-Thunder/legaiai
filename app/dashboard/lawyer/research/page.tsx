"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/hooks"
import { useState } from "react"
import { Search, FileText, Download, ExternalLink, Filter } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

export default function ResearchPage() {
  const { researchList } = useAppSelector((state) => state.research)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [verifiedFilter, setVerifiedFilter] = useState("all")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showSharedOnly, setShowSharedOnly] = useState(false)
  const [showPublicOnly, setShowPublicOnly] = useState(false)

  const documentTypes = ["case-law", "statute", "regulation", "precedent", "contract", "brief"]

  const filteredResearch = researchList.filter((research) => {
    const matchesSearch =
      research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      research.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "all" || research.type === typeFilter
    const matchesVerified =
      verifiedFilter === "all" ||
      (verifiedFilter === "verified" && research.verified) ||
      (verifiedFilter === "unverified" && !research.verified)
    const matchesSelectedTypes = selectedTypes.length === 0 || selectedTypes.includes(research.type)
    const matchesShared = !showSharedOnly || research.isShared
    const matchesPublic = !showPublicOnly || research.isPublic
    return matchesSearch && matchesType && matchesVerified && matchesSelectedTypes && matchesShared && matchesPublic
  })

  const getCredibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Research Library</h1>
          <p className="text-black dark:text-white">Search and manage legal research documents</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/lawyer/research/verify">
            <FileText className="h-4 w-4 mr-2" />
            Upload Research
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                <Input
                  placeholder="Search research..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="case-law">Case Law</SelectItem>
                  <SelectItem value="statute">Statute</SelectItem>
                  <SelectItem value="regulation">Regulation</SelectItem>
                  <SelectItem value="precedent">Precedent</SelectItem>
                </SelectContent>
              </Select>
              <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setTypeFilter("all")
                  setVerifiedFilter("all")
                  setSelectedTypes([])
                  setShowSharedOnly(false)
                  setShowPublicOnly(false)
                }}
              >
                Clear Filters
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Document Types</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {documentTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`doc-type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTypes([...selectedTypes, type])
                        } else {
                          setSelectedTypes(selectedTypes.filter((t) => t !== type))
                        }
                      }}
                    />
                    <label htmlFor={`doc-type-${type}`} className="text-sm font-medium capitalize">
                      {type.replace("-", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shared-filter"
                  checked={showSharedOnly}
                  onCheckedChange={(checked) => setShowSharedOnly(checked as boolean)}
                />
                <label htmlFor="shared-filter" className="text-sm font-medium">
                  Show shared documents only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="public-filter"
                  checked={showPublicOnly}
                  onCheckedChange={(checked) => setShowPublicOnly(checked as boolean)}
                />
                <label htmlFor="public-filter" className="text-sm font-medium">
                  Show public documents only
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Results */}
      <div className="grid grid-cols-1 gap-4">
        {filteredResearch.map((research) => (
          <Card key={research.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{research.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span>Uploaded by: {research.uploadedBy}</span>
                    <span>•</span>
                    <span>{research.createdAt}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {research.verified ? (
                    <Badge variant="default">Verified</Badge>
                  ) : (
                    <Badge variant="secondary">Unverified</Badge>
                  )}
                  <Badge variant="outline">{research.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-sm text-black dark:text-white">Credibility Score:</span>
                      <span className={`ml-2 font-bold ${getCredibilityColor(research.credibilityScore)}`}>
                        {research.credibilityScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-black dark:text-white">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {research.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredResearch.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No research found</h3>
              <p className="text-black dark:text-white mb-4">
                {searchTerm ||
                typeFilter !== "all" ||
                verifiedFilter !== "all" ||
                selectedTypes.length > 0 ||
                showSharedOnly ||
                showPublicOnly
                  ? "Try adjusting your search or filter criteria"
                  : "Upload your first research document to get started"}
              </p>
              <Button asChild>
                <Link href="/dashboard/lawyer/research/verify">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Research
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
