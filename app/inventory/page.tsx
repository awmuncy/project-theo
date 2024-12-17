import { InventoryItem } from "@/components/InventoryItem";
import { getAuthCheck } from "@/service/auth";

import styles from "@/components/Inventory.module.scss";
import Link from "next/link";
import playfulButton from "@/components/PlayfulButton.module.scss";
import { getInventory } from "@/service/inventory";

export default async function Home() {
  const auth = await getAuthCheck();

  if (!auth) {
    return <div>You are not signed in</div>;
  }

  const inventory = await getInventory(auth?.id);

  return (
    <div className="container">
      <main className="main">
        <div>
          <div className={playfulButton["playful-button"]}>
            <Link href="/trading-post/lots/mine">My Lots</Link>
          </div>
        </div>
        <div className={styles.inventory}>
          {inventory.map((item) => (
            <InventoryItem key={item.id} item={item.item} />
          ))}
        </div>
      </main>
    </div>
  );
}
