"use client";

import { scroungeWishingTree } from "@/actions";
import Image from "next/image";

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
      <Image
        src="/images/wishing-tree.png"
        alt="wishing tree"
        width={400}
        height={400}
      />
    </div>
  );
}
