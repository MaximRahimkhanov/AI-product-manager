import { Prisma } from '@/generated/prisma';

export type ProductType = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    quantity: true;
    image: true;
    category: true;
    description: true;
    createdAt: true;
  };
}>;

export interface ProductFormData {
  name: string;
  quantity: number;
  category?: string | null;
  description?: string | null;
  image?: string | null;
}

// export type ProductFormData = Omit<ProductType, 'id' | 'createdAt'> & {
//   image: string | null;
// };

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
