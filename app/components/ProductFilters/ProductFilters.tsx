import styles from './ProductFilters.module.scss';

interface Props {
  onChange: (value: string) => void;
}

export const ProductFilters = ({ onChange }: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Пошук продукту..."
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};
