import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import css from "./AddProductForm.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addProduct } from "../../redux/products/operations";
import { selectMainProduct } from "../../redux/mainProduct/selectors";
import { useEffect } from "react";
import { resetMainProduct } from "../../redux/mainProduct/mainProductSlice";
import { selectIsLoader } from "../../redux/products/selectors";

interface FormValues {
  code: string;
  name: string;
  date: string;
}

const schema = yup
  .object({
    code: yup.string().min(8).max(8).required(),
    name: yup.string().required(),
    date: yup.string().required(),
  })
  .required();

const defaultDate: string = new Date().toISOString().split("T")[0];

const AddProductForm = () => {
  const dispatch = useAppDispatch();
  const mainProduct = useAppSelector(selectMainProduct);
  const loader = useAppSelector(selectIsLoader);
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: defaultDate,
    },
  });

  useEffect(() => {
    if (mainProduct) {
      setValue("code", mainProduct.code);
      setValue("name", mainProduct.name);
    }
  }, [mainProduct, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(addProduct(data));
    dispatch(resetMainProduct());
    reset();
  };
  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <p>{mainProduct && mainProduct.code}</p>
          <p>{mainProduct && mainProduct.name}</p>
        </div>
        <div>
          <input type="hidden" {...register("code")} readOnly />
        </div>
        <div>
          <input type="hidden" {...register("name")} readOnly />
        </div>
        <div className={css.field}>
          <input type="date" {...register("date")} />
        </div>
        <button type="submit" className={css.btn}>
          {loader ? "Завантаження" : "Додати"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
