import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getInventory(userId: number) {
  const items = await prisma.itemInstance.findMany({
    where: {
      inventory: {
        inventoryType: "inventory",
        owner: {
          id: userId,
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

  return items;
}
