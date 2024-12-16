"use client";

import { closeLot } from "@/actions";

export function CloseLot({
  lot,
}: {
  lot: {
    id: number;
  };
}) {
  return (
    <button
      onClick={() => {
        closeLot(lot.id);
      }}
    >
      Close lot
    </button>
  );
}
