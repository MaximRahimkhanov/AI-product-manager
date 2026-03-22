import { SortBy } from '@/app/lib/helpers/filterProducts';
import Button from '../Button/Button';
import { ProductFilters } from '../ProductFilters/ProductFilters';

import styles from './DBListHeader.module.scss';

type DbListHeaderProps = {
  onFilterChange: (value: string) => void;
  onCreate: () => void;
  onSortChange: (value: 'quantity' | 'date' | 'name' | null) => void;
  onShowCritical: (value: boolean) => void;
};

const DbListHeader = ({
  onFilterChange,
  onCreate,
  onSortChange,
  onShowCritical,
}: DbListHeaderProps) => {
  return (
    <div className={styles.wrapper}>
      <ProductFilters onChange={onFilterChange} />

      <select
        onChange={(e) => {
          const value = e.target.value;

          onSortChange(value === '' ? null : (value as SortBy));

          if (value === 'critical') {
            onShowCritical(true);
          } else {
            onShowCritical(false);
          }
        }}
        className={styles.select}
      >
        <option value="">Без сортування</option>
        <option value="name">За назвою</option>
        <option value="quantity">За кількістю</option>
        <option value="date">За датою</option>
        <option value="critical">Критичні товари</option>
      </select>

      <Button type="button" variant="details" onClick={onCreate}>
        <svg className={styles.plusSvgIcon} width="21" height="21">
          <use href="/sprite.svg#icon-plus"></use>
        </svg>
      </Button>
    </div>
  );
};

export default DbListHeader;
