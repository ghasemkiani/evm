import { Chain } from "./chain.js";

const zkevm = Chain.add({
  id: 0x44d,
  tok: "ETH",
  symbol: "zkevm",
  name: "zkEVM Polygon",
  defaultUrl: "https://zkevm-rpc.com/",
  scanUrl: "https://api-zkevm.polygonscan.com/api",
  contracts: {
    WETH: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
    BTC: "0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1",
    MATIC: "0xa2036f0538221a77A3937F1379699f44945018d0",
    CRV: "0x3d5320821BfCa19fb0B5428F2c79d63bd5246f89",
    LDO: "0x7e2feEa957b7D1606335e339754F4e52b452B792",
    USDT: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
    USDC: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
  },
  contractProxies: {
    //
  },
});

export { zkevm };
