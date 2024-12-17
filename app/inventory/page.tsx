import { InventoryItem } from "@/components/InventoryItem";
import { getAuthCheck } from "@/service/auth";
import { PrismaClient } from "@prisma/client";
import styles from "@/components/Inventory.module.scss";
import Link from "next/link";
import playfulButton from "@/components/PlayfulButton.module.scss";
const prisma = new PrismaClient();

export default async function Home() {
  const auth = await getAuthCheck();

  const items = await prisma.itemInstance.findMany({
    where: {
      inventory: {
        inventoryType: "inventory",
        owner: {
          id: auth?.id,
        },
      },
      AND: {
        lotId: null,
        offerId: null,
      },
    },
    include: {
      item: {
        include: {
          ItemInstance: true,
        },
      },
    },
  });

  return (
    <div className="container">
      <main className="main">
        <div>
          <div className={playfulButton["playful-button"]}>
            <Link href="/trading-post/lots/mine">My Lots</Link>
          </div>
        </div>
        <div className={styles.inventory}>
          {items.map((item) => (
            <InventoryItem key={item.id} item={item.item} />
          ))}
        </div>
      </main>
    </div>
  );
}
