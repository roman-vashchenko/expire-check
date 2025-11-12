// import { get, ref, remove, set } from "firebase/database";
// import AddProductBar from "./components/AddProductBar/AddProductBar";
import ProductList from "./components/ProductList/ProductList";
// import { db } from "./firebase/firebase";
import { useEffect, useState } from "react";
import type { Product } from "./types";
// // import type { MainProduct } from "./types";
// import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter/Filter";
// import { getDiff } from "./helpers";
import { Toaster } from "react-hot-toast";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import SearchBar from "./components/SearchBar/SearchBar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getProducts } from "./redux/products/operations";
import { selectIsLoader } from "./redux/products/selectors";
import AddProductModal from "./components/AddProductModal/AddProductModal";
import { selectMainProduct } from "./redux/mainProduct/selectors";

function App() {
  const dispatch = useAppDispatch();
  const mainProduct = useAppSelector(selectMainProduct);
  const loader = useAppSelector(selectIsLoader);
  const [product, setProduct] = useState<Product | null>(null);
  const [typeModal, setTypeModal] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleOpenModal = (type: string) => {
    setTypeModal(type);
  };

  const handleCloseModal = () => {
    setTypeModal(null);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>
        Контроль прострочення товарів
      </h1>
      <SearchBar />
      <Filter />
      {loader ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <CircularProgress color="primary" size={40} thickness={5} />
        </Box>
      ) : (
        <ProductList openModal={handleOpenModal} setProduct={setProduct} />
      )}
      {typeModal === "delete" && (
        <DeleteModal
          isOpen={typeModal === "delete"}
          onClose={handleCloseModal}
          product={product}
        />
      )}
      {mainProduct && <AddProductModal isOpen={Boolean(mainProduct)} />}
    </div>
  );
}

export default App;
