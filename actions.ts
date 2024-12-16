"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getAuthCheck } from "./service/auth";

export async function generateItemForUser(userId: number) {
  // Random number between 1 and 5
  const randomNumber = Math.floor(Math.random() * 5) + 1;

  // Select a random item and create an instance of it
  const items = await prisma.item.findMany({
    where: {
      rarity: randomNumber,
    },
  });

  if (items.length == 0) throw new Error("No items of rarity found");

  const item = items[Math.floor(Math.random() * items.length)];

  if (!item) {
    throw new Error("No wishing tree item found");
  }

  // Find inventory of current user with inventoryType of "inventory"
  const inventory = await prisma.inventory.findFirstOrThrow({
    where: {
      inventoryType: "inventory",
      ownerId: userId,
    },
    select: {
      id: true,
    },
    take: 1,
  });

  // Create an item, and attach it to the user's inventory with inventoryType of "inventory"
  await prisma.itemInstance.create({
    data: {
      itemId: item.id,
      // Connect to inventory of current user
      inventoryId: inventory.id,
    },
  });
}
export async function scroungeWishingTree() {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  generateItemForUser(user.id);

  redirect("/inventory");
}

export async function buyWishingTree() {
  redirect("/inventory");
}

export async function closeLotCore(lotId: number) {
  await prisma.$transaction(async (prisma) => {
    const lot = await prisma.lot.findUnique({
      where: {
        id: lotId,
      },
    });

    if (!lot) {
      throw new Error("Lot does not exist");
    }

    const coins = lot.coins;

    await prisma.user.update({
      where: {
        id: lot.userId,
      },
      data: {
        coins: {
          increment: coins,
        },
      },
    });

    await prisma.lot.delete({
      where: {
        id: lotId,
      },
    });
  });
  return;
}
export async function closeLot(lotId: number) {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  const lotOwner = await prisma.lot.findFirstOrThrow({
    where: {
      id: lotId,
    },
    include: {
      user: true,
    },
  });

  if (lotOwner.user.id !== user.id) {
    throw new Error("You do not own this lot");
  }

  closeLotCore(lotId);

  redirect("/inventory");
}

export async function pickCoinsOffTree() {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  // Add coins to user's free inventory
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      coins: {
        increment: 10,
      },
    },
  });

  redirect("/inventory");
}

const prisma = new PrismaClient();

export async function createLot(coins: string, itemIds: string[]) {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  // Convert itemIds to numbers
  const itemIdsConverted = itemIds.map((itemId) => parseInt(itemId));

  await createLotCore(user.id, parseInt(coins), itemIdsConverted);
}

export async function createLotCore(
  userId: number,
  coins: number,
  itemIds: number[]
) {
  // Make sure the user has enough coins in free inventory
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      coins: true,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  if (user.coins < coins) {
    throw new Error("Not enough coins in free inventory");
  }

  // Make sure the item exists in the users inventory
  const items = await prisma.itemInstance.findMany({
    where: {
      inventory: {
        owner: {
          id: userId,
        },
      },
      id: {
        in: itemIds,
      },
    },
  });

  if (items.length !== itemIds.length) {
    throw new Error("Not all items exist in the users inventory");
  }

  // Make sure the items are not already in a lot
  const lots = await prisma.lot.findMany({
    where: {
      user: {
        id: userId,
      },
      items: {
        some: {
          id: {
            in: itemIds,
          },
        },
      },
    },
  });

  if (lots.length > 0) {
    throw new Error("Items are already in a lot");
  }

  // Make sure none of the items are in the inventory
  console.log("Let's pretend they have the items");

  await prisma.$transaction(async (prisma) => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        coins: {
          decrement: coins,
        },
      },
    });

    //Finally, remove from inventory and add to lot
    await prisma.lot.create({
      data: {
        userId: userId,
        coins: coins,
        items: {
          connect: items.map((item) => ({
            id: item.id,
          })),
        },
      },
    });
  });
}
