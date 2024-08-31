import { Chain } from "./chain.js";

const avalanche = Chain.add({
  id: 43114,
  tok: "AVAX",
  symbol: "avax",
  name: "Avalanche",
  defaultUrl: "https://rpc.ankr.com/avalanche",
  scanUrl: "https://api.snowtrace.io/api",
  contracts: {
    WAVAX: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    JPYC: "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB",
    USDT: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    USDC: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    WH_SOL: "0xFE6B19286885a4F7F55AdAD09C3Cd1f906D2478F",
  },
  contractProxies: {
    "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7":
      "0xBA2a995Bd4ab9e605454cCEf88169352cd5F75A6",
    "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E":
      "0xa3fa3D254bf6aF295b5B22cC6730b04144314890",
  },
});

const avalancheTestnet = Chain.add({
  id: 43113,
  tok: "AVAX",
  symbol: "avax-testnet",
  name: "Avalanche Testnet",
  defaultUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  scanUrl: "https://testnet.snowtrace.io/api",
});

export { avalanche, avalancheTestnet };
