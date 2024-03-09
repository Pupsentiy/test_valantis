import { Product } from "@/api/fetchProducts.ts";
import { cls, numberFormat } from "@/utils/helpers";
import { memo } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  className?: string;
  product?: Product;
}

export const Card = memo(({ className, product }: CardProps) => {
  return (
    <div className={cls([styles.Card, className])}>
      <span>id товара: {product?.id}</span>
      <h4 className={styles.card_name}>{product?.product}</h4>
      <div className={styles.wrapper}>
        <p className={styles.brand}>
          Бренд: {product?.brand ? product.brand : "неизвестен"}
        </p>
        <span className={styles.price}>
          Цена: {numberFormat(product?.price)} ₽
        </span>
      </div>
    </div>
  );
});
