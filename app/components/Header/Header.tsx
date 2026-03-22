'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Header.module.scss';

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav_container}>
      {pathname !== '/' && (
        <Link className={styles.link} href="/">
          Home
        </Link>
      )}
      {pathname !== '/dbList' && (
        <Link className={styles.link} href="/dbList">
          db List
        </Link>
      )}
    </nav>
  );
};

export default Header;
