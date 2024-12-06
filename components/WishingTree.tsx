"use client";

import { scroungeWishingTree } from "@/actions";

export function WishingTree() {
  return (
    <div className="wishing-tree">
      <h1>Wishing Tree</h1>
      <button
        onClick={() => {
          console.log("buy");
        }}
      >
        Buy
      </button>
      <button
        onClick={() => {
          console.log("scrounge");
          scroungeWishingTree();
        }}
      >
        Scrounge
      </button>
    </div>
  );
}
