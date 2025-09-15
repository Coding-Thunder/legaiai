import { type NextRequest, NextResponse } from "next/server"

// Mock payment processing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, provider, description, userId } = body

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock payment response
    const payment = {
      id: `payment_${Date.now()}`,
      userId,
      amount: Number.parseFloat(amount),
      currency: "USD",
      status: Math.random() > 0.1 ? "completed" : "failed", // 90% success rate
      provider,
      description,
      createdAt: new Date().toISOString(),
      transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
    }

    return NextResponse.json({
      success: payment.status === "completed",
      payment,
      message: payment.status === "completed" ? "Payment processed successfully" : "Payment failed",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Payment processing failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  // Mock payment history
  const payments = [
    {
      id: "payment_1",
      userId,
      amount: 500,
      currency: "USD",
      status: "completed",
      provider: "stripe",
      description: "Legal consultation fee",
      createdAt: "2024-01-15",
    },
    {
      id: "payment_2",
      userId,
      amount: 250,
      currency: "USD",
      status: "completed",
      provider: "paypal",
      description: "Document review fee",
      createdAt: "2024-01-10",
    },
  ]

  return NextResponse.json({ payments })
}
