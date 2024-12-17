import { Library } from "@/components/Library";
import { getItemSpecs } from "@/service/item-specs";

export default async function Home() {
  const items = await getItemSpecs();

  return (
    <div className="container">
      <main className="main">
        <Library items={items} />
      </main>
    </div>
  );
}
