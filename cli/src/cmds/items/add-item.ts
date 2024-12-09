import { PrismaClient } from "@prisma/client";
import { Command } from "commander";

const prisma = new PrismaClient();

export function addItemCommand(parent: Command) {
  parent
    .command("add <name> <image> <description> <standardPrice> <rarity>")
    .option("-f, --fug <hello>", "Enable debug mode")
    .description(
      `Add an item to the library. 
      Example:
      \`theo item "Popcorn" "/images/unpopped-popcorn.webp" "A bag of popcorn" 10 1\`
      `
    )
    .action(
      async (
        name: string,
        image: string,
        description: string,
        standardPrice: string,
        rarity: string
      ) => {
        try {
          await prisma.item.createMany({
            data: [
              {
                name,
                image,
                description,
                standardPrice: parseInt(standardPrice),
                rarity: parseInt(rarity),
              },
            ],
          });

          console.log(name, image, description, standardPrice, rarity);
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      }
    );
}
