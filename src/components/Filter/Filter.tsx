import { useState, type ChangeEvent, type FC } from "react";
import css from "./Filter.module.css";
import Radio from "@mui/material/Radio";

interface FilterProps {
  filtersProducts: (filter: string) => void;
}

const Filter: FC<FilterProps> = ({ filtersProducts }) => {
  const [selectedValue, setSelectedValue] = useState("all");
  return (
    <div className={css.filter}>
      <div className={css.field}>
        <Radio
          checked={selectedValue === "all"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSelectedValue(e.target.value);
            filtersProducts(e.target.value);
          }}
          value="all"
          name="radio-buttons"
          id="all"
        />
        <label htmlFor="all">Всі</label>
      </div>
      <div className={css.field}>
        <Radio
          checked={selectedValue === "soon"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSelectedValue(e.target.value);
            filtersProducts(e.target.value);
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
          checked={selectedValue === "expired"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSelectedValue(e.target.value);
            filtersProducts(e.target.value);
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
