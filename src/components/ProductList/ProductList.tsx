import type { FC } from "react";
import type Product from "../../tytes";
import ProductItem from "../ProductItem/ProductItem";
import css from "./ProductList.module.css";
import { getStatusColor } from "../../helpers";

interface ProductListProps {
  filteredProducts: Product[];
  openModal: () => void;
  setProduct: (product: Product) => void;
}

const ProductList: FC<ProductListProps> = ({
  openModal,
  filteredProducts,
  setProduct,
}) => {
  return (
    <div>
      <table className={css.table}>
        <thead className={css.title}>
          <tr>
            <th>Артикул</th>
            <th>Товар</th>
            <th>Дата закінчення строку придатності</th>
            <th>Видалити актикул</th>
          </tr>
        </thead>
        <tbody className={css.tbody}>
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className={css.item}
                style={{ backgroundColor: `${getStatusColor(product.date)}` }}
              >
                <ProductItem
                  product={product}
                  openModal={openModal}
                  setProduct={setProduct}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
