import { InventoryItem } from "@/components/InventoryItem";
import { getAuthCheck } from "@/service/auth";
import styles from "@/components/Inventory.module.scss";
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
        <div className={styles.inventory}>
          {inventory.length ? null : (
            <div>You have no items in your inventory</div>
          )}
          {inventory.map((item) => (
            <InventoryItem key={item.id} item={item.item} />
          ))}
        </div>
      </main>
    </div>
  );
}
