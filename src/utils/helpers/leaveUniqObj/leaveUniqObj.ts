import { Product } from "@/api/fetchProducts.ts";

export const leaveUniqObj = (list: Product[]): Product[] => {
  return list.reduce((acc: Product[], p: Product) => {
    if (!acc.find((i: Product) => i.id == p.id)) {
      acc.push(p);
    }
    return acc;
  }, []);
};
