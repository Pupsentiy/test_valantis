import {fetchBrand} from "@/api/fetchBrand.ts";
import {Filter} from "@/api/fetchProductsFilter.ts";
import {cls, containsCyrillic, isNum} from "@/utils/helpers";
import React, {memo, useEffect, useState} from "react";
import styles from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
    setInputValue: React.Dispatch<React.SetStateAction<Filter>>;
    inputValue: Filter;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const Navbar = memo(
    ({className, setInputValue, inputValue, setOffset}: NavbarProps) => {
        const [select, setSelect] = useState<string>("");
        const [brands, setBrands] = useState<string[]>([]);

        useEffect(() => {
            (async () => {
                const allBrands = await fetchBrand();
                if (allBrands) {
                    setBrands(allBrands);
                }
            })();
        }, []);

        const onChangeTypeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
            const updateValue = e.target.value;
            setOffset(0)
            setSelect('')
            if (updateValue !== "") {
                setInputValue({
                    type: isNum(Number(updateValue)) ? "price" : containsCyrillic(updateValue) ? "product" : "brand",
                    value: isNum(Number(updateValue)) ? Number(updateValue) : updateValue
                });
            } else {
                setInputValue({type: "", value: ""});
            }
        };

        const resetFilter = () => {
            setInputValue({type: "", value: ""});
            setSelect("choose a brand");
        };

        const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelect(e.target.value);
            setInputValue((prevState) => ({
                ...prevState,
                type: "brand",
                value: e.target.value,
            }));
        };

        return (
            <div className={cls([styles.Navbar, className])}>
                <select
                    className={styles.select}
                    name={"brand"}
                    value={select}
                    onChange={onChangeSelect}
                >
                    <option value={""}>{"choose a brand"}</option>
                    {brands.map((str) => (
                        str && (
                            <option key={str} value={str}>
                                {str}
                            </option>
                        )
                    ))}
                </select>
                <input
                    className={styles.filter_input}
                    type={"text"}
                    name={"value"}
                    value={inputValue?.value}
                    onChange={onChangeTypeFilter}
                />
                <button className={styles.reset} onClick={resetFilter}>
                    Reset
                </button>
            </div>
        );
    },
);
