import { PrismaClient } from "@prisma/client";
import { Command } from "commander";
import { addItemCommand } from "./add-item";
import { addItemInstanceCommand } from "./add-item-instance";
import { deleteItemCommand } from "./delete-item";

const prisma = new PrismaClient();

export const itemCommand = async (parent: Command) => {
  const itemCmd = parent.command("item <name>").action(async (name) => {
    const itemDetails = await prisma.item.findFirst({
      where: {
        name: name,
      },
    });
    if (!itemDetails) throw new Error(`Item ${name} not found`);
    console.log(itemDetails);
  });

  addItemCommand(itemCmd);
  deleteItemCommand(itemCmd);
  addItemInstanceCommand(itemCmd);
};
