import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { productAdded } from "state/product";
import styles from "./Products.module.scss";
import Modal from "components/Modal";

const AddProduct: React.FC = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(productAdded({ id: -1, name, description }));
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
        <form className={styles.addProductContainer} onSubmit={onSubmitAdd}>
          <textarea
            placeholder="Name"
            className={styles.title}
            value={name}
            onChange={(e) => void setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className={styles.description}
            value={description}
            onChange={(e) => void setDescription(e.target.value)}
          />
          <input type="submit" className={styles.submit} value="Create" />
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
