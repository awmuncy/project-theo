import Image from "next/image";
import styles from "./Inventory.module.scss";

type Item = {
  name: string;
  image: string;
};

export function InventoryItem({ item }: { item: Item }) {
  return (
    <div className={styles.inventoryItem}>
      <h2>{item.name}</h2>
      <Image
        src={item.image}
        alt="item"
        width={100}
        height={100}
        className="item"
      />
    </div>
  );
}
