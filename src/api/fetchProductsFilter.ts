import { API, headers } from "@/utils/consts/API.ts";
import axios, { AxiosResponse } from "axios";

export interface Filter {
  type: string;
  value: string | number;
}

interface Result {
  result: string[];
}

export const fetchProductsFilter = async (
  params: Filter,
  retries = 3,
): Promise<string[]> => {
  if (!params) {
    throw new Error("Не переданы параметры");
  }
  const requestBody = {
    action: "filter",
    params: { [params.type]: params.value },
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
    return res.data.result;
  } catch (e) {
    console.log(e);
    if (retries > 0) {
      console.log(
        `fetchProductsFilter Повторный запрос. Осталось попыток: ${retries}`,
      );
      return await fetchProductsFilter(params, retries - 1);
    } else {
      throw new Error("Превышено количество попыток запроса");
    }
  }
};
