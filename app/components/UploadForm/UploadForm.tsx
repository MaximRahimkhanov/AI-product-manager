import { useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { useAnalyzeImage } from '@/app/hooks/useAnalyzeImage';
import { useSaveProduct } from '@/app/hooks/useSaveProduct';
import PreviewImage from '../PreviewImage/PreviewImage';
import AppToaster from '../AppToaster/AppToaster';

import style from './UploadForm.module.scss';
import { AnimatePresence } from 'framer-motion';
import ProductForm from '../ProductForm/ProductForm';
import toast from 'react-hot-toast';
import { ProductType } from '@/app/types/product';

export type ProductFormData = Omit<ProductType, 'id' | 'createdAt'>;

export default function UploadForm() {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<ProductFormData | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [duplicateProduct, setDuplicateProduct] = useState<ProductType | null>(
    null,
  );

  const analyzeMutation = useAnalyzeImage((data: ProductFormData) => {
    setAiResult(data);
    setOpenModal(true);
  });

  const saveMutation = useSaveProduct(
    () => {
      setAiResult(null);
      setOpenModal(false);
      setBase64Image(null);
    },
    (existing: ProductType) => {
      setDuplicateProduct(existing);
    },
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');

      const MAX_WIDTH = 800;
      const scaleSize = MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

      setBase64Image(compressedBase64);
    };

    reader.readAsDataURL(file);
  };

  const sendToAI = () => {
    if (!base64Image) return;
    const base64Data = base64Image.split(',')[1];
    analyzeMutation.mutate(base64Data);
  };

  const handlerModalClose = () => setOpenModal(false);

  return (
    <div className={style.container}>
      <input type="file" onChange={handleFileChange} />

      <Button
        type="button"
        variant="primary"
        onClick={sendToAI}
        disabled={analyzeMutation.isPending}
      >
        {analyzeMutation.isPending ? 'Відправка...' : 'Відправити'}
      </Button>

      <AnimatePresence>
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
                      quantity:
                        duplicateProduct.quantity + (aiResult?.quantity ?? 1),
                    }),
                  }).then(() => {
                    setDuplicateProduct(null);
                    setAiResult(null);
                    setOpenModal(false);
                    toast.success('Кількість оновлено');
                  });
                }}
              >
                Оновити кількість
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (!aiResult) return;
                  saveMutation.mutate({ ...aiResult, forceCreate: true });
                  setDuplicateProduct(null);
                }}
              >
                Створити новий
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openModal && aiResult && (
          <Modal title="AIAnswer" handleClose={handlerModalClose}>
            <ProductForm
              initialData={aiResult}
              isEdit={false}
              onSubmit={(data) =>
                saveMutation.mutate({
                  ...data,
                  category: data.category ?? null,
                  description: data.description ?? null,
                })
              }
            />
          </Modal>
        )}
      </AnimatePresence>

      {analyzeMutation.isPending && <p>AI аналізує фото...</p>}

      {base64Image && <PreviewImage base64Image={base64Image} />}

      <AppToaster />
    </div>
  );
}
