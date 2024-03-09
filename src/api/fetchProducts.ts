import { API, headers } from "@/utils/consts/API.ts";
import axios, { AxiosResponse } from "axios";

export interface Product {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}


export interface Result {
 result: Product[];
}

export const fetchProducts = async (
  params: string[] | undefined,
  retries = 3,
): Promise<Product[]> => {
  if (!params) {
    throw new Error("id продуктов не определены");
  }
  const requestBody = {
    action: "get_items",
    params: { ids: params, },
  };

  const config = {
    method: "post",
    url: API.baseUrl,
    headers: headers,
    data: requestBody,
  };

  try {
    const res: AxiosResponse<Result, Headers> = await axios(config);
    if (!res.data) {
      throw new Error("Ответ от сервера пустой");
    }
    return res.data.result
  } catch (e) {
    console.log(e);
    if (retries > 0) {
      console.log(
        `fetchProducts Повторный запрос. Осталось попыток: ${retries}`,
      );
      return await fetchProducts(params, retries - 1);
    } else {
      throw new Error("Превышено количество попыток запроса");
    }
  }
};
