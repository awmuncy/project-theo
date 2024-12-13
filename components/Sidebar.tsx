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
            Inventory
            <Image
              src="/images/boxey.png"
              alt="inventory"
              width={32}
              height={32}
            />
          </Link>
        </li>
        <li className={playfulButton["playful-button"]}>
          <Link href="/wishing-tree">
            Wishing Tree
            <Image
              src="/images/gift-box-icon.png"
              alt="inventory"
              width={32}
              height={32}
            />
          </Link>
        </li>
        <li className={playfulButton["playful-button"]}>
          <Link href="/trading-post">
            Trading Post
            <Image
              src="/images/trading.png"
              alt="inventory"
              width={32}
              height={32}
            />
          </Link>
        </li>
        <li className={playfulButton["playful-button"]}>
          <Link href="/shops">
            Shops
            <Image
              src="/images/trading-post.png"
              alt="inventory"
              width={32}
              height={32}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
