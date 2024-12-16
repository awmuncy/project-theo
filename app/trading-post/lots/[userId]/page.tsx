import Lots from "@/components/Lots";

export default async function Page({ params }: { params: { userId: string } }) {
  return (
    <div>
      <h1>My lots</h1>
      <Lots userId={parseInt(params.userId)} />
    </div>
  );
}
