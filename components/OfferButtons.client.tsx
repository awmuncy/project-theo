"use client";

import { acceptOffer, rejectOffer } from "@/actions";

export function RejectOffer({ offerId }: { offerId: number }) {
  return (
    <div>
      <button
        onClick={() => {
          rejectOffer(offerId);
        }}
      >
        Reject offer
      </button>
    </div>
  );
}

export function AcceptOffer({ offerId }: { offerId: number }) {
  return (
    <div>
      <button
        onClick={() => {
          acceptOffer(offerId);
        }}
      >
        Accept offer
      </button>
    </div>
  );
}
