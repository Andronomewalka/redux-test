import React, {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { useDebounce } from "hooks/useDebounce";
import { useAppDispatch } from "hooks/useAppDispatch";
import styles from "./Products.module.scss";
import {
  selectProducts,
  selectProductsPage,
  selectProductsError,
  fetchProductsBySearch,
} from "state/product";
import ProductItem from "./ProductItem";
import { infoAdded, InfoStatus } from "state/info";

const ProductsPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const error = useAppSelector(selectProductsError);

  const curPage = useAppSelector(selectProductsPage);
  const [curPageState, setPageState] = useState(curPage);
  const curPageStateDebounced = useDebounce(curPageState, 200);

  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search, 400);

  const isSearchUpdatedRef = useRef(true);

  useEffect(() => {
    if (curPageStateDebounced > 0) {
      dispatch(
        fetchProductsBySearch({
          search: searchDebounced,
          page: isSearchUpdatedRef.current ? 1 : curPageStateDebounced,
        })
      );
      if (isSearchUpdatedRef.current) setPageState(1);
    }
  }, [isSearchUpdatedRef, searchDebounced, curPageStateDebounced]);

  useEffect(() => {
    if (error) {
      dispatch(infoAdded({ text: error, status: InfoStatus.Bad }));
    }
  }, [error]);

  const OnNextClicked = (e: SyntheticEvent) => {
    e.preventDefault();
    isSearchUpdatedRef.current = false;
    setPageState(curPageState + 1);
  };

  const OnPrevClicked = (e: SyntheticEvent) => {
    e.preventDefault();
    if (curPageState - 1 > 0) {
      isSearchUpdatedRef.current = false;
      setPageState(curPageState - 1);
    }
  };

  const onPageInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    isSearchUpdatedRef.current = false;
    setPageState(+e.target.value);
  };

  const onSearchInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    isSearchUpdatedRef.current = true;
    setSearch(e.target.value);
  };

  return (
    <>
      <form onSubmit={(e) => void e.preventDefault()}>
        <input
          placeholder="Search"
          data-cy="search"
          className={styles.search}
          onChange={onSearchInputChanged}
          value={search}
        />
      </form>
      <ul data-cy="products" className={styles.cards}>
        {products.map((product) => (
          <ProductItem key={product.id} id={product.id} />
        ))}
      </ul>
      <form
        className={styles.pagination}
        onSubmit={(e) => void e.preventDefault()}
      >
        <button
          data-cy="prev-page-btn"
          className={styles.inverse}
          onClick={OnPrevClicked}
        >
          Prev
        </button>
        <input
          type="number"
          data-cy="page-input"
          className={styles["bottom-line-input"]}
          onChange={onPageInputChanged}
          onFocus={(e) => void e.target.select()}
          value={curPageState}
        />
        <button
          data-cy="next-page-btn"
          className={styles.inverse}
          onClick={OnNextClicked}
        >
          Next
        </button>
      </form>
    </>
  );
};

export default ProductsPagination;
