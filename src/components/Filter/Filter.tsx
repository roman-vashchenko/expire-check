import { type ChangeEvent, type FC } from "react";
import css from "./Filter.module.css";
import Radio from "@mui/material/Radio";

interface FilterProps {
  setSelectedFilter: (filter: string) => void;
  selectedFilter: string;
}

const Filter: FC<FilterProps> = ({ setSelectedFilter, selectedFilter }) => {
  return (
    <div className={css.filter}>
      <div className={css.field}>
        <Radio
          checked={selectedFilter === "all"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSelectedFilter(e.target.value);
          }}
          value="all"
          name="radio-buttons"
          id="all"
        />
        <label htmlFor="all">Всі</label>
      </div>
      <div className={css.field}>
        <Radio
          checked={selectedFilter === "soon"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSelectedFilter(e.target.value);
          }}
          value="soon"
          name="radio-buttons"
          id="soon"
        />
        <label htmlFor="soon">
          Незабаром закінчиться строк (30 днів і менше)
        </label>
      </div>
      <div className={css.field}>
        <Radio
          checked={selectedFilter === "expired"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSelectedFilter(e.target.value);
          }}
          value="expired"
          name="radio-buttons"
          id="expired"
        />
        <label htmlFor="expired">Прострочений товар</label>
      </div>
    </div>
  );
};

export default Filter;
