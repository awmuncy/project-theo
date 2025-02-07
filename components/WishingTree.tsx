"use client";

import { pickCoinsOffTree, scroungeWishingTree } from "@/actions";
import Image from "next/image";
import playfulButton from "@/components/PlayfulButton.module.scss";
import layouts from "@/components/Layouts.module.scss";

export function WishingTree() {
  return (
    <div className={`wishing-tree ${layouts.wishingTree}`}>
      <h1>Wishing Tree</h1>
      <Image
        src="/images/wishing-tree.png" 
        alt="wishing tree"
        height={350}
        width={350} 
        />
      <div className={playfulButton["playful-button"]}>
        <button
          onClick={() => {
            scroungeWishingTree();
          }}
        >
          Scrounge
        </button>
        <button
          onClick={() => {
            pickCoinsOffTree();
          }}
        >
          Pick coins off tree
        </button>
      </div>
    </div>
  );
}
