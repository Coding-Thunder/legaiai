"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/lib/hooks"
import { login } from "@/lib/slices/authSlice"
import { showToast } from "@/lib/slices/uiSlice"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API that returns the user's role from the database
    const mockUsers = {
      "lawyer@example.com": {
        id: "lawyer1",
        name: "John Smith",
        role: "lawyer" as const,
        country: "US",
        barNumber: "BAR123456",
      },
      "client@example.com": {
        id: "client1",
        name: "Jane Doe",
        role: "client" as const,
        country: "US",
      },
    }

    // Determine user role from stored data (mock implementation)
    const mockUser = mockUsers[formData.email as keyof typeof mockUsers] || {
      id: "demo1",
      name: "Demo User",
      role: "client" as const,
      country: "US",
    }

    dispatch(login({ user: mockUser, token: "mock-jwt-token" }))
    dispatch(showToast({ message: "Login successful!", type: "success" }))

    // Redirect based on stored user role
    const redirectPath = mockUser.role === "lawyer" ? "/dashboard/lawyer" : "/dashboard/client"
    router.push(redirectPath)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold mb-4 block">
            LegalAI Pro
          </Link>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link href="/auth/forgot-password" className="text-sm text-black dark:text-white hover:underline">
              Forgot your password?
            </Link>
            <p className="text-sm text-black dark:text-white">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
