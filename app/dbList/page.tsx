'use client';

import { useState } from 'react';
import DbListHeader from '../components/DBListHeader/DBListHeader';
import ProductList from '../components/ProductList/ProductList';
import { useSaveProduct } from '../hooks/useSaveProduct';
import Modal from '../components/Modal/Modal';
import ProductForm from '../components/ProductForm/ProductForm';
import { Product } from '@prisma/client';
import Button from '../components/Button/Button';
import { AnimatePresence } from 'framer-motion';

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [sortBy, setSortBy] = useState<'quantity' | 'date' | 'name' | null>(
    null,
  );
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [duplicateProduct, setDuplicateProduct] = useState<Product | null>(
    null,
  );

  const saveMutation = useSaveProduct(
    () => setOpenModal(false),
    (existing) => setDuplicateProduct(existing),
  );

  return (
    <div>
      <DbListHeader
        onFilterChange={setSearchQuery}
        onCreate={() => setOpenModal(true)}
        onSortChange={setSortBy}
        onShowCritical={setShowCriticalOnly}
      />
      <ProductList
        searchQuery={searchQuery}
        sortBy={sortBy}
        showCriticalOnly={showCriticalOnly}
      />
      <AnimatePresence>
        {openModal && (
          <Modal
            title="Створення товару"
            handleClose={() => setOpenModal(false)}
          >
            <ProductForm
              isEdit={false}
              onSubmit={(data) =>
                saveMutation.mutate(
                  {
                    ...data,
                    category: data.category ?? null,
                    description: data.description ?? null,
                  },
                  {
                    onSuccess: () => setOpenModal(false),
                    onError: async (error: unknown) => {
                      if (error instanceof Response && error.status === 409) {
                        const data = await error.json();
                        console.log(error);

                        setDuplicateProduct(data.product);
                      }
                    },
                  },
                )
              }
            />
          </Modal>
        )}

        {duplicateProduct && (
          <Modal
            title="Дублікат товару"
            handleClose={() => setDuplicateProduct(null)}
          >
            <p>
              Такий товар вже існує: <b>{duplicateProduct.name}</b>
            </p>
            <p>Кількість: {duplicateProduct.quantity}</p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  fetch(`/api/products/${duplicateProduct.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                      ...duplicateProduct,
                      quantity: duplicateProduct.quantity + 1,
                    }),
                  }).then(() => {
                    setDuplicateProduct(null);
                    setOpenModal(false);
                  });
                }}
              >
                Оновити кількість
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  saveMutation.mutate({
                    ...duplicateProduct,
                    forceCreate: true,
                  });
                  setDuplicateProduct(null);
                }}
              >
                Створити новий
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
