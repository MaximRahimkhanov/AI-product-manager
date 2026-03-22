import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../lib/apiClient';
import { ProductType } from '../types/product';

export const useProducts = () => {
  return useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
