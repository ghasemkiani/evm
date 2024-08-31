import { Chain } from "./chain.js";

const shibarium = Chain.add({
  id: 109,
  tok: "BONE",
  symbol: "shib",
  name: "Shibarium",
  defaultUrl: "https://www.shibrpc.com/",
  scanUrl: "https://shibariumscan.io/api",
  contracts: {
    WBONE: "0x839FdB6cc98342B428E074C1573ADF6D48CA3bFd",
    BTC: "",
    ETH: "0x8ed7d143Ef452316Ab1123d28Ab302dC3b80d3ce",
  },
  contractProxies: {},
});

export { shibarium };
