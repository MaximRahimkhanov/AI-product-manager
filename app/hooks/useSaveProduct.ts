// import { useMutation } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { Product } from '@prisma/client';
// import { createProduct } from '../lib/apiClient';

// export const useSaveProduct = (onSuccess?: (data: Product) => void) => {
//   return useMutation<Product, Error, Omit<Product, 'id' | 'createdAt'>>({
//     mutationFn: createProduct,
//     onSuccess: (data) => {
//       toast.success('Товар збережено');
//       if (onSuccess) onSuccess(data);
//     },
//     onError: () => toast.error('Помилка сервера'),
//   });
// };
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, ProductPayload } from '../lib/apiClient';
import { Product } from '@prisma/client';
import toast from 'react-hot-toast';

// export const useSaveProduct = (onSuccessCallback?: () => void) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createProduct,

//     onMutate: async (newProduct) => {
//       await queryClient.cancelQueries({ queryKey: ['products'] });

//       const previousProducts = queryClient.getQueryData<Product[]>([
//         'products',
//       ]);

//       // 🔥 миттєво додаємо в UI
//       queryClient.setQueryData<Product[]>(['products'], (old = []) => [
//         ...old,
//         {
//           ...newProduct,
//           id: 'temp-id',
//           createdAt: new Date(),
//         } as Product,
//       ]);

//       return { previousProducts };
//     },

//     onError: (_err, _newProduct, context) => {
//       if (context?.previousProducts) {
//         queryClient.setQueryData(['products'], context.previousProducts);
//       }
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },

//     onSuccess: () => {
//       onSuccessCallback?.();
//       toast.success('Товар збережено');
//     },
//   });
// };

type MutationContext = { previousProducts?: Product[] };
type DuplicateError = { type: 'duplicate'; existing: Product };
type ServerError = { type: 'server'; message: string };
type MutationError = DuplicateError | ServerError;

export const useSaveProduct = (
  onSuccessCallback?: () => void,
  onDuplicateCallback?: (existing: Product) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation<Product, MutationError, ProductPayload, MutationContext>({
    mutationFn: createProduct,

    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousProducts = queryClient.getQueryData<Product[]>([
        'products',
      ]);

      queryClient.setQueryData<Product[]>(['products'], (old = []) => [
        ...old,
        { ...newProduct, id: 'temp-id', createdAt: new Date() } as Product,
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
