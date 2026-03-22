import { Toaster } from 'react-hot-toast';
import styles from './AppToaster.module.scss';

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        className: styles.toast,
        success: {
          className: styles.success,
        },
        error: {
          className: styles.error,
        },
        loading: {
          className: styles.loading,
        },
      }}
    />
  );
}
