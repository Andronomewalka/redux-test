import React, { useEffect } from "react";
import {
  fetchProducts,
  selectProducts,
  selectFetchStatus,
  selectError,
} from "state/product";
import { useQuery } from "hooks/useQuery";
import { RequestStatus } from "utils/requestStatus";
import styles from "./Products.module.scss";
import ProductItem from "./ProductItem";
import { Product } from "state/product";
import AddProduct from "./AddProduct";
import { useAppDispatch } from "hooks/useAppDispatch";
import { infoAdded, InfoStatus } from "state/info";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const [products, status, error] = useQuery<Product[], string>(
    selectProducts,
    selectFetchStatus,
    selectError,
    fetchProducts
  );

  useEffect(() => {
    if (error) {
      dispatch(infoAdded({ text: error, status: InfoStatus.Bad }));
    }
  }, [error]);

  return (
    <>
      {status === RequestStatus.Requesting && "requesting..."}
      {status === RequestStatus.Failed && `error - ${error}`}
      {status === RequestStatus.Succeeded && (
        <div className={styles.container}>
          <AddProduct />
          <ul className={styles.cards}>
            {products.map((product) => (
              <ProductItem key={product.id} id={product.id} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Products;
