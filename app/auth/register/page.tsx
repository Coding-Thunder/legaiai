"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { registerUser, clearError } from "@/lib/slices/authSlice"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "lawyer" | "client" | "",
    barNumber: "",
    agreeToTerms: false,
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.role) {
      return
    }

    if (formData.password !== formData.confirmPassword) {
      return
    }

    if (!formData.agreeToTerms) {
      return
    }

    if (formData.role === 'lawyer' && !formData.barNumber) {
      return
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'lawyer' && { barNumber: formData.barNumber })
      }

      const result = await dispatch(registerUser(userData)).unwrap()
      
      // Redirect based on user role
      if (result.user.role === 'lawyer') {
        router.push('/dashboard/lawyer')
      } else {
        router.push('/dashboard/client')
      }
    } catch (error) {
      // Error is already handled by Redux
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold mb-4 block">
            LegalAI Pro
          </Link>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Join LegalAI Pro to get started</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                I am a
              </label>
              <Select value={formData.role} onValueChange={(value: "lawyer" | "client") => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="lawyer">Lawyer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "lawyer" && (
              <div>
                <label htmlFor="barNumber" className="block text-sm font-medium mb-2">
                  Bar Number
                </label>
                <Input
                  id="barNumber"
                  type="text"
                  value={formData.barNumber}
                  onChange={(e) => setFormData({ ...formData, barNumber: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
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
                disabled={isLoading}
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
                disabled={isLoading}
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

            <Button type="submit" className="w-full" disabled={isLoading || !formData.agreeToTerms}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login" className="font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
