import { RenderLot } from "@/components/Lot";
import { getAuthCheck } from "@/service/auth";
import TradingPostStyles from "./TradingPost.module.scss";
import { getLots } from "@/service/trading-post";

export default async function Lots({ userId }: { userId: string | null }) {
  const [auth, lots] = await Promise.all([
    getAuthCheck(),
    getLots({
      userId: userId ? parseInt(userId) : undefined,
    }),
  ]);

  return (
    <div className={TradingPostStyles.lots}>
      {lots.map((lot) => (
        <RenderLot key={lot.id} auth={auth} lot={lot} />
      ))}
    </div>
  );
}
