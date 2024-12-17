"use client";

import { createOffer } from "@/actions";
import { Item, ItemInstance } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import itemStyles from "./Item.module.scss";
import playfulButton from "@/components/PlayfulButton.module.scss";

type ItemInput = {
  id: number;
  checked: boolean;
};

type Inputs = {
  coins: number;
  items: ItemInput[];
};

type ItemInstanceWithItem = ItemInstance & {
  item: Item;
};

export default function CreateOffer({
  items,
  lotId,
}: {
  items: ItemInstanceWithItem[];
  lotId: string;
}) {
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      items: items.map((item) => ({
        id: item.id,
        checked: false,
      })),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    createOffer(
      lotId,
      data.coins.toString(),
      data.items
        .filter((item) => item.checked)
        .map((item) => item.id.toString())
    );
  };
  const itemsForm = watch("items");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Items</label>
      <div className={itemStyles.itemList}></div>

      {items.map((item, index) => (
        <div
          key={item.id}
          className={`${itemStyles.item} ${
            itemsForm[index].checked && itemStyles.itemSelected
          }`}
          onClick={() => {
            // Toggle the checked state of the item
            setValue(`items.${index}.checked`, !itemsForm[index].checked);
          }}
        >
          <Image
            src={item.item.image}
            alt={item.item.name}
            width={100}
            height={100}
          />
        </div>
      ))}

      <label>Coins</label>
      <input {...register("coins")} defaultValue={0} type="number" />
      <div className={playfulButton["playful-button"]}>
        <button type="submit">Create Offer</button>
      </div>
    </form>
  );
}
