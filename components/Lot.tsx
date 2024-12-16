import { Item, Lot, User } from "@prisma/client";

import Image from "next/image";
import TradingPostStyles from "./TradingPost.module.scss";
import playfulButton from "./PlayfulButton.module.scss";

import { CloseLot } from "./CloseLot.client";
import Link from "next/link";

export function RenderLot({
  auth,
  lot,
}: {
  auth: User | null;
  lot: Lot & {
    user: User;
    items: {
      id: number;
      item: Item;
    }[];
  };
}) {
  return (
    <div key={lot.id} className={TradingPostStyles.lot}>
      <h2>Lot #{lot.id}</h2>

      <ul className={TradingPostStyles.lotItems}>
        {lot.coins > 0 && (
          <li className={TradingPostStyles.lotItem}>
            <Image src={"/images/coin.png"} alt="Coin" width={32} height={32} />
            {lot.coins} coins
          </li>
        )}
        {lot.items.map((item) => (
          <li key={item.id} className={TradingPostStyles.lotItem}>
            <Image
              src={item.item.image}
              alt={item.item.name}
              width={32}
              height={32}
            />
            {item.item.name}
          </li>
        ))}
      </ul>

      {lot.user.id !== auth?.id ? (
        <div className={playfulButton["playful-button"]}>
          <button>Make offer</button>
        </div>
      ) : (
        <>
          <div className={playfulButton["playful-button"]}>
            <CloseLot lot={lot} />
          </div>
          <div className={playfulButton["playful-button"]}>
            <Link href={`/trading-post/lot/${lot.id}/offers`}>View offers</Link>
          </div>
        </>
      )}
    </div>
  );
}
