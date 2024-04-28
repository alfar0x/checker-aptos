import { AptosClient } from "aptos";
import Big from "big.js";
import tokens, { TokenId } from "./tokens";
import { ANKR_API_KEY } from "./constants";
import { roundUsd } from "./helpers";
import { OtherField } from "./types";

const client = new AptosClient(
  `https://rpc.ankr.com/premium-http/aptos/${ANKR_API_KEY}/v1`
);

type Result = Partial<Record<TokenId | OtherField, string>>;

const checker = async (address: string, getPrice: (id: string) => number) => {
  const resources: any[] = await client.getAccountResources(address);

  let usdTotalBalance = Big(0);

  const result = tokens.reduce((acc, token) => {
    const { id, decimals, address, geskoId } = token;

    const resource = resources.find(
      (r) => r.type === `0x1::coin::CoinStore<${address}>`
    );

    if (!resource) return acc;

    const value = resource.data?.coin?.value || 0;

    const decimalDivider = Big(10).pow(decimals);

    const price = getPrice(geskoId);

    const usd = roundUsd(Big(value).div(decimalDivider).times(price));

    if (usd) usdTotalBalance = usdTotalBalance.plus(usd);

    return { ...acc, [id]: usd };
  }, {} as Result);

  result.balance_usd = roundUsd(usdTotalBalance);

  const accountResource = resources.find(
    (r) => r.type === "0x1::account::Account"
  );

  result.txs_count = accountResource?.data?.sequence_number || "";

  return result;
};

export default checker;
