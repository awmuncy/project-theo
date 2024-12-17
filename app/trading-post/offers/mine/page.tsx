import { WithdrawOffer } from "@/components/OfferButtons.client";
import { getAuthCheck } from "@/service/auth";
import Image from "next/image";
import Link from "next/link";
import playfulButton from "@/components/PlayfulButton.module.scss";
import { getOffers } from "@/service/trading-post";

export default async function MyOffers() {
  const auth = await getAuthCheck();

  if (!auth) {
    return <div>You are not logged in</div>;
  }

  const offers = await getOffers(auth.id);

  return (
    <div>
      <h1>My Offers</h1>
      <p>This is the page for your offers</p>
      {offers.map((offer) => (
        <div key={offer.id}>
          <h3>Offer</h3>
          <div>
            <h4>Items</h4>
            {offer.items.map((item) => (
              <div key={item.id}>
                {item.item.name}
                <Image
                  src={item.item.image}
                  alt={item.item.name}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
          <div>
            <h4>Coins</h4>
            {offer.coins}
          </div>
          <div className={playfulButton["playful-button"]}>
            <Link href={`/trading-post/lot/${offer.lot.id}/offer/${offer.id}`}>
              View offer
            </Link>
            <WithdrawOffer offerId={offer.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
