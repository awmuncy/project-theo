import { PrismaClient } from "@prisma/client";
import { Command } from "commander";

const prisma = new PrismaClient();

export function withdrawLotCommand(parent: Command) {
  parent
    .command("withdraw <lotId>")
    .description(`Remove a lot from offer`)
    .action(async (lotId: string) => {
      try {
        await prisma.$transaction(async (prisma) => {
          const lot = await prisma.lot.findUnique({
            where: {
              id: parseInt(lotId),
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
              id: parseInt(lotId),
            },
          });
        });
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    });
}
