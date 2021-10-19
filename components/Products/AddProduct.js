import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { productAdded } from "@/state/product";
import styles from "./Products.module.scss";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onSubmitAdd = (e) => {
    e.preventDefault();
    dispatch(productAdded({ name, description }));
  };

  return (
    <form className={styles.addProductContainer} onSubmit={onSubmitAdd}>
      <textarea
        type="text"
        placeholder="Name"
        className={styles.title}
        value={name}
        onChange={(e) => void setName(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Description"
        className={styles.description}
        value={description}
        onChange={(e) => void setDescription(e.target.value)}
      />
      <input type="submit" className={styles.submit} value="Add product" />
    </form>
  );
}
