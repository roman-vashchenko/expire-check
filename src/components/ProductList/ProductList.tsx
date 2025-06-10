import type { FC } from "react";
import type Product from "../../tytes";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return <div></div>;
};

export default ProductList;
