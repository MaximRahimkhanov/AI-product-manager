import { Product } from '@prisma/client';

// lib/normalize.ts
export const normalizeProduct = (data: Product) => {
  return {
    name: data.name?.trim().toLowerCase(),
    category: data.category?.trim().toLowerCase() ?? null,
    quantity: Number(data.quantity) > 0 ? Number(data.quantity) : 1,
    description: data.description?.trim() ?? null,
  };
};
