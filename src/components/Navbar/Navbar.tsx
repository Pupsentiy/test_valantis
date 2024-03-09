import { fetchBrand } from "@/api/fetchBrand.ts";
import { Filter } from "@/api/fetchProductsFilter.ts";
import { cls, containsCyrillic, isNum } from "@/utils/helpers";
import React, { memo, useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
  setInputValue: React.Dispatch<React.SetStateAction<Filter>>;
  inputValue: Filter;
}

export const Navbar = memo(
  ({ className, setInputValue, inputValue }: NavbarProps) => {
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
      if (updateValue !== "") {
        if (isNum(Number(updateValue))) {
          setInputValue((prevState) => ({
            ...prevState,
            type: "price",
            value: Number(updateValue),
          }));
        } else if (containsCyrillic(updateValue)) {
          setInputValue((prevState) => ({
            ...prevState,
            type: "product",
            value: updateValue,
          }));
        } else {
          setInputValue((prevState) => ({
            ...prevState,
            type: "brand",
            value: updateValue,
          }));
        }
      }
      if (updateValue.length < 1) {
        setInputValue((prevState) => ({
          ...prevState,
          type: "",
          value: updateValue,
        }));
      }
    };

    const resetFilter = () => {
      setInputValue({ type: "", value: "" });
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
          {brands.map((str) => {
            if (str) {
              return (
                <option key={str} value={str}>
                  {str}
                </option>
              );
            }
          })}
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
