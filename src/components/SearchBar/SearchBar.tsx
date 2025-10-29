import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import css from "./SearchBar.module.css";

interface FormValues {
  code: string;
}

const schema = yup
  .object({
    code: yup.string().min(8).max(8).required(),
  })
  .required();

const SearchBar = () => {
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
          <p className={css.error}>{errors.code && "введіть товар"}</p>
        </div>
        <button type="submit" className={css.btn}>
          Пошук
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
