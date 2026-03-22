import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../lib/apiClient';
import { Product } from '@prisma/client';

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
