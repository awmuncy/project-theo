import Link from "next/link";
import playfulButton from "@/components/PlayfulButton.module.scss";

export default function TradingPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Trading post</h1>
      <div className={playfulButton["playful-button"]}>
        <Link href="/trading-post/lots/create">Create lot</Link>
      </div>
      {children}
    </div>
  );
}
