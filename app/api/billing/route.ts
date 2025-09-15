import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  // Mock billing data
  const billingData = {
    currentPlan: {
      name: "Professional",
      price: 149,
      billingCycle: "monthly",
      nextBilling: "2024-02-15",
      features: ["Unlimited cases", "Advanced AI features", "Research verification", "Priority support"],
    },
    usage: {
      casesThisMonth: 12,
      casesLimit: "Unlimited",
      draftsGenerated: 28,
      researchUploaded: 5,
    },
    invoices: [
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
    ],
  }

  return NextResponse.json(billingData)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, planId, userId } = body

    // Mock plan change
    if (action === "changePlan") {
      return NextResponse.json({
        success: true,
        message: `Plan changed to ${planId} successfully`,
        newPlan: {
          name: planId,
          price: planId === "basic" ? 49 : planId === "professional" ? 149 : 299,
          billingCycle: "monthly",
        },
      })
    }

    // Mock subscription cancellation
    if (action === "cancelSubscription") {
      return NextResponse.json({
        success: true,
        message: "Subscription cancelled successfully",
        cancellationDate: new Date().toISOString(),
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Billing operation failed" }, { status: 500 })
  }
}
