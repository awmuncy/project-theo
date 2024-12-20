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

export async function getShop(shopNameOrUserId: string) {
  const shop = await prisma.shop.findFirst({
    where: {
      user: {
        username: shopNameOrUserId,
      },
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

  return shop;
}

export async function addItemsToShop(shopId: number, itemIds: number[]) {
  // Check that shop size is not exceeded
  const itemsInShop = await prisma.shopItem.count({
    where: {
      shopId,
    },
  });

  const shop = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
  });

  if (!shop) {
    throw new Error("Shop does not exist");
  }

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
