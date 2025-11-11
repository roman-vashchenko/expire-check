import ProductItem from "../ProductItem/ProductItem";
import css from "./ProductList.module.css";
import { getStatusColor } from "../../helpers";
import { useAppSelector } from "../../hooks";
import { selectFilteredProducts } from "../../redux/products/selectors";
import type { Product } from "../../types";
import type { FC } from "react";

interface ProductListProps {
  openModal: (type: string) => void;
  setProduct: (product: Product) => void;
}

const ProductList: FC<ProductListProps> = ({ openModal, setProduct }) => {
  const filteredProducts = useAppSelector(selectFilteredProducts);

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
          {filteredProducts &&
            filteredProducts.length > 0 &&
            filteredProducts.map((product: Product) => (
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
      {Array.isArray(filteredProducts) && filteredProducts.length === 0 && (
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Данні не знайдено
        </p>
      )}
    </div>
  );
};

export default ProductList;
