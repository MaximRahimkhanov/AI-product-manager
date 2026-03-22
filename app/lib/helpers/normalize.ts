import { ProductType } from '@/app/types/product';

// lib/normalize.ts
export const normalizeProduct = (data: ProductType) => {
  return {
    name: data.name?.trim().toLowerCase(),
    category: data.category?.trim().toLowerCase() ?? null,
    quantity: Number(data.quantity) > 0 ? Number(data.quantity) : 1,
    description: data.description?.trim() ?? null,
  };
};
