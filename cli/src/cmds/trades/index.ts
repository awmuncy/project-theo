import { Command } from "commander";
import { newLotCommand } from "./new-lot";
import { withdrawLotCommand } from "./withdraw-lot";
import { newOfferCommand } from "./new-offer";

// const prisma = new PrismaClient();

export const tradesCommand = async (parent: Command) => {
  const itemCmd = parent.command("lot <id>").action(async (name) => {
    // By lot ID, list the items in the lot and the coins
  });

  newLotCommand(itemCmd);
  withdrawLotCommand(itemCmd);
  newOfferCommand(itemCmd);
};
