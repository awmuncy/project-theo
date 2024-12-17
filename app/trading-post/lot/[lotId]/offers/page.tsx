import Image from "next/image";
import playfulButton from "@/components/PlayfulButton.module.scss";
import Link from "next/link";

import { AcceptOffer, RejectOffer } from "@/components/OfferButtons.client";
import { getOffers } from "@/service/trading-post";

export default async function OfferPage({
  params,
}: {
  params: {
    lotId: string;
  };
}) {
  const { lotId } = await params;
  // TODO: Right now anyone can view offers, but we need to make sure only the owner can view their own offers

  const offers = await getOffers(undefined, parseInt(lotId));

  return (
    <div>
      {offers.length > 0 ? (
        offers.map((offer) => (
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
              <Link href={`/trading-post/lot/${lotId}/offer/${offer.id}`}>
                View offer
              </Link>
              <AcceptOffer offerId={offer.id} />

              <RejectOffer offerId={offer.id} />
            </div>
          </div>
        ))
      ) : (
        <div>No offers</div>
      )}
    </div>
  );
}
