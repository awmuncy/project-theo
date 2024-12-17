"use client";

import { acceptOffer, rejectOffer, withdrawOffer } from "@/actions";

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

export function WithdrawOffer({ offerId }: { offerId: number }) {
  return (
    <div>
      <button
        onClick={() => {
          withdrawOffer(offerId);
        }}
      >
        Withdraw offer
      </button>
    </div>
  );
}
