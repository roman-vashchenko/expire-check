import { get, ref, set } from "firebase/database";
import AddProductPar from "./components/AddProductBar/AddProductPar";
import ProductList from "./components/ProductList/ProductList";
import { db } from "./firebase/firebase";
import { useEffect, useState } from "react";
import type Product from "./tytes";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const productsRef = ref(db, "products");
      const snapshot = await get(productsRef);
      const data = snapshot.val();
      const exists = data && Object.values(data);
      setProducts(exists);
      console.log(exists);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (data: { code: string; date: string }) => {
    try {
      const newProduct: Product = {
        id: uuidv4(),
        ...data,
      };
      const productsRef = ref(db, `products/${uuidv4()}`);
      await set(productsRef, newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AddProductPar addProduct={addProduct} />
      <ProductList products={products} />
    </div>
  );
}

export default App;
