import ProductItem from "../ProductItem/ProductItem";
import css from "./ProductList.module.css";
import { getStatusColor } from "../../helpers";
import { useAppSelector } from "../../hooks";
import { selectProducts } from "../../redux/products/selectors";
import type { Product } from "../../types";
import type { FC } from "react";

interface ProductListProps {
  openModal: () => void;
  setProduct: (product: Product) => void;
}

const ProductList: FC<ProductListProps> = ({ openModal, setProduct }) => {
  const products = useAppSelector(selectProducts);

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
          {products &&
            products.length > 0 &&
            products.map((product) => (
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
      {Array.isArray(products) && products.length === 0 && (
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Данні не знайдено
        </p>
      )}
    </div>
  );
};

export default ProductList;
