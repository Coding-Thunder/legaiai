"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { uploadResearch, verifyResearch, updateCredibilityScore } from "@/lib/slices/researchSlice"
import { showToast } from "@/lib/slices/uiSlice"
import { useState } from "react"
import { Upload, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyResearchPage() {
  const { researchList } = useAppSelector((state) => state.research)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [activeTab, setActiveTab] = useState<"upload" | "verify">("upload")
  const [uploadForm, setUploadForm] = useState({
    title: "",
    type: "" as "case-law" | "statute" | "regulation" | "precedent" | "",
    tags: "",
    file: null as File | null,
    makePublic: false,
    allowSharing: true,
    requireVerification: true,
    notifyOnUpdates: false,
    addToLibrary: true,
  })

  const unverifiedResearch = researchList.filter((r) => !r.verified)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadForm({ ...uploadForm, file })
    }
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadForm.title || !uploadForm.type || !uploadForm.file) {
      dispatch(showToast({ message: "Please fill in all required fields", type: "error" }))
      return
    }

    const newResearch = {
      id: `research_${Date.now()}`,
      title: uploadForm.title,
      uploadedBy: user?.id || "",
      verified: !uploadForm.requireVerification, // Auto-verify if not required
      credibilityScore: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
      type: uploadForm.type,
      contentUrl: `/research/${uploadForm.file.name}`,
      tags: uploadForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString().split("T")[0],
      isPublic: uploadForm.makePublic,
      isShared: uploadForm.allowSharing,
      requiresVerification: uploadForm.requireVerification,
      notifyOnUpdates: uploadForm.notifyOnUpdates,
      addedToLibrary: uploadForm.addToLibrary,
    }

    dispatch(uploadResearch(newResearch))
    dispatch(showToast({ message: "Research uploaded successfully!", type: "success" }))
    setUploadForm({
      title: "",
      type: "",
      tags: "",
      file: null,
      makePublic: false,
      allowSharing: true,
      requireVerification: true,
      notifyOnUpdates: false,
      addToLibrary: true,
    })
  }

  const handleVerifyResearch = (researchId: string) => {
    dispatch(verifyResearch(researchId))
    dispatch(showToast({ message: "Research verified successfully!", type: "success" }))
  }

  const handleUpdateScore = (researchId: string, score: number) => {
    dispatch(updateCredibilityScore({ id: researchId, score }))
    dispatch(showToast({ message: "Credibility score updated", type: "success" }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/lawyer/research">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Research
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Research Management</h1>
          <p className="text-black dark:text-white">Upload new research and verify existing documents</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button variant={activeTab === "upload" ? "default" : "outline"} onClick={() => setActiveTab("upload")}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Research
        </Button>
        <Button variant={activeTab === "verify" ? "default" : "outline"} onClick={() => setActiveTab("verify")}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Verify Research ({unverifiedResearch.length})
        </Button>
      </div>

      {/* Upload Tab */}
      {activeTab === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Upload New Research</CardTitle>
            <CardDescription>Add a new legal research document to the library</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Research Title *
                </label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="Enter research document title"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-2">
                  Document Type *
                </label>
                <Select
                  value={uploadForm.type}
                  onValueChange={(value: "case-law" | "statute" | "regulation" | "precedent") =>
                    setUploadForm({ ...uploadForm, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="case-law">Case Law</SelectItem>
                    <SelectItem value="statute">Statute</SelectItem>
                    <SelectItem value="regulation">Regulation</SelectItem>
                    <SelectItem value="precedent">Precedent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags (comma-separated)
                </label>
                <Input
                  id="tags"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  placeholder="e.g., property, civil, contract"
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium mb-2">
                  Research Document *
                </label>
                <Input id="file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} required />
                <p className="text-sm text-black dark:text-white mt-1">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-sm font-medium">Sharing & Visibility Options</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="make-public"
                      checked={uploadForm.makePublic}
                      onCheckedChange={(checked) => setUploadForm({ ...uploadForm, makePublic: checked as boolean })}
                    />
                    <label htmlFor="make-public" className="text-sm font-medium">
                      Make research publicly available
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allow-sharing"
                      checked={uploadForm.allowSharing}
                      onCheckedChange={(checked) => setUploadForm({ ...uploadForm, allowSharing: checked as boolean })}
                    />
                    <label htmlFor="allow-sharing" className="text-sm font-medium">
                      Allow other lawyers to share this research
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="require-verification"
                      checked={uploadForm.requireVerification}
                      onCheckedChange={(checked) =>
                        setUploadForm({ ...uploadForm, requireVerification: checked as boolean })
                      }
                    />
                    <label htmlFor="require-verification" className="text-sm font-medium">
                      Require manual verification before publishing
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="add-to-library"
                      checked={uploadForm.addToLibrary}
                      onCheckedChange={(checked) => setUploadForm({ ...uploadForm, addToLibrary: checked as boolean })}
                    />
                    <label htmlFor="add-to-library" className="text-sm font-medium">
                      Add to firm's research library
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notify-updates"
                      checked={uploadForm.notifyOnUpdates}
                      onCheckedChange={(checked) =>
                        setUploadForm({ ...uploadForm, notifyOnUpdates: checked as boolean })
                      }
                    />
                    <label htmlFor="notify-updates" className="text-sm font-medium">
                      Notify me of related research updates
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Research
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Verify Tab */}
      {activeTab === "verify" && (
        <div className="space-y-4">
          {unverifiedResearch.length > 0 ? (
            unverifiedResearch.map((research) => (
              <Card key={research.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{research.title}</CardTitle>
                      <CardDescription>
                        Uploaded by {research.uploadedBy} on {research.createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Unverified</Badge>
                      <Badge variant="outline">{research.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-black dark:text-white">Current Credibility Score:</span>
                        <span className="ml-2 font-bold text-yellow-600">{research.credibilityScore}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          defaultValue={research.credibilityScore}
                          className="w-20"
                          onBlur={(e) => {
                            const score = Number.parseInt(e.target.value)
                            if (score !== research.credibilityScore) {
                              handleUpdateScore(research.id, score)
                            }
                          }}
                        />
                        <Button size="sm" onClick={() => handleVerifyResearch(research.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify
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
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All research verified!</h3>
                <p className="text-black dark:text-white mb-4">There are no unverified research documents at the moment.</p>
                <Button onClick={() => setActiveTab("upload")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Research
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
