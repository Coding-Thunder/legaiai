"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppDispatch } from "@/lib/hooks"
import { login } from "@/lib/slices/authSlice"
import { showToast } from "@/lib/slices/uiSlice"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "lawyer" | "client" | "",
    barNumber: "",
    isFirm: false,
    firmName: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.role) {
      dispatch(showToast({ message: "Please select your role", type: "error" }))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      dispatch(showToast({ message: "Passwords do not match", type: "error" }))
      return
    }

    if (!formData.agreeToTerms) {
      dispatch(showToast({ message: "Please agree to the terms and conditions", type: "error" }))
      return
    }

    // Mock registration - in real app, this would call an API
    const mockUser = {
      id: `${formData.role}${Date.now()}`,
      name: formData.name,
      role: formData.role,
      country: "US",
      ...(formData.role === "lawyer" && {
        barNumber: formData.barNumber,
        isFirm: formData.isFirm,
        ...(formData.isFirm && { firmName: formData.firmName }),
      }),
    }

    dispatch(login({ user: mockUser, token: "mock-jwt-token" }))
    dispatch(showToast({ message: "Registration successful!", type: "success" }))

    // Redirect based on role
    const redirectPath = formData.role === "lawyer" ? "/dashboard/lawyer" : "/dashboard/client"
    router.push(redirectPath)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold mb-4 block">
            LegalAI Pro
          </Link>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join thousands of legal professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">I am a</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="role-lawyer"
                    checked={formData.role === "lawyer"}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, role: "lawyer" })
                      } else {
                        setFormData({ ...formData, role: "" })
                      }
                    }}
                  />
                  <label htmlFor="role-lawyer" className="text-sm font-medium cursor-pointer">
                    Lawyer
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="role-client"
                    checked={formData.role === "client"}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, role: "client" })
                      } else {
                        setFormData({ ...formData, role: "" })
                      }
                    }}
                  />
                  <label htmlFor="role-client" className="text-sm font-medium cursor-pointer">
                    Client
                  </label>
                </div>
              </div>
            </div>

            {formData.role === "lawyer" && (
              <>
                <div>
                  <label htmlFor="barNumber" className="block text-sm font-medium mb-2">
                    Bar Number
                  </label>
                  <Input
                    id="barNumber"
                    value={formData.barNumber}
                    onChange={(e) => setFormData({ ...formData, barNumber: e.target.value })}
                    required
                  />
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
                      Firm Name
                    </label>
                    <Input
                      id="firmName"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      required
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
              />
              <label htmlFor="agreeToTerms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-black dark:text-white">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
