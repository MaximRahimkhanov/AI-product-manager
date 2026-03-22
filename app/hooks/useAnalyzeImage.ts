import { useMutation } from '@tanstack/react-query';
// import { analyzeImage } from '@/app/api/analyze/analyze';
import toast from 'react-hot-toast';
import { Product } from '@prisma/client';
import { analyzeImage } from '../lib/apiClient';

export const useAnalyzeImage = (
  onSuccess?: (data: Omit<Product, 'id' | 'createdAt'>) => void,
) => {
  return useMutation<Omit<Product, 'id' | 'createdAt'>, Error, string>({
    mutationFn: analyzeImage,
    onSuccess: (data) => {
      toast.success('AI проаналізував фото');
      if (onSuccess) onSuccess(data);
    },
    onError: () => toast.error('Помилка сервера'),
  });
};
