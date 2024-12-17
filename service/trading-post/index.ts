import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Default arg is empty object
export async function getLots({
  userId,
  page,
}: {
  userId?: number;
  page?: number;
} = {}) {
  const lots = await prisma.lot.findMany({
    take: 10,
    skip: (page || 1) * 10 - 10,

    where: {
      userId: userId ?? undefined,
    },

    include: {
      user: true,
      items: {
        select: {
          id: true,
          item: true,
        },
      },
    },
  });

  return lots;
}

export async function getOffers(userId?: number, lotId?: number) {
  const offers = await prisma.offer.findMany({
    where: {
      userId: userId ?? undefined,
      lotId: lotId ?? undefined,
    },
    include: {
      items: {
        include: {
          item: true,
        },
      },
      lot: {
        include: {
          user: true,
          items: {
            include: {
              item: true,
            },
          },
        },
      },
    },
  });

  return offers;
}
