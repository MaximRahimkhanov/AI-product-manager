import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../lib/apiClient';
import { Product } from '@prisma/client';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: {
      id: string;
      product: Omit<Product, 'id' | 'createdAt'>;
    }) => updateProduct(vars.id, vars.product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
