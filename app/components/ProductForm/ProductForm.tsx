import { useState } from 'react';
import Button from '../Button/Button';
import styles from './ProductForm.module.scss';
import { ProductFormData } from '@/app/types/product';
import PreviewImage from '../PreviewImage/PreviewImage';

type ProductFormProps = {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onDelete?: () => void;
  isEdit?: boolean;
  showTitle?: boolean;
};

const ProductForm = ({
  initialData,
  onSubmit,
  onDelete,
  isEdit,
  showTitle = false,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Partial<ProductFormData>>(
    initialData ?? {
      name: '',
      quantity: 0,
      category: null,
      description: null,
      image: null,
    },
  );

  const [errors, setErrors] = useState<{
    name?: string;
    quantity?: string;
  }>({});
  const [previewUrl, setPreviewUrl] = useState<string>('/placeholder.png');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newValue = name === 'quantity' ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });

    const newErrors: typeof errors = {};
    if (name === 'name' && (!newValue || String(newValue).trim() === '')) {
      newErrors.name = 'Назва обовʼязкова';
    }
    if (name === 'quantity' && Number(newValue) <= 0) {
      newErrors.quantity = 'Кількість має бути більше 0';
    }
    setErrors({ ...errors, ...newErrors });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const isValid = formData.name?.trim() !== '' && (formData.quantity ?? 0) > 0;

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Назва обовʼязкова';
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Кількість має бути > 0';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      name: formData.name ?? '',
      quantity: Number(formData.quantity ?? 0),
      category: formData.category ?? null,
      description: formData.description ?? null,
      image: formData.image ?? null,
    });
  };

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     setFormData({
  //       ...formData,
  //       image: event.target?.result as string,
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.formContainer}>
      {showTitle && (
        <h3>{isEdit ? 'Редагування товару' : 'AI пропонує товар'}</h3>
      )}

      <input type="file" accept="image/*" onChange={handleFileUpload} />

      {formData.image && <PreviewImage base64Image={formData.image} />}

      <label className={styles.formLabel}>
        Назва:
        <input
          className={styles.formInput}
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoFocus
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>

      <label className={styles.formLabel}>
        Кількість:
        <input
          className={styles.formInput}
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
      </label>

      <label className={styles.formLabel}>
        Категорія:
        <select
          name="category"
          value={formData.category ?? ''}
          onChange={handleSelectChange}
          className={styles.select}
        >
          <option value="">Без категорії</option>
          <option value="dairy">🥛 Dairy</option>
          <option value="meat">🥩 Meat</option>
          <option value="fruits">🍎 Fruits</option>
          <option value="vegetables">🥦 Vegetables</option>
        </select>
      </label>

      <label className={styles.formLabel}>
        Опис:
        <textarea
          className={styles.formTextarea}
          name="description"
          value={formData.description ?? ''}
          onChange={handleChange}
        />
      </label>

      <div className={styles.formActions}>
        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          {isEdit ? 'Зберегти' : 'Створити'}
        </Button>

        {isEdit && onDelete && (
          <Button type="button" variant="danger" onClick={onDelete}>
            Видалити
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductForm;
