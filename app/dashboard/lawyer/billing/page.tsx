"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/hooks"
import { CreditCard, Download, Calendar, TrendingUp, Twitch as Switch } from "lucide-react"
import { useState } from "react"

export default function BillingPage() {
  const { user } = useAppSelector((state) => state.auth)
  const [billingPreferences, setBillingPreferences] = useState({
    autoRenewal: true,
    emailNotifications: true,
    usageAlerts: false,
    paperlessStatements: true,
  })

  // Mock billing data
  const currentPlan = {
    name: "Professional",
    price: 149,
    billingCycle: "monthly",
    nextBilling: "2024-02-15",
    features: ["Unlimited cases", "Advanced AI features", "Research verification", "Priority support"],
  }

  const billingHistory = [
    {
      id: "inv_001",
      date: "2024-01-15",
      amount: 149,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "inv_002",
      date: "2023-12-15",
      amount: 149,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "inv_003",
      date: "2023-11-15",
      amount: 149,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
  ]

  const usageStats = {
    casesThisMonth: 12,
    casesLimit: "Unlimited",
    draftsGenerated: 28,
    researchUploaded: 5,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing & Usage</h1>
        <p className="text-black dark:text-white">Manage your subscription and view usage statistics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <p className="text-black dark:text-white">
                      ${currentPlan.price}/{currentPlan.billingCycle}
                    </p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Plan Features:</h4>
                  <ul className="space-y-1">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="text-sm text-black dark:text-white flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-black dark:text-white">Next billing date</p>
                    <p className="font-medium">{currentPlan.nextBilling}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {billingHistory.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <p className="text-sm text-black dark:text-white">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-medium">${invoice.amount}</p>
                        <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Preferences</CardTitle>
              <CardDescription>Manage your billing and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-renewal</p>
                  <p className="text-sm text-black dark:text-white">Automatically renew your subscription</p>
                </div>
                <Switch
                  checked={billingPreferences.autoRenewal}
                  onCheckedChange={(checked) => setBillingPreferences({ ...billingPreferences, autoRenewal: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-black dark:text-white">Receive billing updates via email</p>
                </div>
                <Switch
                  checked={billingPreferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setBillingPreferences({ ...billingPreferences, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Usage alerts</p>
                  <p className="text-sm text-black dark:text-white">Get notified when approaching limits</p>
                </div>
                <Switch
                  checked={billingPreferences.usageAlerts}
                  onCheckedChange={(checked) => setBillingPreferences({ ...billingPreferences, usageAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Paperless statements</p>
                  <p className="text-sm text-black dark:text-white">Receive statements electronically only</p>
                </div>
                <Switch
                  checked={billingPreferences.paperlessStatements}
                  onCheckedChange={(checked) =>
                    setBillingPreferences({ ...billingPreferences, paperlessStatements: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Stats & Payment Method */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Usage This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">Cases Created</span>
                <span className="font-medium">
                  {usageStats.casesThisMonth} / {usageStats.casesLimit}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">Drafts Generated</span>
                <span className="font-medium">{usageStats.draftsGenerated}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">Research Uploaded</span>
                <span className="font-medium">{usageStats.researchUploaded}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CreditCard className="h-8 w-8 text-black dark:text-white" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-black dark:text-white">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">Current Period</span>
                <span className="font-medium">Jan 15 - Feb 15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">Amount Due</span>
                <span className="font-medium">${currentPlan.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">Next Charge</span>
                <span className="font-medium">{currentPlan.nextBilling}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
