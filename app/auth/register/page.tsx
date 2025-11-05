"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { registerUser, clearError } from "@/lib/slices/authSlice"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthPayload } from "@/axios/requests"

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



  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.role) return toast.error("Please select a role")
    if (formData.password !== formData.confirmPassword) return toast.error("Passwords do not match")
    if (!formData.agreeToTerms) return toast.error("You must agree to the terms")
    if (formData.role === "lawyer" && !formData.barNumber) return toast.error("Please provide your bar number")

    try {
      const userData: AuthPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase() as "LAWYER" | "CLIENT",
        ...(formData.role === "lawyer" && { barNumber: formData.barNumber }),
      }

      await dispatch(registerUser(userData)).unwrap()
      toast.success("Account created successfully!")

      router.push("/auth/login")
    } catch (err: any) {
      toast.error(err || "Registration failed")
    }
  }


  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold mb-4 block">LegalAI Pro</Link>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Join LegalAI Pro to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Full Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} disabled={isLoading} />
            <InputField label="Email" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} disabled={isLoading} />

            <div>
              <label className="block text-sm font-medium mb-2">I am a</label>
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
              <InputField label="Bar Number" value={formData.barNumber} onChange={(v) => setFormData({ ...formData, barNumber: v })} disabled={isLoading} />
            )}

            <InputField label="Password" type="password" value={formData.password} onChange={(v) => setFormData({ ...formData, password: v })} disabled={isLoading} />
            <InputField label="Confirm Password" type="password" value={formData.confirmPassword} onChange={(v) => setFormData({ ...formData, confirmPassword: v })} disabled={isLoading} />

            <div className="flex items-center space-x-2">
              <Checkbox checked={formData.agreeToTerms} onCheckedChange={(c) => setFormData({ ...formData, agreeToTerms: c as boolean })} />
              <label className="text-sm">
                I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !formData.agreeToTerms}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login" className="font-medium hover:underline">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Reusable InputField component
const InputField = ({ label, value, onChange, type = "text", disabled = false }: { label: string, value: string, onChange: (v: string) => void, type?: string, disabled?: boolean }) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} required />
  </div>
)
