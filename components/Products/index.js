import React from "react";
import {
  fetchProducts,
  selectProducts,
  selectFetchStatus,
  selectError,
} from "@/state/product";
import { useQuery } from "@/hooks/useQuery.js";
import requestStatus from "@/utils/requestStatus";
import styles from "./Products.module.scss";
import Product from "./Product.js";
import AddProduct from "./AddProduct";

export default function Products() {
  const [products, status, error] = useQuery(
    selectProducts,
    selectFetchStatus,
    selectError,
    fetchProducts
  );

  return (
    <>
      {status === requestStatus.requesting && "requesting..."}
      {status === requestStatus.error && `error - ${error}`}
      {status === requestStatus.succeeded && (
        <div className={styles.container}>
          <AddProduct />
          <ul className={styles.cards}>
            {products.map((product) => (
              <Product key={product.id} id={product.id} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
