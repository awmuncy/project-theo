import { getShop } from "@/service/shops";
import playfulButton from "@/components/PlayfulButton.module.scss";
import { getAuthCheck } from "@/service/auth";

export default async function Shop({
  params,
}: {
  params: {
    shopNameOrUserId: string;
  };
}) {
  const { shopNameOrUserId } = await params;
  const auth = await getAuthCheck();
  if (!auth) return <div>You are not logged in</div>;
  const shop = await getShop(Number(shopNameOrUserId), auth?.id);
  if (!shop) return <div>Shop not found</div>;
  return (
    <div>
      <h1>Shop</h1>
      {shop.items.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.item.name}</h2>
            <p>{item.item.description}</p>
            <p>Price: {item.price}</p>
            <div className={playfulButton["playful-button"]}>
              <button
              // onClick={() => {
              //   console.log("Buy");
              // }}
              >
                Buy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
