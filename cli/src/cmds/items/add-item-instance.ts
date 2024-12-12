import { PrismaClient } from "@prisma/client";
import { Command } from "commander";

const prisma = new PrismaClient();

export function addItemInstanceCommand(parent: Command) {
  parent
    .command("add-instance <itemId> <ownerId>")
    .action(async (itemId: string, ownerId: string) => {
      try {
        await prisma.itemInstance.create({
          data: {
            inventoryId: parseInt(ownerId),
            itemId: parseInt(itemId),
          },
        });
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    });
}
