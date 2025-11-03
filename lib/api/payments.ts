import { apiClient } from './client'

// Payment API utilities
export interface PaymentRequest {
  amount: number
  provider: "stripe" | "paypal" | "bank"
  description: string
  userId: string
}

export interface PaymentResponse {
  success: boolean
  payment?: {
    id: string
    userId: string
    amount: number
    currency: string
    status: "completed" | "failed" | "pending"
    provider: string
    description: string
    createdAt: string
    transactionId: string
  }
  message: string
  error?: string
}

export async function processPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    const result = await apiClient.processPayment(paymentData) as PaymentResponse
    return result
  } catch (error) {
    return {
      success: false,
      message: "Network error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function fetchPaymentHistory(userId: string) {
  try {
    const result = await apiClient.getPaymentHistory(userId)
    return result
  } catch (error) {
    console.error("Failed to fetch payment history:", error)
    return { payments: [] }
  }
}

export async function fetchBillingData(userId: string) {
  try {
    const response = await fetch(`/api/billing?userId=${userId}`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error("Failed to fetch billing data:", error)
    return null
  }
}

export async function changePlan(userId: string, planId: string) {
  try {
    const response = await fetch("/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "changePlan",
        userId,
        planId,
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    return {
      success: false,
      message: "Failed to change plan",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function cancelSubscription(userId: string) {
  try {
    const response = await fetch("/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "cancelSubscription",
        userId,
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    return {
      success: false,
      message: "Failed to cancel subscription",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
