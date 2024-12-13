import { PrismaClient } from "@prisma/client";
import { Command } from "commander";

const prisma = new PrismaClient();

async function createLot(userId: string, coins: number, itemIds: number[]) {
  // Make sure the user has enough coins in free inventory
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
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
          id: parseInt(userId),
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
        id: parseInt(userId),
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
        id: parseInt(userId),
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
        userId: parseInt(userId),
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

export function newLotCommand(parent: Command) {
  parent
    .command("add <userId> <coins> [itemInstanceIds...]")
    .description(`Create a lot for offer`)
    .action(
      async (userId: string, coins: string, itemInstanceIds: string[]) => {
        try {
          await createLot(
            userId,
            parseInt(coins),
            itemInstanceIds.map((itemId) => parseInt(itemId))
          );
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      }
    );
}
