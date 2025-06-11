import { type FC } from "react";
import type Product from "../../tytes";
import css from "./ProductItem.module.css";
import { formattedDate, getStatusColor } from "../../helpers";
import { MdDelete } from "react-icons/md";

interface ProductItemProps {
  product: Product;
  deleteProduct: (productId: string) => Promise<void>;
}

const ProductItem: FC<ProductItemProps> = ({ product, deleteProduct }) => {
  return (
    <>
      <td className={css.item}>{product.code}</td>
      <td className={css.item}>{product.name}</td>
      <td
        className={css.item}
        style={{ backgroundColor: `${getStatusColor(product.date)}` }}
      >
        {formattedDate(product.date)}
      </td>
      <td className={css.itemBtn}>
        <button
          type="button"
          className={css.btn}
          onClick={() => {
            deleteProduct(product.id);
          }}
        >
          <MdDelete />
        </button>
      </td>
    </>
  );
};

export default ProductItem;
