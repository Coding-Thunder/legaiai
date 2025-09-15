import type React from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { LawyerSidebar } from "@/components/dashboard/lawyer-sidebar"

export default function LawyerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="lawyer">
      <div className="flex h-screen bg-background">
        <LawyerSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </AuthGuard>
  )
}
