import { Chain } from "./chain.js";

const robinhood = Chain.add({
  id: 4663,
  tok: "ETH",
  symbol: "rh",
  name: "Robinhood",
  defaultUrl: "https://rpc.mainnet.chain.robinhood.com",
  scanUrl: "https://robinhoodchain.blockscout.com/api",
  contracts: {
    WETH: "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73",
  },
  contractProxies: {
    "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73": "0xC6B81b429797E0f555440b70cD99e032D7AE947e",
  },
});

export { robinhood };
