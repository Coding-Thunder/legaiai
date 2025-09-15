"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Download, Plus, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

const mockPayments = [
  {
    id: "payment_1",
    userId: "client_1",
    amount: 500,
    currency: "USD",
    status: "completed" as const,
    provider: "stripe" as const,
    description: "Legal consultation fee",
    createdAt: "2024-01-15",
  },
  {
    id: "payment_2",
    userId: "client_1",
    amount: 1200,
    currency: "USD",
    status: "pending" as const,
    provider: "paypal" as const,
    description: "Case filing fee",
    createdAt: "2024-01-20",
  },
]

export default function PaymentsPage() {
  const payments = mockPayments
  const user = { id: "client_1", name: "John Doe" }

  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    description: "",
    provider: "stripe" as "stripe" | "paypal" | "bank",
    savePaymentMethod: false,
    setAsDefault: false,
    autoPayEnabled: false,
  })

  const [paymentPreferences, setPaymentPreferences] = useState({
    emailReceipts: true,
    smsNotifications: false,
    autoPayEnabled: false,
  })

  const clientPayments = payments.filter((p) => p.userId === user?.id)

  const totalPaid = clientPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = clientPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentForm.amount || !paymentForm.description) {
      alert("Please fill in all required fields")
      return
    }

    alert("Payment initiated successfully!")
    setShowPaymentForm(false)
    setPaymentForm({
      amount: "",
      description: "",
      provider: "stripe",
      savePaymentMethod: false,
      setAsDefault: false,
      autoPayEnabled: false,
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-black dark:text-white">Manage your legal service payments</p>
        </div>
        <Button onClick={() => setShowPaymentForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-black dark:text-white">All completed payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-black dark:text-white">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientPayments.length}</div>
            <p className="text-xs text-black dark:text-white">All payment records</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Form */}
      {showPaymentForm && (
        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>Pay for legal services or consultation fees</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-2">
                    Amount (USD) *
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="provider" className="block text-sm font-medium mb-2">
                    Payment Method *
                  </label>
                  <Select
                    value={paymentForm.provider}
                    onValueChange={(value: "stripe" | "paypal" | "bank") =>
                      setPaymentForm({ ...paymentForm, provider: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Credit Card (Stripe)</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <Input
                  id="description"
                  value={paymentForm.description}
                  onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                  placeholder="e.g., Legal consultation fee, Case filing fee"
                  required
                />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="save-payment-method"
                    checked={paymentForm.savePaymentMethod}
                    onCheckedChange={(checked) =>
                      setPaymentForm({ ...paymentForm, savePaymentMethod: checked as boolean })
                    }
                  />
                  <label htmlFor="save-payment-method" className="text-sm font-medium">
                    Save payment method for future use
                  </label>
                </div>
                {paymentForm.savePaymentMethod && (
                  <div className="flex items-center space-x-2 ml-6">
                    <Checkbox
                      id="set-as-default"
                      checked={paymentForm.setAsDefault}
                      onCheckedChange={(checked) =>
                        setPaymentForm({ ...paymentForm, setAsDefault: checked as boolean })
                      }
                    />
                    <label htmlFor="set-as-default" className="text-sm font-medium">
                      Set as default payment method
                    </label>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit">Process Payment</Button>
                <Button type="button" variant="outline" onClick={() => setShowPaymentForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {clientPayments.length > 0 ? (
            <div className="space-y-4">
              {clientPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-black dark:text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-black dark:text-white">
                        {payment.createdAt} • {payment.provider}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">${payment.amount.toLocaleString()}</p>
                      <Badge
                        variant={
                          payment.status === "completed"
                            ? "default"
                            : payment.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No payments yet</h3>
              <p className="text-black dark:text-white mb-4">Your payment history will appear here</p>
              <Button onClick={() => setShowPaymentForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Make Your First Payment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods for faster checkout</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-black dark:text-white" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-black dark:text-white">Expires 12/25 • Visa</p>
                </div>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Preferences</CardTitle>
          <CardDescription>Manage your payment and notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email receipts</p>
              <p className="text-sm text-black dark:text-white">Receive payment confirmations via email</p>
            </div>
            <Switch
              checked={paymentPreferences.emailReceipts}
              onCheckedChange={(checked) => setPaymentPreferences({ ...paymentPreferences, emailReceipts: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS notifications</p>
              <p className="text-sm text-black dark:text-white">Get payment updates via text message</p>
            </div>
            <Switch
              checked={paymentPreferences.smsNotifications}
              onCheckedChange={(checked) => setPaymentPreferences({ ...paymentPreferences, smsNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-pay</p>
              <p className="text-sm text-black dark:text-white">Automatically pay recurring invoices</p>
            </div>
            <Switch
              checked={paymentPreferences.autoPayEnabled}
              onCheckedChange={(checked) => setPaymentPreferences({ ...paymentPreferences, autoPayEnabled: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
