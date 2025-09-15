"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateProfile, toggleCountry } from "@/lib/slices/authSlice"
import { showToast } from "@/lib/slices/uiSlice"
import { useState } from "react"
import { User, Building, Globe, Save } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    barNumber: user?.barNumber || "",
    isFirm: user?.isFirm || false,
    firmName: user?.firmName || "",
    country: user?.country || "US",
    specialization: "",
    experience: "",
    bio: "",
  })

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedProfile = {
      name: formData.name,
      barNumber: formData.barNumber,
      isFirm: formData.isFirm,
      ...(formData.isFirm && { firmName: formData.firmName }),
      country: formData.country,
    }

    dispatch(updateProfile(updatedProfile))
    dispatch(toggleCountry(formData.country))
    dispatch(showToast({ message: "Profile updated successfully!", type: "success" }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-black dark:text-white">Manage your professional information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your basic professional details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="barNumber" className="block text-sm font-medium mb-2">
                    Bar Number *
                  </label>
                  <Input
                    id="barNumber"
                    value={formData.barNumber}
                    onChange={(e) => setFormData({ ...formData, barNumber: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-2">
                    Country *
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFirm"
                    checked={formData.isFirm}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFirm: checked as boolean })}
                  />
                  <label htmlFor="isFirm" className="text-sm font-medium">
                    I represent a law firm
                  </label>
                </div>

                {formData.isFirm && (
                  <div>
                    <label htmlFor="firmName" className="block text-sm font-medium mb-2">
                      Firm Name *
                    </label>
                    <Input
                      id="firmName"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      required={formData.isFirm}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Additional information about your practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium mb-2">
                  Areas of Specialization
                </label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="e.g., Civil Law, Corporate Law, Family Law"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">
                  Years of Experience
                </label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-2">
                  Professional Bio
                </label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief description of your professional background and expertise"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  {formData.isFirm ? (
                    <Building className="h-8 w-8 text-black dark:text-white" />
                  ) : (
                    <User className="h-8 w-8 text-black dark:text-white" />
                  )}
                </div>
                <h3 className="font-semibold">{formData.name || "Your Name"}</h3>
                <p className="text-sm text-black dark:text-white">
                  {formData.isFirm && formData.firmName ? formData.firmName : "Individual Practitioner"}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Bar Number:</span>
                  <span>{formData.barNumber || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Country:</span>
                  <span>{countries.find((c) => c.code === formData.country)?.name || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Type:</span>
                  <span>{formData.isFirm ? "Law Firm" : "Individual"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-black dark:text-white">Receive updates about your cases</p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Case Reminders</p>
                  <p className="text-sm text-black dark:text-white">Get reminded about important deadlines</p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Research Updates</p>
                  <p className="text-sm text-black dark:text-white">New research in your areas of interest</p>
                </div>
                <Checkbox />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
