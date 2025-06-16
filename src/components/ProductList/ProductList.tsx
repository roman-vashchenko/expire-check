import type { FC } from "react";
import type Product from "../../tytes";
import ProductItem from "../ProductItem/ProductItem";
import css from "./ProductList.module.css";

interface ProductListProps {
  filteredProducts: Product[];
  deleteProduct: (productId: string) => Promise<void>;
}

const ProductList: FC<ProductListProps> = ({
  filteredProducts,
  deleteProduct,
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
        <tbody>
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <tr key={product.id} className={css.item}>
                <ProductItem product={product} deleteProduct={deleteProduct} />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
