import Link from "next/link";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/inventory">Inventory</Link>
          </li>
          <li>
            <Link href="/wishing-tree">Wishing Tree</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
