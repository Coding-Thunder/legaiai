// frontend/lib/api.ts

export const API = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    refresh: "/api/auth/refresh",
    logout: "/api/auth/logout",
  },
  users: {
    me: "/api/users/me",
    updateMe: "/api/users/me",
  },
  cases: {
    list: "/api/cases",
    create: "/api/cases",
    get: (id: string) => `/api/cases/${id}`,
    update: (id: string) => `/api/cases/${id}`,
  },
  drafts: {
    list: "/api/drafts",
    create: "/api/drafts",
    aiDraft: "/api/ai/draft",
    get: (id: string) => `/api/drafts/${id}`,
    update: (id: string) => `/api/drafts/${id}`,
  },
  payments: {
    razorpayInitiate: "/api/payments/razorpay/initiate",
    stripeCreatePaymentIntent: "/api/payments/stripe/create-payment-intent",
    webhook: "/api/payments/webhook",
  },
};
