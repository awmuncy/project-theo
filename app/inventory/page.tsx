import { InventoryItem } from "@/components/InventoryItem";

export default async function Home() {
  return (
    <div className="container">
      <main className="main">
        <InventoryItem />
      </main>
    </div>
  );
}
