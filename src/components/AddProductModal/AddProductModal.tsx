import ReactModal from "react-modal";
import AddProductForm from "../AddProductForm/AddProductForm";
import css from "./AddProductModal.module.css";
import type { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../hooks";
import { resetMainProduct } from "../../redux/mainProduct/mainProductSlice";

interface AddModalProductProps {
  isOpen: boolean;
}

const AddProductModal: FC<AddModalProductProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        className={css.modal}
        overlayClassName={css.overlay}
        bodyOpenClassName={null}
        ariaHideApp={false}
      >
        <IoMdClose
          width={50}
          height={50}
          className={css.icon}
          onClick={() => {
            dispatch(resetMainProduct());
          }}
        />
        <AddProductForm />
      </ReactModal>
    </div>
  );
};

export default AddProductModal;
