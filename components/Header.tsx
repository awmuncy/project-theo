import styles from "./Header.module.scss";
import Image from "next/image";

import { getAuthCheck } from "@/service/auth";
import { redirect } from "next/navigation";

export async function Header() {
  const auth = await getAuthCheck();

  if (!auth) {
    redirect("/");
  }

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
          <span className={styles.nickName}>{auth.name}</span>
          <span className={styles.userName}>{auth.username}</span>
        </div>
      </span>
      <span className={styles.coins}>
        <Image height={24} width={24} src="/images/coin.png" alt="Coin" />
        {auth.coins}
      </span>
    </header>
  );
}
