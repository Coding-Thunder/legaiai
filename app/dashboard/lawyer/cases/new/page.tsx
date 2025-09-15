"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addCase } from "@/lib/slices/casesSlice"
import { showToast } from "@/lib/slices/uiSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewCasePage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    petitionType: "",
    clientId: "",
    isPriority: false,
    clientNotificationsEnabled: true,
    isPublicCase: false,
    requiresUrgentAttention: false,
    allowClientAccess: true,
  })

  // Mock client data - in real app, this would come from an API
  const mockClients = [
    { id: "client1", name: "Jane Doe" },
    { id: "client2", name: "John Smith" },
    { id: "client3", name: "ABC Corporation" },
  ]

  const petitionTypes = [
    "Civil",
    "Criminal",
    "Commercial",
    "Family",
    "Immigration",
    "Intellectual Property",
    "Employment",
    "Real Estate",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.petitionType || !formData.clientId) {
      dispatch(showToast({ message: "Please fill in all required fields", type: "error" }))
      return
    }

    const newCase = {
      id: `case_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      petitionType: formData.petitionType,
      status: "active" as const,
      lawyerId: user?.id || "",
      clientId: formData.clientId,
      createdAt: new Date().toISOString().split("T")[0],
      priority: formData.isPriority ? "high" : "normal",
      clientNotificationsEnabled: formData.clientNotificationsEnabled,
      isPublic: formData.isPublicCase,
      requiresUrgentAttention: formData.requiresUrgentAttention,
      allowClientAccess: formData.allowClientAccess,
    }

    dispatch(addCase(newCase))
    dispatch(showToast({ message: "Case created successfully!", type: "success" }))
    router.push(`/dashboard/lawyer/cases/${newCase.id}`)
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
        <div>
          <h1 className="text-3xl font-bold">Create New Case</h1>
          <p className="text-black dark:text-white">Fill in the details to create a new legal case</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
          <CardDescription>Provide the basic information for the new case</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Case Title *
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter case title"
                required
              />
            </div>

            <div>
              <label htmlFor="petitionType" className="block text-sm font-medium mb-2">
                Petition Type *
              </label>
              <Select
                value={formData.petitionType}
                onValueChange={(value) => setFormData({ ...formData, petitionType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select petition type" />
                </SelectTrigger>
                <SelectContent>
                  {petitionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="clientId" className="block text-sm font-medium mb-2">
                Client *
              </label>
              <Select
                value={formData.clientId}
                onValueChange={(value) => setFormData({ ...formData, clientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Case Description *
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide a detailed description of the case"
                rows={5}
                required
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="text-sm font-medium">Case Options</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="priority-case"
                    checked={formData.isPriority}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPriority: checked as boolean })}
                  />
                  <label htmlFor="priority-case" className="text-sm font-medium">
                    Mark as priority case
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent-attention"
                    checked={formData.requiresUrgentAttention}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, requiresUrgentAttention: checked as boolean })
                    }
                  />
                  <label htmlFor="urgent-attention" className="text-sm font-medium">
                    Requires urgent attention
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="client-notifications"
                    checked={formData.clientNotificationsEnabled}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, clientNotificationsEnabled: checked as boolean })
                    }
                  />
                  <label htmlFor="client-notifications" className="text-sm font-medium">
                    Enable client notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="client-access"
                    checked={formData.allowClientAccess}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowClientAccess: checked as boolean })}
                  />
                  <label htmlFor="client-access" className="text-sm font-medium">
                    Allow client dashboard access
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="public-case"
                    checked={formData.isPublicCase}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublicCase: checked as boolean })}
                  />
                  <label htmlFor="public-case" className="text-sm font-medium">
                    Make case publicly visible (for research purposes)
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Create Case
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/lawyer/cases">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
