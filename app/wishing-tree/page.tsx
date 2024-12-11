import { WishingTree } from "@/components/WishingTree";
import { getAuthCheck } from "@/service/auth";

export default async function Home() {
  await getAuthCheck();

  return (
    <div className="container">
      <main className="main">
        <WishingTree />
      </main>
    </div>
  );
}
