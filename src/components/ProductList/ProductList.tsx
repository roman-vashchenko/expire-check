import type { FC } from "react";
import type Product from "../../tytes";
import ProductItem from "../ProductItem/ProductItem";
import css from "./ProductList.module.css";

interface ProductListProps {
  products: Product[];
  deleteProduct: (productId: string) => Promise<void>;
}

const ProductList: FC<ProductListProps> = ({ products, deleteProduct }) => {
  return (
    <div>
      <table className={css.table}>
        <thead className={css.title}>
          <tr>
            <th>Артикул</th>
            <th>Назва товара</th>
            <th>Дата закінчення строку придатності</th>
            <th>Видалити актикул</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => (
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
