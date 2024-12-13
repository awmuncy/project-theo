import { SignOutButton } from "@clerk/nextjs";
import styles from "./Header.module.scss";
import Image from "next/image";
import playfulButton from "./PlayfulButton.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.user}>
        <Image
          height={50}
          width={50}
          src="/images/tricute.webp"
          alt="Coin"
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <span className={styles.nickName}>Allen Muncy</span>
          <span className={styles.userName}>awmuncy</span>
        </div>
      </span>
      <span className={styles.coins}>
        <Image height={16} width={16} src="/images/coin.png" alt="Coin" />
        100
      </span>

      <div className={playfulButton["playful-button"]}>
        <SignOutButton />
      </div>
    </header>
  );
}
