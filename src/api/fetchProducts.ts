import { API, headers } from "@/utils/consts/API.ts";
import { leaveUniqObj } from "@/utils/helpers";
import axios, { AxiosResponse } from "axios";

export interface Product {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

interface AxiosResult {
  result: Product[];
}

export interface Result {
  product: Product[];
  totalItems: number;
}

export const fetchProducts = async (
  params: string[] | undefined,
  retries = 3,
): Promise<Result> => {
  if (!params) {
    throw new Error("id продуктов не определены");
  }
  const requestBody = {
    action: "get_items",
    params: { ids: params },
  };

  const config = {
    method: "post",
    url: API.baseUrl,
    headers: headers,
    data: requestBody,
  };

  try {
    const res: AxiosResponse<AxiosResult, Headers> = await axios(config);
    if (!res.data) {
      throw new Error("Ответ от сервера пустой");
    }
    return {
      totalItems: res.data.result.length,
      product: leaveUniqObj(res.data.result),
    };
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
