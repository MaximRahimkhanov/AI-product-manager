import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../lib/apiClient';
import { ProductType } from '../types/product';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: {
      id: string;
      product: Omit<ProductType, 'id' | 'createdAt'>;
    }) => updateProduct(vars.id, vars.product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
