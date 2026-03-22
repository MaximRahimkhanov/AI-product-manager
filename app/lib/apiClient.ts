import axios from 'axios';
import { ProductFormData, ProductType } from '../types/product';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const analyzeImage = async (
  base64Data: string,
): Promise<ProductFormData> => {
  const res = await apiClient.post<ProductFormData>('/analyze', {
    image: base64Data,
    prompt: 'Опиши товар',
  });
  return res.data;
};

export const getProducts = async (): Promise<ProductType[]> => {
  const res = await apiClient.get<ProductType[]>('/products');
  return res.data;
};

export const getProductById = async (id: string): Promise<ProductType> => {
  const res = await apiClient.get<ProductType>(`/products/${id}`);
  return res.data;
};

export type ProductPayload = ProductFormData & {
  forceCreate?: boolean;
};

export async function createProduct(
  product: ProductPayload,
): Promise<ProductType> {
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
  product: ProductFormData,
): Promise<ProductType> => {
  const res = await apiClient.put<ProductType>(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(`/products/${id}`);
  return res.data;
};
