import React, { useState, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import {
  productRemoved,
  productChanged,
  selectProductById,
} from "state/product";
import { IdProp } from "utils/basePropTypes";
import styles from "./Products.module.scss";

const ProductItem: React.FC<IdProp> = ({ id }) => {
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(id));
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);

  const onDeleteProduct = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(productRemoved(product.id));
  };

  const onCancelProduct = (e: SyntheticEvent) => {
    e.preventDefault();
    setName(product.name);
    setDescription(product.description);
  };

  const onSubmitSave = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(productChanged({ ...product, name, description }));
  };

  return (
    <li className={cx(styles.card, styles["shadow-box"])}>
      <form className={styles.form} onSubmit={onSubmitSave}>
        <textarea
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
    </li>
  );
};

export default ProductItem;
