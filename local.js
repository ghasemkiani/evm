import { Chain } from "./chain.js";

const local = Chain.add({
  id: 1337,
  tok: "ETH",
  symbol: "local",
  name: "Local",
  defaultUrl: "http://127.0.0.1:8545",
  scanUrl: "",
  contracts: {
    WETH: "",
  },
  contractProxies: {},
});

export { local };
