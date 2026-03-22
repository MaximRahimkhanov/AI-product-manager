import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, ProductPayload } from '../lib/apiClient';
import toast from 'react-hot-toast';
import { ProductType } from '../types/product';

type MutationContext = { previousProducts?: ProductType[] };
type DuplicateError = { type: 'duplicate'; existing: ProductType };
type ServerError = { type: 'server'; message: string };
type MutationError = DuplicateError | ServerError;

export const useSaveProduct = (
  onSuccessCallback?: () => void,
  onDuplicateCallback?: (existing: ProductType) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    ProductType,
    MutationError,
    ProductPayload,
    MutationContext
  >({
    mutationFn: createProduct,

    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousProducts = queryClient.getQueryData<ProductType[]>([
        'products',
      ]);

      queryClient.setQueryData<ProductType[]>(['products'], (old = []) => [
        ...old,
        { ...newProduct, id: 'temp-id', createdAt: new Date() } as ProductType,
      ]);

      return { previousProducts };
    },

    onError: (error, _newProduct, context) => {
      if (error.type === 'duplicate') {
        onDuplicateCallback?.(error.existing);
        return;
      }
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      toast.error(error.message ?? 'Помилка сервера');
    },

    onSuccess: () => {
      onSuccessCallback?.();
      toast.success('Товар збережено');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
