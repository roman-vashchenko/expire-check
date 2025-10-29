import { get, ref, remove, set } from "firebase/database";
import AddProductBar from "./components/AddProductBar/AddProductBar";
import ProductList from "./components/ProductList/ProductList";
import { db } from "./firebase/firebase";
import { useEffect, useState } from "react";
import type Product from "./tytes";
import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter/Filter";
import { getDiff } from "./helpers";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/Modal/Modal";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const filteredProduct = products.filter((product) => {
      const number = getDiff(product.date);

      if (selectedFilter === "expired") return number <= 0;
      if (selectedFilter === "soon") return number > 0 && number <= 30;
      if (selectedFilter === "all") return true;

      return false;
    });

    setFilteredProducts(filteredProduct);
  }, [products, selectedFilter]);

  const getProducts = async (): Promise<void> => {
    setLoader(true);
    try {
      const productsRef = ref(db, "products");
      const snapshot = await get(productsRef);
      const data = snapshot.val();
      const exists: Product[] = data ? Object.values(data) : [];
      setProducts(exists);
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
      toast.success("Артикул додано", {
        iconTheme: {
          primary: "rgb(118, 181, 204)",
          secondary: "#FFFAEE",
        },
      });
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
      handleCloseModal();
      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product.id !== productId);
      });
      setLoader(false);
      toast.success("Артикул видалено", {
        iconTheme: {
          primary: "rgb(118, 181, 204)",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>
        Контроль прострочення товарів!
      </h1>
      <AddProductBar addProduct={addProduct} loader={loader} />
      <Filter
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      <ProductList
        openModal={handleOpenModal}
        filteredProducts={filteredProducts}
        setProduct={setProduct}
      />
      {isOpen && (
        <Modal
          isOpen
          onClose={handleCloseModal}
          deleteProduct={deleteProduct}
          product={product}
        />
      )}
    </div>
  );
}

export default App;
