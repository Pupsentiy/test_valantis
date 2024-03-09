import { Product } from "@/api/fetchProducts.ts";
import { Card } from "@/components/Card/Card.tsx";
import {cls, leaveUniqObj} from "@/utils/helpers";
import { memo } from "react";
import styles from "./CardList.module.scss";

interface ListProps {
  className?: string;
  list: Product[];
}

export const CardList = memo(({ className, list }: ListProps) => {
  return (
    <div className={cls([styles.CardList, className])}>
      {Boolean(list) &&
          leaveUniqObj(list).map((product) => <Card product={product} key={product.id} />)}
    </div>
  );
});
