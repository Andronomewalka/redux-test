import React, { SyntheticEvent, useEffect, useState } from "react";
import cx from "classnames";
import { createProduct, Product } from "state/product";
import styles from "./Products.module.scss";
import Modal from "components/Modal";
import { useAppDispatch } from "hooks/useAppDispatch";

interface AddProductModalProp {
  onSubmit(product: Product): void;
}

const AddProductModal: React.FC<AddProductModalProp> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitInternal = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ id: -1, name, description });
  };

  return (
    <form className={styles.addProductContainer} onSubmit={onSubmitInternal}>
      <textarea
        placeholder="Name"
        className={styles.title}
        value={name}
        onChange={(e) => void setName(e.target.value)}
        autoFocus={true}
      />
      <textarea
        placeholder="Description"
        className={styles.description}
        value={description}
        onChange={(e) => void setDescription(e.target.value)}
      />
      <input type="submit" className={styles.submit} value="Create" />
    </form>
  );
};

const AddProduct: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmitAdd = (product: Product) => {
    dispatch(createProduct(product));
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={cx(styles.addProductModal, styles.submit)}
        onClick={(e) => setIsOpen(true)}
      >
        Add product
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Product"
      >
        <AddProductModal onSubmit={onSubmitAdd} />
      </Modal>
    </>
  );
};

export default AddProduct;
