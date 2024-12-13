import { Item, Lot, User } from "@prisma/client";

import Image from "next/image";
import TradingPostStyles from "./TradingPost.module.scss";

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
      <p>
        {lot.coins} coins
        <Image src={"/images/coin.png"} alt="Coin" width={32} height={32} />
      </p>
      <ul>
        {lot.items.map((item) => (
          <li key={item.id}>
            {item.item.name}
            <Image
              src={item.item.image}
              alt={item.item.name}
              width={32}
              height={32}
            />
          </li>
        ))}
      </ul>
      {lot.user.id !== auth?.id ? (
        <button>Make offer</button>
      ) : (
        <button>View offers</button>
      )}
    </div>
  );
}
