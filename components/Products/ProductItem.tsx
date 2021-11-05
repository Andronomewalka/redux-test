import React, { useState, SyntheticEvent, useEffect } from "react";
import cx from "classnames";
import {
  productRemoved,
  selectProductById,
  updateProduct,
  selectProductStatusById,
  deleteProduct,
} from "state/product";
import { IdProp } from "utils/basePropTypes";
import styles from "./Products.module.scss";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { RequestStatus } from "utils/requestStatus";
import Loader from "react-loader-spinner";
import { infoAdded, InfoStatus } from "state/info";

const ProductItem: React.FC<IdProp> = ({ id }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProductById(id));
  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const isRequesting = product?.status?.state === RequestStatus.Requesting;

  const onDeleteProduct = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteProduct(product));
  };

  const onCancelProduct = (e: SyntheticEvent) => {
    e.preventDefault();
    setName(product.name);
    setDescription(product.description);
  };

  const onSubmitSave = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateProduct({ ...product, name, description }));
  };

  return (
    <li className={cx(styles.card, styles["shadow-box"])}>
      <form
        className={cx(styles.form, {
          [styles["is-requesting"]]: isRequesting,
        })}
        onSubmit={onSubmitSave}
      >
        <textarea
          className={styles.title}
          disabled={isRequesting}
          value={name}
          onChange={(e) => void setName(e.target.value)}
        />
        <textarea
          className={styles.description}
          disabled={isRequesting}
          value={description}
          onChange={(e) => void setDescription(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.delete}
            disabled={isRequesting}
            onClick={onDeleteProduct}
          >
            Delete
          </button>
          <button
            className={styles.cancel}
            disabled={isRequesting}
            onClick={onCancelProduct}
          >
            Cancel
          </button>
          <input
            type="submit"
            className={styles.submit}
            disabled={isRequesting}
            value="Save"
          />
        </div>
      </form>
      <div
        className={cx(styles.requesting, {
          [styles["is-requesting"]]: isRequesting,
        })}
      >
        <Loader type="Bars" color="#00BFFF" height={40} />
      </div>
    </li>
  );
};

export default ProductItem;
