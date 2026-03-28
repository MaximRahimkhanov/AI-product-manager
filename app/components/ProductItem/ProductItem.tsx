'use client';
import { ProductType } from '@/app/types/product';
import Button from '../Button/Button';
import styles from './ProductItem.module.scss';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import Image from 'next/image';

type ProductItemProps = {
  product: ProductType;
  onOpen: (product: ProductType) => void;
};

export default function ProductItem({ product, onOpen }: ProductItemProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            className={styles.thumbnail}
            onClick={() => setSelectedImage(product.image)}
          />
        ) : (
          '-'
        )}

        {selectedImage && (
          <Modal title="Фото товару" handleClose={() => setSelectedImage(null)}>
            <Image
              src={selectedImage}
              alt="Product"
              width={600}
              height={600}
              style={{ objectFit: 'contain' }}
            />
          </Modal>
        )}
      </td>

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
