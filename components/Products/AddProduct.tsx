import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { productAdded } from "state/product";
import styles from "./Products.module.scss";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onSubmitAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(productAdded({ id: -1, name, description }));
  };

  return (
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
      <input type="submit" className={styles.submit} value="Add product" />
    </form>
  );
};

export default AddProduct;
