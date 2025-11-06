import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import css from "./SearchBar.module.css";
import { useAppDispatch } from "../../hooks";
import { getMainProduct } from "../../redux/mainProduct/operations";

interface FormValues {
  code: string;
}

// interface SearchBarProps {
//   getProduct: (code: string) => Promise<void>;
// }

const schema = yup
  .object({
    code: yup.string().min(8).max(8).required(),
  })
  .required();

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data.code);
    dispatch(getMainProduct(data.code));
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.field}>
          <input
            type="number"
            {...register("code")}
            placeholder="Введіть артикул"
          />
          <p className={css.error}>{errors.code && "помилка"}</p>
        </div>
        <button type="submit" className={css.btn}>
          Пошук
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
