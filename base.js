import { Chain } from "./chain.js";

const base = Chain.add({
  id: 8453,
  tok: "ETH",
  symbol: "base",
  name: "Base",
  defaultUrl: "https://mainnet.base.org",
  scanUrl: "https://api.basescan.org/api",
  contracts: {
    WETH: "0x4200000000000000000000000000000000000006",
    "SHIB": "0xbfFb921F1a95727E5Db5c36bCb9080056f0C5761",
  },
  tokenDecimals: {},
  contractProxies: {},
});

export { base };
