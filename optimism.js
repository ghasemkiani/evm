import { Chain } from "./chain.js";

const optimism = Chain.add({
  id: 10,
  tok: "ETH",
  symbol: "op",
  name: "Optimism",
  defaultUrl: "https://rpc.ankr.com/optimism",
  scanUrl: null,
  contracts: {
    WETH: "0x4200000000000000000000000000000000000006",
  },
  contractProxies: {},
});

export { optimism };
