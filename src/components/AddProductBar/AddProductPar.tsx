import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import css from "./AddProductBar.module.css";
import type { FC } from "react";

interface FormValues {
  code: string;
  name: string;
  date: string;
}

interface AddProductBarProps {
  addProduct: (data: { code: string; name: string; date: string }) => void;
}

const schema = yup
  .object({
    code: yup.string().min(8).max(8).required(),
    name: yup.string().required(),
    date: yup.string().required(),
  })
  .required();

const AddProductPar: FC<AddProductBarProps> = ({ addProduct }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    addProduct(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.field}>
          <input
            type="number"
            {...register("code")}
            placeholder="Введіть акрикул"
          />
          <p style={{ color: "rgb(216, 0, 39)" }}>{errors.code?.message}</p>
        </div>
        <div className={css.field}>
          <input
            type="text"
            {...register("name")}
            placeholder="Введіть назву"
          />
          <p style={{ color: "rgb(216, 0, 39)" }}>{errors.code?.message}</p>
        </div>
        <div className={css.field}>
          <input
            type="date"
            {...register("date")}
            placeholder="Дата закінчення строку товара"
          />
          <p style={{ color: "rgb(216, 0, 39)" }}>{errors.date?.message}</p>
        </div>
        <button type="submit" className={css.btn}>
          Додати
        </button>
      </form>
    </div>
  );
};

export default AddProductPar;
