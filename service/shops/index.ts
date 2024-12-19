import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createShop(userId: number) {
  const shop = await prisma.shop.create({
    data: {
      till: 0,
      userId,
    },
  });

  return shop;
}

function userLookup(shopNameOrUserId: number) {
  return shopNameOrUserId;
}
export async function getShop(shopNameOrUserId: number, visitorId: number) {
  const userId = userLookup(shopNameOrUserId);

  if (userId !== visitorId) {
    throw new Error("You are not allowed to view this shop");
  }

  const items = await prisma.shop.findFirst({
    where: {
      userId: shopNameOrUserId,
    },
    include: {
      items: {
        where: {
          price: {
            gt: 0,
          },
        },
        include: {
          item: true,
        },
      },
    },
  });

  return items;
}

export async function addItemsToShop(shopId: number, itemIds: number[]) {
  // Check that shop size is not exceeded
  const itemsInShop = await prisma.shopItem.count({
    where: {
      shopId,
    },
  });

  if (itemsInShop >= shop.shopSize) {
    throw new Error("Shop is full");
  }

  const items = await prisma.shopItem.createMany({
    data: itemIds.map((itemId) => {
      return {
        itemId,
        price: 0,
        shopId,
      };
    }),
  });

  return items;
}
