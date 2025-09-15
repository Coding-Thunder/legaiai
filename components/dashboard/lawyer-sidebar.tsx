"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logout } from "@/lib/slices/authSlice"
import { useRouter } from "next/navigation"
import { LayoutDashboard, PenTool, Search, User, CreditCard, LogOut, Briefcase, Plus, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard/lawyer", icon: LayoutDashboard },
  { name: "Cases", href: "/dashboard/lawyer/cases", icon: Briefcase },
  { name: "New Case", href: "/dashboard/lawyer/cases/new", icon: Plus },
  { name: "Drafts", href: "/dashboard/lawyer/drafts", icon: PenTool },
  { name: "Research", href: "/dashboard/lawyer/research", icon: Search },
  { name: "Verify Research", href: "/dashboard/lawyer/research/verify", icon: CheckCircle },
  { name: "Profile", href: "/dashboard/lawyer/profile", icon: User },
  { name: "Billing", href: "/dashboard/lawyer/billing", icon: CreditCard },
]

export function LawyerSidebar() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
  }

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/dashboard/lawyer" className="text-xl font-bold">
          Legal Platform
        </Link>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <p className="text-sm font-medium text-black dark:text-white">Welcome back,</p>
          <p className="text-lg font-semibold">{user?.name}</p>
          {user?.isFirm && user?.firmName && <p className="text-sm text-black dark:text-white">{user.firmName}</p>}
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-black dark:text-white hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
