import { type FC } from "react";
import type Product from "../../types";
import css from "./ProductItem.module.css";
import { formattedDate } from "../../helpers";
import { MdDelete } from "react-icons/md";

interface ProductItemProps {
  product: Product;
  openModal: () => void;
  setProduct: (product: Product) => void;
}

const ProductItem: FC<ProductItemProps> = ({
  product,
  openModal,
  setProduct,
}) => {
  return (
    <>
      <td className={css.item}>{product.code}</td>
      <td className={css.item}>{product.name}</td>
      <td className={css.item}>{formattedDate(product.date)}</td>
      <td className={css.itemBtn}>
        <button
          type="button"
          className={css.btn}
          onClick={() => {
            openModal();
            setProduct(product);
          }}
        >
          <MdDelete />
        </button>
      </td>
    </>
  );
};

export default ProductItem;
