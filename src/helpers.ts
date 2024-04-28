import Big from "big.js";
import { MAX_STORE_DECIMALS_USD, MIN_STORE_BALANCE_USD } from "./constants";

export const createCsvString = <T extends string>(
  obj: Partial<Record<T, string>>,
  fields: T[]
) => fields.map((key) => obj[key as keyof typeof obj] || "").join(",");

export const roundUsd = (balance: Big) => {
  if (balance.lt(MIN_STORE_BALANCE_USD)) return "";

  const decimals = balance.gt(MAX_STORE_DECIMALS_USD) ? 0 : 2;

  return balance.toFixed(decimals);
};
