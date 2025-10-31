interface MainProduct {
  code: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  code: string;
  date: string;
}

type newProduct = Omit<Product, "id">;

export type { MainProduct, Product, newProduct };
