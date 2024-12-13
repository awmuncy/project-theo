import { InventoryItem } from "@/components/InventoryItem";
import { getAuthCheck } from "@/service/auth";
import { PrismaClient } from "@prisma/client";
import styles from "../../components/Inventory.module.scss";

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
        <div className={styles.inventory}>
          {items.map((item) => (
            <InventoryItem key={item.id} item={item.item} />
          ))}
        </div>
      </main>
    </div>
  );
}
