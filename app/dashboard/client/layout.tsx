import type React from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { ClientSidebar } from "@/components/dashboard/client-sidebar"

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="client">
      <div className="flex h-screen bg-background">
        <ClientSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </AuthGuard>
  )
}
