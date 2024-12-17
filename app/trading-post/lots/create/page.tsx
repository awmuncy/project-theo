import CreateLot from "@/components/CreateLot.client";
import { getAuthCheck } from "@/service/auth";
import { getInventory } from "@/service/inventory";

export default async function CreateLotPage() {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  // Get all current user's inventory items
  const items = await getInventory(user.id);

  return (
    <div>
      <h3>Create lot</h3>
      <CreateLot items={items} />
    </div>
  );
}
