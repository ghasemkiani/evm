import { Chain } from "./chain.js";

const unichain = Chain.add({
  id: 130,
  tok: "ETH",
  symbol: "uni",
  name: "Unichain",
  defaultUrl: "https://0xrpc.io/uni",
  scanUrl: "https://unichain.blockscout.com/api",
  contracts: {
    WETH: "0x4200000000000000000000000000000000000006",
    UNI: "0x3C17f14e185935E6097Ab42b2a03A986DA33683C",
    "UNI-V2": "0x4660e55A39f30dC1516023A5c344A76ab2E6Ea49",
    USDC: "0x078D782b760474a361dDA0AF3839290b0EF57AD6",
    UNICORN: "0x926DC7b96bb2F4A91C2A67e291Faf482691a3001",
    UNIDOGE: "0xa84A8Acc04CD47e18bF5Af826aB00D5026552EA5",
    PONY: "0x5cB32B19BCCC6792E75d62d0CC984D232B0F79dd",
    ZND: "0x2162E0695167Cb4F720c07F8005c0B1119575D78",
    IT: "0x5a64D139591AEe05534E55355a25D79496d1e7D0",
  },
  contractProxies: {
    "0x078D782b760474a361dDA0AF3839290b0EF57AD6":
      "0xBE959c573dC03a18a57e31C9ACE210cCf66F0F6e",
  },
});

export { unichain };
