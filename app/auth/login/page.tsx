"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loginUser, clearError } from "@/lib/slices/authSlice"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { APP_ROLE } from "@/lib/utils"

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })



  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      return
    }

    try {
      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap()
      console.log(result)

      if (result.role === APP_ROLE.LAWER) {
        router.push('/dashboard/lawyer')
      } else {
        router.push('/dashboard/client')
      }


      // if (result.role == APP_ROLE.LAWER) {
      //   console.log('/dashboard/lawyer')
      // } else {
      //   console.log('/dashboard/client')
      // }
    } catch (error) {
      // Error is already handled by Redux
      console.error('Login failed:', error)
    }
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
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <Link href="/auth/forgot-password" className="hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/auth/register" className="font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
