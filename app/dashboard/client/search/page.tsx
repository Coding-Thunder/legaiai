"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { Search, Star, User, Building } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function LawyerSearchPage() {
  const { lawyers } = useAppSelector((state) => state.lawyers)
  const [searchTerm, setSearchTerm] = useState("")
  const [specializationFilter, setSpecializationFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [showFirmsOnly, setShowFirmsOnly] = useState(false)
  const [showIndividualsOnly, setShowIndividualsOnly] = useState(false)

  const specializations = Array.from(new Set(lawyers.flatMap((lawyer) => lawyer.specialization)))

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialization.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialization = specializationFilter === "all" || lawyer.specialization.includes(specializationFilter)
    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "4+" && lawyer.rating >= 4) ||
      (ratingFilter === "3+" && lawyer.rating >= 3)
    const matchesSelectedSpecs =
      selectedSpecializations.length === 0 ||
      selectedSpecializations.some((spec) => lawyer.specialization.includes(spec))
    const matchesType =
      (!showFirmsOnly && !showIndividualsOnly) ||
      (showFirmsOnly && lawyer.isFirm) ||
      (showIndividualsOnly && !lawyer.isFirm)
    return matchesSearch && matchesSpecialization && matchesRating && matchesSelectedSpecs && matchesType
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Find Lawyers</h1>
        <p className="text-black dark:text-white">Search and connect with qualified legal professionals</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Lawyers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                <Input
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4+">4+ Stars</SelectItem>
                  <SelectItem value="3+">3+ Stars</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSpecializationFilter("all")
                  setRatingFilter("all")
                  setSelectedSpecializations([])
                  setShowFirmsOnly(false)
                  setShowIndividualsOnly(false)
                }}
              >
                Clear Filters
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Specializations</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {specializations.slice(0, 8).map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={`spec-${spec}`}
                      checked={selectedSpecializations.includes(spec)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSpecializations([...selectedSpecializations, spec])
                        } else {
                          setSelectedSpecializations(selectedSpecializations.filter((s) => s !== spec))
                        }
                      }}
                    />
                    <label htmlFor={`spec-${spec}`} className="text-sm font-medium">
                      {spec}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="firms-only"
                  checked={showFirmsOnly}
                  onCheckedChange={(checked) => {
                    setShowFirmsOnly(checked as boolean)
                    if (checked) setShowIndividualsOnly(false)
                  }}
                />
                <label htmlFor="firms-only" className="text-sm font-medium">
                  Law firms only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="individuals-only"
                  checked={showIndividualsOnly}
                  onCheckedChange={(checked) => {
                    setShowIndividualsOnly(checked as boolean)
                    if (checked) setShowFirmsOnly(false)
                  }}
                />
                <label htmlFor="individuals-only" className="text-sm font-medium">
                  Individual lawyers only
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="grid grid-cols-1 gap-6">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      {lawyer.isFirm ? (
                        <Building className="h-8 w-8 text-black dark:text-white" />
                      ) : (
                        <User className="h-8 w-8 text-black dark:text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{lawyer.name}</CardTitle>
                      <CardDescription className="text-base">
                        {lawyer.isFirm ? lawyer.firmName : "Individual Practitioner"}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {renderStars(lawyer.rating)}
                          <span className="text-sm text-black dark:text-white ml-1">
                            {lawyer.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/dashboard/client/lawyers/${lawyer.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-black dark:text-white mb-2">Specializations:</p>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.specialization.map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-black dark:text-white">Bar Number</p>
                      <p className="font-medium">{lawyer.barNumber}</p>
                    </div>
                    <div>
                      <p className="text-black dark:text-white">Experience</p>
                      <p className="font-medium">{lawyer.experience} years</p>
                    </div>
                    <div>
                      <p className="text-black dark:text-white">Type</p>
                      <p className="font-medium">{lawyer.isFirm ? "Law Firm" : "Individual"}</p>
                    </div>
                    <div>
                      <p className="text-black dark:text-white">Rating</p>
                      <p className="font-medium">{lawyer.rating}/5.0</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No lawyers found</h3>
              <p className="text-black dark:text-white mb-4">
                Try adjusting your search criteria or browse all available lawyers
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSpecializationFilter("all")
                  setRatingFilter("all")
                  setSelectedSpecializations([])
                  setShowFirmsOnly(false)
                  setShowIndividualsOnly(false)
                }}
              >
                Show All Lawyers
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
