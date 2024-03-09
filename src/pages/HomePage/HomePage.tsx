import {fetchProducts, Product} from "@/api/fetchProducts.ts";
import {fetchProductsFilter, Filter} from "@/api/fetchProductsFilter.ts";
import {fetchProductsIds} from "@/api/fetchProductsIds.ts";
import {CardList} from "@/components/CardList/CardList.tsx";
import {Navbar} from "@/components/Navbar/Navbar.tsx";
import {Pagination} from "@/components/Pagination/Pagination.tsx";
import {LIMIT} from "@/utils/consts/API.ts";
import {useDebounce} from "@/utils/hooks/useDebounce.ts";
import {useEffect, useState} from "react";
import styles from "./HomePage.module.scss";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [inputValue, setInputValue] = useState<Filter>({
        type: "",
        value: "",
    });
    const [productLength, setProductLength] = useState(0)
    const debounceValue = useDebounce(inputValue, 1000);

    useEffect(() => {
        setLoading(true);
        (async () => {
            if (debounceValue.value === "") {
                const productsIds = await fetchProductsIds({
                    offset: offset,
                    limit: LIMIT,
                });
                setProductLength(productsIds.length)
                const productsData = await fetchProducts(productsIds);
                if (productsData) {
                    setProducts(productsData);
                }
                setLoading(false);
            } else {
                const filterDataIds = await fetchProductsFilter(debounceValue);
                setProductLength(filterDataIds.length)
                if (filterDataIds) {
                    const endOffset = offset + LIMIT;
                    let sliceProductFilterData: Product[]
                    const productsData = await fetchProducts(filterDataIds);
                    if (filterDataIds.length > offset) {
                        sliceProductFilterData = productsData.slice(offset, endOffset);
                    } else {
                        // Если элементов недостаточно, чтобы сделать срез, пересчитываем offset
                        const newOffset = Math.max(0, productsData.length - LIMIT);
                        sliceProductFilterData = productsData.slice(newOffset, endOffset);
                        setOffset(Math.max(0, newOffset))
                    }
                    setProducts(sliceProductFilterData);

                }
                setLoading(false);
            }
        })();
    }, [offset, debounceValue.value]);

    let content;
    if (loading) {
        content = <h1 className={styles.message}>Loading...</h1>;
    } else if (!products.length) {
        content = (
            <h2 className={styles.message}>
                Товаров по вашему запросу нет! перезагрузите страницу
            </h2>
        );
    } else {
        content = (
            <>
                <CardList list={products} />
                <Pagination
                    setOffset={setOffset}
                    offset={offset}
                    totalItems={productLength}
                />
            </>
        );
    }

    return (
        <div className={styles.HomePage}>
            <Navbar setInputValue={setInputValue} inputValue={inputValue} setOffset={setOffset} />
            {content}
        </div>
    );
};

export default HomePage;
