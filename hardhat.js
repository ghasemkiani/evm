import { Chain } from "./chain.js";

const base = Chain.add({
  id: 31337,
  tok: "ETH",
  symbol: "hardhat",
  name: "Hardhat",
  defaultUrl: "http://localhost:8545",
  // scanUrl: "https://custom-block-explorer.vercel.app/",
  contracts: {},
  tokenDecimals: {},
  contractProxies: {},
});

export { base };
