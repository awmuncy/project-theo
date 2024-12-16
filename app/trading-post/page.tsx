import Lots from "@/components/Lots";

export default async function Page() {
  return (
    <div>
      <h1>Trading post</h1>

      <Lots userId={null} />
    </div>
  );
}
