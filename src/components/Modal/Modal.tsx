import ReactModal from "react-modal";
import css from "./Modal.module.css";
import type { FC } from "react";
import type Product from "../../types";

ReactModal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteProduct: (productId: string) => Promise<void>;
  product: Product | null;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, deleteProduct, product }) => {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={css.modal}
        overlayClassName={css.overlay}
        bodyOpenClassName={null}
      >
        <p className={css.text}>{product?.name}</p>
        <div className={css.wrapper}>
          <button
            className={css.btn}
            type="button"
            onClick={() => {
              if (product) deleteProduct(product.id);
            }}
          >
            Видалити
          </button>
          <button type="button" onClick={onClose} className={css.btn}>
            Відмінити
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
