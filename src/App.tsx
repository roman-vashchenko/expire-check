import { get, ref, remove, set } from "firebase/database";
import AddProductPar from "./components/AddProductBar/AddProductPar";
import ProductList from "./components/ProductList/ProductList";
import { db } from "./firebase/firebase";
import { useEffect, useState } from "react";
import type Product from "./tytes";
import { v4 as uuidv4 } from "uuid";
// import Filter from "./components/Filter/Filter";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  // const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async (): Promise<void> => {
    setLoader(true);
    try {
      const productsRef = ref(db, "products");
      const snapshot = await get(productsRef);
      const data = snapshot.val();
      const exists: Product[] = data ? Object.values(data) : [];
      setProducts(exists);
      console.log(exists);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const addProduct = async (data: {
    code: string;
    name: string;
    date: string;
  }) => {
    setLoader(true);
    try {
      const newProduct: Product = {
        id: uuidv4(),
        ...data,
      };
      const productsRef = ref(db, `products/${newProduct.id}`);
      await set(productsRef, newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const deleteProduct = async (productId: string) => {
    setLoader(true);
    try {
      const product = ref(db, `products/${productId}`);

      await remove(product);
      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product.id !== productId);
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  // const filtersProducts = (filter: string) => {
  //   console.log(filter);
  //   const filteredProduct = products.filter((product) => {
  //     const now = new Date();
  //     const expiry = new Date(product.date);
  //     const diff = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  //     console.log(Math.floor(diff));

  //     if (filter === "expired") return Math.floor(diff) <= 0;
  //     if (filter === "soon")
  //       return Math.floor(diff) > 0 && Math.floor(diff) <= 30;
  //   });
  //   setProducts(filteredProduct);
  // };

  return (
    <div>
      <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>
        Контроль прострочення товара
      </h1>
      <AddProductPar addProduct={addProduct} loader={loader} />
      {/* <Filter
        filtersProducts={filtersProducts}
        setFilter={setFilter}
        filter={filter}
        getProducts={getProducts}
      /> */}
      <ProductList products={products} deleteProduct={deleteProduct} />
    </div>
  );
}

export default App;
