'use client';

import { useRouter } from 'next/navigation';
import styles from './not-found.module.scss';
import Button from './components/Button/Button';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Button type="button" variant="primary" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
