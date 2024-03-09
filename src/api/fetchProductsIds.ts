import { API, headers } from "@/utils/consts/API.ts";
import axios, { AxiosResponse } from "axios";

interface FetchProductIdsParams {
  offset: number;
  limit: number;
}

interface Result {
  result: string[];
}

export const fetchProductsIds = async (
  params: FetchProductIdsParams,
  retries = 3,
): Promise<string[]> => {
  const requestBody = {
    action: "get_ids",
    params: params,
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
      throw new Error();
    }
    return res.data.result;
  } catch (e) {
    console.log(e);
    if (retries > 0) {
      console.log(
        `fetchProductsIds Повторный запрос. Осталось попыток: ${retries}`,
      );
      return await fetchProductsIds(params, retries - 1);
    } else {
      throw new Error("Превышено количество попыток запроса");
    }
  }
};
