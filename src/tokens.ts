const tokens = [
  {
    id: "apt",
    decimals: 8,
    address: "0x1::aptos_coin::AptosCoin",
    geskoId: "aptos",
  },
  {
    id: "lz_usdc",
    decimals: 6,
    address:
      "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC",
    geskoId: "usd-coin",
  },
  {
    id: "lz_usdt",
    decimals: 6,
    address:
      "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT",
    geskoId: "tether",
  },
  {
    id: "lz_weth",
    decimals: 6,
    address:
      "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::WETH",
    geskoId: "weth",
  },
  {
    id: "ditto_apt",
    decimals: 8,
    address:
      "0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::staked_coin::StakedAptos",
    geskoId: "ditto-staked-aptos",
  },
  {
    id: "tapt",
    decimals: 8,
    address:
      "0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin",
    geskoId: "tortuga-staked-aptos",
  },
] as const;

export type TokenId = (typeof tokens)[number]["id"];

export default tokens;
