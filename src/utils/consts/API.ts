import { generateAuthString } from "@/utils/helpers";

export type Headers = Record<string, string>;

export const API = {
  baseUrl: "https://api.valantis.store:41000/",
};

export const headers: Headers = {
  "Content-Type": "application/json",
  "X-Auth": generateAuthString(),
};

export const LIMIT = 50;
