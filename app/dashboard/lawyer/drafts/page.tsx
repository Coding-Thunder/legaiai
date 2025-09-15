"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { createDraft, updateDraft, submitDraft } from "@/lib/slices/draftsSlice"
import { showToast } from "@/lib/slices/uiSlice"
import { useState } from "react"
import { FileText, Plus, Edit, Send, Search } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function DraftsPage() {
  const searchParams = useSearchParams()
  const preselectedCaseId = searchParams.get("caseId")

  const { drafts } = useAppSelector((state) => state.drafts)
  const { cases } = useAppSelector((state) => state.cases)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [selectedDraft, setSelectedDraft] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newDraft, setNewDraft] = useState({
    caseId: preselectedCaseId || "",
    petitionType: "",
    content: "",
  })

  const filteredDrafts = drafts.filter(
    (draft) =>
      draft.petitionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedDraftData = selectedDraft ? drafts.find((d) => d.id === selectedDraft) : null

  const handleCreateDraft = () => {
    if (!newDraft.caseId || !newDraft.petitionType) {
      dispatch(showToast({ message: "Please select case and petition type", type: "error" }))
      return
    }

    const draft = {
      id: `draft_${Date.now()}`,
      caseId: newDraft.caseId,
      lawyerId: user?.id || "",
      petitionType: newDraft.petitionType,
      content:
        newDraft.content ||
        `This is an AI-generated ${newDraft.petitionType} draft for case ${newDraft.caseId}.\n\nWHEREAS, the petitioner hereby requests...\n\nTHEREFORE, it is respectfully submitted that...`,
      status: "draft" as const,
      attachedResearch: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(createDraft(draft))
    dispatch(showToast({ message: "Draft created successfully!", type: "success" }))
    setIsCreating(false)
    setSelectedDraft(draft.id)
    setNewDraft({ caseId: "", petitionType: "", content: "" })
  }

  const handleUpdateDraft = (content: string) => {
    if (selectedDraft) {
      dispatch(updateDraft({ id: selectedDraft, content }))
      dispatch(showToast({ message: "Draft updated", type: "success" }))
    }
  }

  const handleSubmitDraft = (draftId: string) => {
    dispatch(submitDraft(draftId))
    dispatch(showToast({ message: "Draft submitted successfully!", type: "success" }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Drafts</h1>
          <p className="text-black dark:text-white">Create and manage legal document drafts</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Draft
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drafts List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Drafts</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                <Input
                  placeholder="Search drafts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedDraft === draft.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedDraft(draft.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{draft.petitionType}</p>
                    <Badge
                      variant={
                        draft.status === "draft" ? "secondary" : draft.status === "submitted" ? "default" : "outline"
                      }
                    >
                      {draft.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-black dark:text-white">Case: {draft.caseId}</p>
                  <p className="text-xs text-black dark:text-white">Updated: {draft.updatedAt}</p>
                </div>
              ))}

              {filteredDrafts.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-8 w-8 text-black dark:text-white mx-auto mb-2" />
                  <p className="text-sm text-black dark:text-white">No drafts found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Draft Editor */}
        <div className="lg:col-span-2">
          {isCreating ? (
            <Card>
              <CardHeader>
                <CardTitle>Create New Draft</CardTitle>
                <CardDescription>Generate an AI-powered legal draft</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Case</label>
                  <Select
                    value={newDraft.caseId}
                    onValueChange={(value) => setNewDraft({ ...newDraft, caseId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select case" />
                    </SelectTrigger>
                    <SelectContent>
                      {cases.map((case_) => (
                        <SelectItem key={case_.id} value={case_.id}>
                          {case_.title} ({case_.petitionType})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Petition Type</label>
                  <Select
                    value={newDraft.petitionType}
                    onValueChange={(value) => setNewDraft({ ...newDraft, petitionType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select petition type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Civil Petition">Civil Petition</SelectItem>
                      <SelectItem value="Motion to Dismiss">Motion to Dismiss</SelectItem>
                      <SelectItem value="Contract Agreement">Contract Agreement</SelectItem>
                      <SelectItem value="Legal Brief">Legal Brief</SelectItem>
                      <SelectItem value="Settlement Agreement">Settlement Agreement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Initial Content (Optional)</label>
                  <Textarea
                    value={newDraft.content}
                    onChange={(e) => setNewDraft({ ...newDraft, content: e.target.value })}
                    placeholder="Enter initial content or leave blank for AI generation"
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreateDraft}>Generate Draft</Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : selectedDraftData ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedDraftData.petitionType}</CardTitle>
                    <CardDescription>Case: {selectedDraftData.caseId}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {selectedDraftData.status === "draft" && (
                      <Button size="sm" onClick={() => handleSubmitDraft(selectedDraftData.id)}>
                        <Send className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    )}
                    <Badge
                      variant={
                        selectedDraftData.status === "draft"
                          ? "secondary"
                          : selectedDraftData.status === "submitted"
                            ? "default"
                            : "outline"
                      }
                    >
                      {selectedDraftData.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Draft Content</label>
                    <Textarea
                      value={selectedDraftData.content}
                      onChange={(e) => handleUpdateDraft(e.target.value)}
                      rows={15}
                      className="font-mono text-sm"
                      disabled={selectedDraftData.status === "submitted"}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm text-black dark:text-white">
                    <span>Attached Research: {selectedDraftData.attachedResearch.length}</span>
                    <span>Last updated: {selectedDraftData.updatedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Edit className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a draft to edit</h3>
                <p className="text-black dark:text-white mb-4">Choose a draft from the list or create a new one</p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Draft
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
