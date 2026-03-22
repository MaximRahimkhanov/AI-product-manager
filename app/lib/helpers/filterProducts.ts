import { ProductType } from '@/app/types/product';

export type SortBy = 'quantity' | 'date' | 'name' | null;

interface FilterOptions {
  searchQuery: string;
  sortBy?: SortBy;
  category?: string | null;
  showCriticalOnly?: boolean; // наприклад, товари з кількістю < 5
}

export function filterProducts(
  products: ProductType[],
  options: FilterOptions,
): ProductType[] {
  let result = [...products];

  // Пошук
  if (options.searchQuery && options.searchQuery.trim() !== '') {
    const query = options.searchQuery.toLowerCase();

    result = result.filter((p) => {
      const name = p.name?.toLowerCase() ?? '';
      const category = p.category?.toLowerCase() ?? '';
      const description = p.description?.toLowerCase() ?? '';
      const quantity = String(p.quantity); // число → рядок
      const date = new Date(p.createdAt)
        .toLocaleString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        .toLowerCase();

      return (
        name.includes(query) ||
        category.includes(query) ||
        description.includes(query) ||
        quantity.includes(query) ||
        date.includes(query)
      );
    });
  }

  // Фільтр по категорії
  if (options.category) {
    result = result.filter((p) => p.category === options.category);
  }

  // Критичні товари
  if (options.showCriticalOnly) {
    result = result.filter((p) => p.quantity < 5);
  }

  // Сортування
  switch (options.sortBy) {
    case 'quantity':
      result.sort((a, b) => a.quantity - b.quantity);
      break;
    case 'date':
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case null:
    default:
      // нічого не робимо
      break;
  }

  return result;
}
