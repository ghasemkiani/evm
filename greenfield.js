import { Chain } from "./chain.js";

const greenfield = Chain.add({
  id: 1017,
  tok: "BNB",
  symbol: "gnfd",
  name: "BNB Greenfield",
  defaultUrl: "https://greenfield-chain.bnbchain.org:443/",
  scanUrl: "https://greenfieldscan.com/api",
  contracts: {
    WBNB: "",
  },
  contractProxies: {},
});

const greenfieldTestnet = Chain.add({
  id: 5600,
  tok: "BNB",
  symbol: "gnfd-testnet",
  name: "BNB Greenfield Testnet",
  defaultUrl: "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org/",
  scanUrl: "https://testnet.greenfieldscan.com/api",
});

export { greenfield, greenfieldTestnet };
