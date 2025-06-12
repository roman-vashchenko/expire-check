import type { ChangeEvent, FC } from "react";
import css from "./Filter.module.css";

interface FilterProps {
  setFilter: (filter: string) => void;
  filtersProducts: (filter: string) => void;
  filter: string;
  getProducts: () => Promise<void>;
}

const Filter: FC<FilterProps> = ({
  filtersProducts,
  setFilter,
  filter,
  getProducts,
}) => {
  return (
    <div className={css.filter}>
      <div className={css.field}>
        <label htmlFor="soon">Незабаром закінчиться строк</label>
        <input
          type="radio"
          name="filter"
          id="soon"
          value="soon"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <div className={css.field}>
        <label htmlFor="expired">Прострочений товар</label>
        <input
          type="radio"
          name="filter"
          id="expired"
          value="expired"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <button type="button" onClick={() => filtersProducts(filter)}>
        Фільтрувати
      </button>
      <button type="button" onClick={() => getProducts()}>
        Зкинути фільтр
      </button>
    </div>
  );
};

export default Filter;
