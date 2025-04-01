export interface Participation {
    id?: string;
    versionId: string;
    eventId: string;
    participantId: string;
    joinedAt: Date;
    paymentSubmitted: boolean;
    paymentVerified: boolean;
    paymentProofUrl?: string;
    status: "pending_payment" | "confirmed" | "cancelled";
  }