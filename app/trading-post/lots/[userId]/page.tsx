import Lots from "@/components/Lots";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <div>
      <h1>My lots</h1>
      <Lots userId={userId} />
    </div>
  );
}
