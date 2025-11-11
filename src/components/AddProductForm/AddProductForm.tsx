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

interface FormValues {
  code: string;
  name: string;
  date: string;
}

// interface AddProductFormProps {
//   addProduct: (data: { code: string; name: string; date: string }) => void;
//   loader: boolean;
// }

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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
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
        <div className={css.field}>
          <input
            type="number"
            {...register("code")}
            placeholder="Введіть акрикул"
            readOnly
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
            readOnly
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
      {/* {loader && <b className={css.loader}>Завантаження...</b>} */}
    </div>
  );
};

export default AddProductForm;
