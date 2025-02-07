"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getAuthCheck } from "./service/auth";

const prisma = new PrismaClient();

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

export async function createOffer(
  lotId: string,
  coins: string,
  itemIds: string[]
) {
  const authUser = await getAuthCheck();

  if (!authUser) {
    throw new Error("User not logged in");
  }

  await createOfferCore(authUser.id, parseInt(lotId), parseInt(coins), itemIds);

  redirect("/inventory");
}

export async function createOfferCore(
  userId: number,
  lotId: number,
  coins: number,
  itemIds: string[]
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
        inventoryType: "inventory",
      },
      lotId: null,
      offerId: null,
      id: {
        in: itemIds.map((itemId) => parseInt(itemId)),
      },
    },
    select: {
      id: true,
    },
  });

  if (items.length !== itemIds.length) {
    throw new Error("Not all items exist in the users inventory");
  }

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

    await prisma.offer.create({
      data: {
        userId: userId,
        coins: coins,
        items: {
          connect: items.map((item) => ({
            id: item.id,
          })),
        },
        lotId: lotId,
      },
    });
  });
}

export async function rejectOffer(offerId: number) {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  rejectOfferCore(user.id, offerId);

  redirect("/inventory");
}

export async function rejectOfferCore(userId: number, offerId: number) {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  // Check if the user is owner of lot the offer is for
  const offer = await prisma.offer.findUnique({
    where: {
      id: offerId,
    },
    include: {
      user: true,
      lot: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!offer) {
    throw new Error("Offer does not exist");
  }

  if (offer.lot.user.id !== user.id) {
    throw new Error("You do not own the lot this offer is for");
  }

  await prisma.offer.delete({
    where: {
      id: offerId,
    },
  });
}

export async function withdrawOffer(offerId: number) {
  const user = await getAuthCheck();

  if (!user) {
    throw new Error("User not logged in");
  }

  const lot = await prisma.offer.findUnique({
    where: {
      id: offerId,
    },
  });

  if (!lot) {
    throw new Error("Offer does not exist");
  }

  if (lot.userId !== user.id) {
    throw new Error("You do not own this offer");
  }

  await prisma.offer.delete({
    where: {
      id: offerId,
    },
  });

  redirect("/inventory");
}

export async function acceptOffer(offerId: number) {
  const user = await getAuthCheck();

  console.log(`
    
    Offer ID: ${offerId}
    
    
    `);

  if (!user) {
    throw new Error("User not logged in");
  }

  await acceptOfferCore(user.id, offerId);

  redirect("/inventory");
}

export async function acceptOfferCore(userId: number, offerId: number) {
  // Check if the user is owner of lot the offer is for
  const offer = await prisma.offer.findUnique({
    where: {
      id: offerId,
    },
    include: {
      user: true,
      lot: {
        include: {
          user: true,
          items: true,
        },
      },
      items: {
        include: {
          item: true,
        },
      },
    },
  });

  if (!offer) {
    throw new Error("Offer does not exist");
  }

  const lot = offer.lot;

  if (offer.lot.user.id !== userId) {
    throw new Error("You do not own the lot this offer is for");
  }

  const userLotGoesTo = offer?.user;

  const userOfferGoesTo = lot?.user;

  // Here's the tricky bit.
  await prisma.$transaction(async (prisma) => {
    // Update coins
    await prisma.user.update({
      where: {
        id: userLotGoesTo.id,
      },
      data: {
        coins: {
          increment: lot.coins,
        },
      },
      include: {
        inventory: true,
      },
    });

    await prisma.user.update({
      where: {
        id: userOfferGoesTo.id,
      },
      data: {
        coins: {
          increment: offer.coins,
        },
      },
    });

    // Update items
    changeItemsInventory(
      userOfferGoesTo.id,
      offer.items.map((item) => item.id)
    );
    changeItemsInventory(
      userLotGoesTo.id,
      lot.items.map((item) => item.id)
    );

    // Close offer

    // Closer other offers that are for the same lot
    // Need to make "null" the offerId for any items that are in offers that are for the same lot
    await prisma.itemInstance.updateMany({
      where: {
        Offer: {
          lotId: lot.id,
        },
      },
      data: {
        offerId: null,
      },
    });
    await prisma.offer.deleteMany({
      where: {
        lotId: lot.id,
      },
    });

    // Close lot
    await prisma.lot.delete({
      where: {
        id: lot.id,
      },
    });
  });
}

export async function changeItemsInventory(
  userId: number,
  itemInstanceIds: number[]
) {
  const inventory = await prisma.inventory.findFirst({
    where: {
      ownerId: userId,
      inventoryType: "inventory",
    },
  });

  if (!inventory) {
    throw new Error("User does not have an inventory");
  }

  await prisma.itemInstance.updateMany({
    where: {
      id: {
        in: itemInstanceIds.map((itemInstanceId) => itemInstanceId),
      },
    },
    data: {
      inventoryId: inventory.id,
    },
  });
}
