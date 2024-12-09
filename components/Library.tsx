import { Item } from "@prisma/client";
import Image from "next/image";

export function Library({
    items
}: {
    items: Item[]
}) {
  return (
    <div className="library">
      <h1>Library</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <Image
              src={item.image}
              alt={item.name}
              width={500}
              height={500}
              className="item"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}