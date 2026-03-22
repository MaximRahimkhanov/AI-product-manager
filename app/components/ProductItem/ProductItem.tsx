'use client';
import { ProductType } from '@/app/types/product';
import Button from '../Button/Button';
import styles from './ProductItem.module.scss';

type ProductItemProps = {
  product: ProductType;
  onOpen: (product: ProductType) => void;
};

export default function ProductItem({ product, onOpen }: ProductItemProps) {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{product.name}</td>
      <td className={styles.td}>{product.quantity}</td>
      <td className={styles.td}>{product.category ?? '-'}</td>
      <td className={styles.td}>{product.description ?? '-'}</td>
      <td className={styles.td}>
        {new Date(product.createdAt).toLocaleString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </td>
      <td className={styles.td}>
        <Button type="button" variant="details" onClick={() => onOpen(product)}>
          <svg className={styles.editSvgIcon} width="21" height="21">
            <use href="/sprite.svg#icon-edit"></use>
          </svg>
        </Button>
      </td>
    </tr>
  );
}
