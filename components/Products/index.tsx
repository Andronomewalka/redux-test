import React from "react";
import styles from "./Products.module.scss";
import AddProduct from "./AddProduct";
import ProductsPagination from "./ProductsPagination";

const Products: React.FC = () => {
  return (
    <div className={styles.container}>
      <AddProduct />
      <ProductsPagination />
    </div>
  );
};

export default Products;
