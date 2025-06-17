import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import css from "./AddProductBar.module.css";
import { type FC } from "react";

interface FormValues {
  code: string;
  name: string;
  date: string;
}

interface AddProductBarProps {
  addProduct: (data: { code: string; name: string; date: string }) => void;
  loader: boolean;
}

const schema = yup
  .object({
    code: yup.string().min(8).max(8).required(),
    name: yup.string().required(),
    date: yup.string().required(),
  })
  .required();

const defaultDate: string = new Date().toISOString().split("T")[0];

const AddProductBar: FC<AddProductBarProps> = ({ addProduct, loader }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: defaultDate,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addProduct(data);
    reset();
  };
  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.field}>
          <input
            type="number"
            {...register("code")}
            placeholder="Введіть акрикул"
          />
          <p className={css.error}>
            {errors.code && "артикул повинен мати 8 символів"}
          </p>
        </div>
        <div className={css.field}>
          <input
            type="text"
            {...register("name")}
            placeholder="Введіть товар"
          />
          <p className={css.error}>{errors.name && "введіть товар"}</p>
        </div>
        <div className={css.field}>
          <input type="date" {...register("date")} />
        </div>
        <button type="submit" className={css.btn}>
          Додати
        </button>
      </form>
      {loader && <b className={css.loader}>Завантаження...</b>}
    </div>
  );
};

export default AddProductBar;
