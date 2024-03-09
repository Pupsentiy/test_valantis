import { API, headers } from "@/utils/consts/API.ts";
import axios, { AxiosResponse } from "axios";

interface Result {
  result: string[];
}

export const fetchBrand = async (retries = 3): Promise<string[]> => {
  if (retries === 0) {
    return [];
  }

  const requestBody = {
    action: "get_fields",
    params: { field: "brand" },
  };
  const config = {
    method: "post",
    url: API.baseUrl,
    headers: headers,
    data: requestBody,
  };
  try {
    const res: AxiosResponse<Result, Headers> = await axios(config);
    const filterBrand = [...new Set(res.data.result)];

    if (!res.data) {
      throw new Error("Ответ от сервера пустой");
    }
    return filterBrand;
  } catch (e) {
    console.log(e);
    if (retries > 0) {
      console.log(`fetchBrand Повторный запрос. Осталось попыток: ${retries}`);
      return await fetchBrand(retries - 1);
    } else {
      throw new Error("Превышено количество попыток запроса");
    }
  }
};
