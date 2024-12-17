import CreateOffer from "@/components/NewOffer.client";
import { getAuthCheck } from "@/service/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function OfferPage({
  params,
}: {
  params: { lotId: string };
}) {
  const { lotId } = await params;

  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  // Get all current user's inventory items
  const items = await prisma.itemInstance.findMany({
    where: {
      inventory: {
        owner: {
          id: user.id,
        },
      },
      lotId: null,
      offerId: null,
    },

    include: {
      item: true,
    },
  });

  return (
    <div>
      <h3>Offer Page</h3>
      <CreateOffer lotId={lotId} items={items} />
    </div>
  );
}
