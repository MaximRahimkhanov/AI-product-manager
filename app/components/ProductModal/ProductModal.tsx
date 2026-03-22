import Modal from '../Modal/Modal';
import ProductForm from '../ProductForm/ProductForm';
import { useUpdateProduct } from '@/app/hooks/useUpdateProduct';
import { useDeleteProduct } from '@/app/hooks/useDeleteProduct';
import { ProductType } from '@/app/types/product';

type ProductModalProps = {
  product: ProductType;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  return (
    <Modal title="Редагування продукту" handleClose={onClose}>
      <ProductForm
        initialData={product}
        isEdit={true}
        onSubmit={(data) =>
          updateMutation.mutate(
            {
              id: product.id,
              product: {
                ...data,
                category: data.category ?? null,
                description: data.description ?? null,
              },
            },
            {
              onSuccess: () => {
                onClose();
              },
            },
          )
        }
        onDelete={() =>
          deleteMutation.mutate(product.id, {
            onSuccess: () => {
              onClose();
            },
          })
        }
      />
    </Modal>
  );
}
