import Link from "next/link";
import playfulButton from "./PlayfulButton.module.scss";
import styles from "./Sidebar.module.scss";
import Image from "next/image";

export function Sidebar() {
  return (
    <nav>
      <ul className={styles.sidebar}>
        <li className={playfulButton["playful-button"]}>
          <Link href="/inventory">
            <Image
              src="/images/boxey.png"
              alt="inventory"
              width={32}
              height={32}
            />
            Inventory
          </Link>
        </li>
        <li className={playfulButton["playful-button"]}>
          <Link href="/wishing-tree">Wishing Tree</Link>
        </li>
        <li className={playfulButton["playful-button"]}>
          <Link href="/trading-post">
            {" "}
            <Image
              src="/images/trading-post.png"
              alt="inventory"
              width={32}
              height={32}
            />
            Trading Post
          </Link>
        </li>
        <li className={playfulButton["playful-button"]}>
          <Link href="/shops">Shops</Link>
        </li>
      </ul>
    </nav>
  );
}
