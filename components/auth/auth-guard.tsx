"use client"

import type React from "react"

import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "lawyer" | "client"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/auth/login" }: AuthGuardProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }



    if (requiredRole && user?.role !== requiredRole.toUpperCase()) {
      router.push("/unauthorized")

      return
    }
  }, [isAuthenticated, user, requiredRole, redirectTo, router])

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user?.role !== requiredRole.toUpperCase()) {
    return null
  }

  return <>{children}</>
}
