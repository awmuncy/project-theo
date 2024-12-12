import { PrismaClient } from "@prisma/client";
import { Command } from "commander";

const prisma = new PrismaClient();

export function deleteItemCommand(parent: Command) {
  parent
    .command("delete <itemId>")
    .description(
      `Delete an item from the library.
      Example:
      \`theo item "ID"\` `
    )
    .action(async (itemId: string) => {
      await prisma.item.deleteMany({
        where: {
          id: parseInt(itemId),
        },
      });
      console.log(`deleted item with id ${itemId}`);
    });
}
