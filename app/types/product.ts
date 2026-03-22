import { Prisma } from '@prisma/client';

export type ProductType = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    quantity: true;
    category: true;
    description: true;
    createdAt: true;
  };
}>;

export type ProductFormData = Omit<ProductType, 'id' | 'createdAt'>;

export type ProductFormErrors = {
  name?: string;
  quantity?: string;
};

// export type ProductFormProps = {
//   initialData?: Partial<ProductFormData>;
//   onSubmit: (data: ProductFormData) => void;
//   onDelete?: () => void;
//   isEdit?: boolean;
//   showTitle?: boolean;
// };
