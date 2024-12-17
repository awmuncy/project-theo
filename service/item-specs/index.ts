import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getItemSpecs() {
  const items = await prisma.item.findMany();
  return items;
}
