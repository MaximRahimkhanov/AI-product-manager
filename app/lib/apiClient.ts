// import { Product } from '@prisma/client';
// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: '/api',
//   headers: { 'Content-Type': 'application/json' },
// });

// export const analyzeImage = async (
//   base64Data: string,
// ): Promise<Omit<Product, 'id' | 'createdAt'>> => {
//   const res = await apiClient.post<Omit<Product, 'id' | 'createdAt'>>(
//     '/analyze',
//     {
//       image: base64Data,
//       prompt: 'Опиши товар',
//     },
//   );
//   return res.data;
// };
import { Product } from '@prisma/client';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const analyzeImage = async (
  base64Data: string,
): Promise<Omit<Product, 'id' | 'createdAt'>> => {
  const res = await apiClient.post<Omit<Product, 'id' | 'createdAt'>>(
    '/analyze',
    {
      image: base64Data,
      prompt: 'Опиши товар',
    },
  );
  return res.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get<Product[]>('/products');
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await apiClient.get<Product>(`/products/${id}`);
  return res.data;
};

// export const createProduct = async (
//   product: Omit<Product, 'id' | 'createdAt'>,
// ): Promise<Product> => {
//   const res = await apiClient.post<Product>('/products', product);
//   return res.data;
// };

export type ProductPayload = Omit<Product, 'id' | 'createdAt'> & {
  forceCreate?: boolean;
};

export async function createProduct(product: ProductPayload): Promise<Product> {
  const res = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });

  if (res.status === 409 && !product.forceCreate) {
    const data = await res.json();
    throw { type: 'duplicate', existing: data.existing };
  }

  if (!res.ok) {
    throw { type: 'server', message: 'Помилка сервера' };
  }

  return res.json();
}

export const updateProduct = async (
  id: string,
  product: Omit<Product, 'id' | 'createdAt'>,
): Promise<Product> => {
  const res = await apiClient.put<Product>(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(`/products/${id}`);
  return res.data;
};
