// frontend/lib/requests.ts
import { toast } from "@/components/ui/use-toast"; // shadcn toast
import { publicInstance, privateInstance } from "./instance";
import { API } from "./api";

// Generic error handler
const handleError = (error: any): never => {
    const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
    toast({ title: "Error", description: message, variant: "destructive" });
    throw error;
};

// Types
export interface AuthPayload {
    email: string;
    password: string;
    name?: string;
    role?: "LAWYER" | "CLIENT";
    barNumber?: string;
    isFirm?: boolean;
    firmName?: string;
}

export interface CasePayload {
    title: string;
    description: string;
    jurisdiction: string;
    courtName: string;
    lawyerId?: string;
    clientId?: string;
}

export interface DraftPayload {
    caseId: string;
    petitionType: string;
    content?: string;
    facts?: string;
}

// Clean request functions grouped
const requests = {
    auth: {
        register: (data: AuthPayload) => publicInstance.post(API.auth.register, data).catch(handleError),
        login: (data: { email: string; password: string }) => publicInstance.post(API.auth.login, data).catch(handleError),
        refresh: () => publicInstance.post(API.auth.refresh).catch(handleError),
        logout: () => publicInstance.post(API.auth.logout).catch(handleError),
    },

    users: {
        getMe: () => privateInstance.get(API.users.me).catch(handleError),
        updateMe: (data: FormData | Partial<AuthPayload>) => privateInstance.patch(API.users.updateMe, data).catch(handleError),
    },

    cases: {
        list: () => privateInstance.get(API.cases.list).catch(handleError),
        create: (data: CasePayload) => privateInstance.post(API.cases.create, data).catch(handleError),
        get: (id: string) => privateInstance.get(API.cases.get(id)).catch(handleError),
        update: (id: string, data: Partial<CasePayload>) => privateInstance.patch(API.cases.update(id), data).catch(handleError),
    },

    drafts: {
        list: () => privateInstance.get(API.drafts.list).catch(handleError),
        create: (data: DraftPayload) => privateInstance.post(API.drafts.create, data).catch(handleError),
        aiDraft: (data: { caseId: string; petitionType: string; facts: string }) => privateInstance.post(API.drafts.aiDraft, data).catch(handleError),
        get: (id: string) => privateInstance.get(API.drafts.get(id)).catch(handleError),
        update: (id: string, data: Partial<DraftPayload>) => privateInstance.patch(API.drafts.update(id), data).catch(handleError),
    },

    payments: {
        razorpayInitiate: (data: { amount: number; currency: string }) => privateInstance.post(API.payments.razorpayInitiate, data).catch(handleError),
        stripeCreatePaymentIntent: (data: { amount: number; currency: string }) => privateInstance.post(API.payments.stripeCreatePaymentIntent, data).catch(handleError),
    },
};

export default requests;
