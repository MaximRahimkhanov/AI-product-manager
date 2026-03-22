// // src/api/products.ts
// import axios from 'axios';
// import type { Product } from '@prisma/client';

// export const getProducts = async (): Promise<Product[]> => {
//   const res = await axios.get('/api/products');
//   return res.data;
// };

// export const createProduct = async (
//   product: Omit<Product, 'id' | 'createdAt'>,
// ): Promise<Product> => {
//   const res = await axios.post('/api/products', product);
//   return res.data;
// };
