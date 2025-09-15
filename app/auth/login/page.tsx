"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/lib/hooks"
import { loginAsLawyer, loginAsClient } from "@/lib/slices/authSlice"
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
  const [role, setRole] = useState<"lawyer" | "client">("client")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // basic mock user info (id, name, country)
    const baseUser = {
      id: role === "lawyer" ? "lawyer1" : "client1",
      name: role === "lawyer" ? "John Smith" : "Jane Doe",
      country: "US",
    }

    if (role === "lawyer") {
      dispatch(loginAsLawyer({ user: baseUser, token: "mock-lawyer-token" }))
    } else {
      dispatch(loginAsClient({ user: baseUser, token: "mock-client-token" }))
    }

    dispatch(showToast({ message: `Logged in as ${role}`, type: "success" }))

    const redirectPath = role === "lawyer" ? "/dashboard/lawyer" : "/dashboard/client"
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
            {/* Email */}
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

            {/* Password */}
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

            {/* Role selector */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value="client"
                  checked={role === "client"}
                  onChange={() => setRole("client")}
                />
                Client
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value="lawyer"
                  checked={role === "lawyer"}
                  onChange={() => setRole("lawyer")}
                />
                Lawyer
              </label>
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
