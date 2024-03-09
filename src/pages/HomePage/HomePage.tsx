import { fetchProducts, Result } from "@/api/fetchProducts.ts";
import { fetchProductsFilter, Filter } from "@/api/fetchProductsFilter.ts";
import { fetchProductsIds } from "@/api/fetchProductsIds.ts";
import { CardList } from "@/components/CardList/CardList.tsx";
import { Navbar } from "@/components/Navbar/Navbar.tsx";
import { Pagination } from "@/components/Pagination/Pagination.tsx";
import { LIMIT } from "@/utils/consts/API.ts";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [products, setProducts] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [inputValue, setInputValue] = useState<Filter>({
    type: "",
    value: "",
  });
  const debounceValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (debounceValue.value === "") {
        const productsIds = await fetchProductsIds({
          offset: offset,
          limit: LIMIT,
        });
        const productsData = await fetchProducts(productsIds);
        if (productsData) {
          setProducts(productsData);
        }
        setLoading(false);
      } else {
        const filterDataIds = await fetchProductsFilter(debounceValue);
        if (filterDataIds) {
          const productsData = await fetchProducts(filterDataIds);
          if (productsData) {
            setProducts(productsData);
          }
        }
        setLoading(false);
      }
    })();
  }, [offset, debounceValue.value]);
  console.log(products?.totalItems);

  let content;
  if (products?.product) {
    content = (
      <>
        <CardList list={products?.product} />;
        {products?.totalItems >= 50 && (
          <Pagination
            setOffset={setOffset}
            offset={offset}
            totalItems={products.totalItems}
          />
        )}
      </>
    );
  }

  if (loading) {
    content = <h1 className={styles.message}>Loading...</h1>;
  }
  if (!products?.totalItems && !loading) {
    content = (
      <h2 className={styles.message}>
        Товаров по вашему запросу нет! перезагрузите страницу
      </h2>
    );
  }

  return (
    <div className={styles.HomePage}>
      <Navbar setInputValue={setInputValue} inputValue={inputValue} />
      {content}
    </div>
  );
};

export default HomePage;
