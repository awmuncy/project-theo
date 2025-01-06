import Lots from "@/components/Lots";
import { getAuthCheck } from "@/service/auth";

export default async function Page() {
  const auth = await getAuthCheck();

  if (!auth) {
    throw new Error("User not logged in");
  }

  return (
    <div>
      <h1>My lots</h1>
      <Lots userId={auth?.id.toString()} />
    </div>
  );
}
