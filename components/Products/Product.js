import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productRemoved,
  productChanged,
  selectProductById,
} from "@/state/product";
import styles from "./Products.module.scss";

export default function Product({ id }) {
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(id));
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);

  const onDeleteProduct = (e) => {
    e.preventDefault();
    dispatch(productRemoved(product.id));
  };

  const onCancelProduct = (e) => {
    e.preventDefault();
    setName(product.name);
    setDescription(product.description);
  };

  const onSubmitSave = (e) => {
    e.preventDefault();
    dispatch(productChanged({ ...product, name, description }));
  };

  return (
    <form className={styles.card} onSubmit={onSubmitSave}>
      <textarea
        type="text"
        className={styles.title}
        value={name}
        onChange={(e) => void setName(e.target.value)}
      />
      <textarea
        className={styles.description}
        value={description}
        onChange={(e) => void setDescription(e.target.value)}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.delete} onClick={onDeleteProduct}>
          Delete
        </button>
        <button className={styles.cancel} onClick={onCancelProduct}>
          Cancel
        </button>
        <input type="submit" className={styles.submit} value="Save" />
      </div>
    </form>
  );
}
