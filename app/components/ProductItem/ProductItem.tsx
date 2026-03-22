// 'use client';
// import { Product } from '@prisma/client';
// import Button from '../Button/Button';

// import styles from './ProductItem.module.scss';

// type ProductItemProps = {
//   product: Product;
//   onOpen: (product: Product) => void;
// };

// export default function ProductItem({ product, onOpen }: ProductItemProps) {
//   return (
//     <li className={styles.li}>
//       {product.category}: {product.name} — {product.quantity} |{' '}
//       {product.description}
//       <Button
//         type="button"
//         variant="details"
//         onClick={() => onOpen(product)}
//         disabled={false}
//       >
//         <svg className={styles.editSvgIcon} width="21" height="21">
//           <use href="/sprite.svg#icon-edit"></use>
//         </svg>
//       </Button>
//     </li>
//   );
// }
'use client';
import { Product } from '@prisma/client';
import Button from '../Button/Button';
import styles from './ProductItem.module.scss';

type ProductItemProps = {
  product: Product;
  onOpen: (product: Product) => void;
};

export default function ProductItem({ product, onOpen }: ProductItemProps) {
  return (
    // <div className={styles.wrapper}>
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
    // </div>
  );
}
