import ReactModal from "react-modal";
import AddProductForm from "../AddProductForm/AddProductForm";
import css from "./AddProductModal.module.css";
import type { FC } from "react";

interface AddModalProductProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: FC<AddModalProductProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={css.modal}
        overlayClassName={css.overlay}
        bodyOpenClassName={null}
        ariaHideApp={false}
      >
        <AddProductForm />
      </ReactModal>
    </div>
  );
};

export default AddProductModal;
