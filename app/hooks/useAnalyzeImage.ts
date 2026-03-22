import { useMutation } from '@tanstack/react-query';
// import { analyzeImage } from '@/app/api/analyze/analyze';
import toast from 'react-hot-toast';
import { analyzeImage } from '../lib/apiClient';
import { ProductType } from '../types/product';

export const useAnalyzeImage = (
  onSuccess?: (data: Omit<ProductType, 'id' | 'createdAt'>) => void,
) => {
  return useMutation<Omit<ProductType, 'id' | 'createdAt'>, Error, string>({
    mutationFn: analyzeImage,
    onSuccess: (data) => {
      toast.success('AI проаналізував фото');
      if (onSuccess) onSuccess(data);
    },
    onError: () =>
      toast.error(
        'Безкоштовні запити закінчились, використовується ручне управління',
      ),
  });
};
