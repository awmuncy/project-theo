import { Library } from "@/components/Library";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function Home() {

    const items = await prisma.item.findMany();

  return (
    <div className="container">
      <main className="main">
        <Library items={items} />
      </main>
    </div>
  );
}
