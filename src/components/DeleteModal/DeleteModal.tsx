import ReactModal from "react-modal";
import css from "./DeleteModal.module.css";
import type { FC } from "react";
import type { Product } from "../../types";
import { useAppDispatch } from "../../hooks";
import { deleteProduct } from "../../redux/products/operations";

ReactModal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const DeleteModal: FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useAppDispatch();
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
        <p className={css.text}>{product?.name}</p>
        <div className={css.wrapper}>
          <button
            className={css.btn}
            type="button"
            onClick={() => {
              if (product) dispatch(deleteProduct(product.id));
              onClose();
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

export default DeleteModal;
