import { type ChangeEvent } from "react";
import css from "./Filter.module.css";
import Radio from "@mui/material/Radio";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeFilter } from "../../redux/filter/filterSlice";
import { selectFilter } from "../../redux/filter/selectors";

// interface FilterProps {
//   setSelectedFilter: (filter: string) => void;
//   selectedFilter: string;
// }

const Filter = () => {
  const dispatch = useAppDispatch();
  const filterValue = useAppSelector(selectFilter);
  return (
    <div className={css.filter}>
      <div className={css.field}>
        <Radio
          checked={filterValue === "all"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "all")
              dispatch(changeFilter(e.target.value));
          }}
          value="all"
          name="radio-buttons"
          id="all"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 18,
            },
            padding: "1px",
            marginRight: "7px",
          }}
        />
        <label htmlFor="all">Всі</label>
      </div>
      <div className={css.field}>
        <Radio
          checked={filterValue === "soon"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "soon")
              dispatch(changeFilter(e.target.value));
          }}
          value="soon"
          name="radio-buttons"
          id="soon"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 18,
            },
            padding: "1px",
            marginRight: "7px",
          }}
        />
        <label htmlFor="soon">
          Незабаром закінчиться строк (30 днів і менше)
        </label>
      </div>
      <div className={css.field}>
        <Radio
          checked={filterValue === "expired"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "expired")
              dispatch(changeFilter(e.target.value));
          }}
          value="expired"
          name="radio-buttons"
          id="expired"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 18,
            },
            padding: "1px",
            marginRight: "7px",
          }}
        />
        <label htmlFor="expired">Прострочений товар</label>
      </div>
    </div>
  );
};

export default Filter;
