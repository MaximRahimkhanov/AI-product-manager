'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useProducts } from '@/app/hooks/useProducts';
import { filterProducts } from '@/app/lib/helpers/filterProducts';
import { ProductType } from '@/app/types/product';

import Loader from '../Loader/Loader';
import ProductItem from '../ProductItem/ProductItem';
import ProductModal from '../ProductModal/ProductModal';

import styles from './ProductList.module.scss';

interface ProductListProps {
  searchQuery: string;
  sortBy: 'quantity' | 'date' | 'name' | null;
  showCriticalOnly: boolean;
}

export default function ProductList({
  searchQuery,
  sortBy,
  showCriticalOnly,
}: ProductListProps) {
  const { data, isLoading, error } = useProducts();
  const [selected, setSelected] = useState<ProductType | null>(null);

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    let result = filterProducts(data, { searchQuery, sortBy });

    if (showCriticalOnly) {
      result = result.filter((p) => p.quantity < 5);
    }

    return result;
  }, [data, searchQuery, sortBy, showCriticalOnly]);

  if (isLoading) return <Loader />;
  if (error) return <p>Помилка: {(error as Error).message}</p>;

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Назва</th>
              <th className={styles.th}>Кількість</th>
              <th className={styles.th}>Категорія</th>
              <th className={styles.th}>Опис</th>
              <th className={styles.th}>Дата</th>
              <th className={styles.th}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductItem key={p.id} product={p} onOpen={setSelected} />
              ))
            ) : (
              <tr>
                <td colSpan={6}>Нічого не знайдено 🔍</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductModal product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
