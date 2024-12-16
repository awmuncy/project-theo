import { RenderLot } from "@/components/Lot";
import { getAuthCheck } from "@/service/auth";
import { PrismaClient } from "@prisma/client";
import TradingPostStyles from "./TradingPost.module.scss";

const prisma = new PrismaClient();

export default async function Lots({ userId }: { userId: number | null }) {
  const auth = await getAuthCheck();

  // Get all the lots, and display them
  // Limit to 10 lots
  const lots = await prisma.lot.findMany({
    take: 10,

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

  return (
    <div className={TradingPostStyles.lots}>
      {lots.map((lot) => (
        <RenderLot key={lot.id} auth={auth} lot={lot} />
      ))}
    </div>
  );
}