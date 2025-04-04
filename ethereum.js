import { Chain } from "./chain.js";

const ethereum = Chain.add({
  id: 1,
  tok: "ETH",
  symbol: "eth",
  name: "Ethereum",
  defaultUrl: "https://rpc.ankr.com/eth",
  scanUrl: "https://api.etherscan.io/api",
  contracts: {
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    BBTC: "0x9BE89D2a4cd102D8Fecc6BF9dA793be995C22541",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    XAUT_OLD: "0x4922a015c4407F87432B179bb209e125432E4a2A",
    XAUT: "0x68749665FF8D2d112Fa859AA293F07A622782F38",
    PAXG: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
    BNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    AWC: "0xaD22f63404f7305e4713CcBd4F296f34770513f4",
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    FTT: "0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9",
    THOR: "0xa5f2211B9b8170F694421f2046281775E8468044",
    LDO: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
    FLIP: "0x826180541412D574cf1336d22c0C0a287822678A",
    CAW: "0xf3b9569F82B18aEf890De263B84189bd33EBe452",
    SAVM: "0x15e6E0D4ebeAC120F9a97e71FaA6a0235b85ED12",
    JPYC: "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB",
    LEO: "0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3",
    LPT: "0x58b6A8A3302369DAEc383334672404Ee733aB239",
    HT: "0x6f259637dcD74C767781E37Bc6133cd6A68aa161",
    BUSD: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    TRX: "0xf230b790E05390FC8295F4d3F60332c93BEd42e2",
    BAT: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
    BEAR: "0x016ee7373248a80BDe1fD6bAA001311d233b3CFa",
    BULL: "0x68eb95Dc9934E19B86687A10DF8e364423240E94",
    ETHBEAR: "0x2f5e2c9002C058c063d21A06B6cabb50950130c8",
    ETHBULL: "0x871baeD4088b863fd6407159f3672D70CD34837d",
    BNBBEAR: "0x6FeBdFC0A9d9502C45343fCE0dF08828dEF44795",
    BNBBULL: "0x9D1a62c2AD99019768b9126fdA004a9952853F6E",
    TRXBEAR: "0x86807Da5B92d31F67E128771CAcb85F3579646eA",
    TRXBULL: "0xc175E77b04F2341517334Ea3Ed0b198A01A97383",
    EOSBEAR: "0x3d3dd61b0F9A558759a21dA42166042B114E12D5",
    EOSBULL: "0xeaD7F3ae4e0Bb0D8785852Cc37CC9d0B5e75c06a",
    BCHBEAR: "0xa9fC65Da36064cE545e87690e06f5de10C52C690",
    BCHBULL: "0x4C133E081dFB5858e39ccA74E69bf603d409e57A",
    LTCBEAR: "0xB422e605fBd765B80D2C4b5d8196C2f94144438B",
    LTCBULL: "0xDB61354E9cf2217a29770E9811832B360a8DAad3",
    BVOL: "0x81824663353A9d29b01B2DE9dd9a2Bb271d298cD",
    IBVOL: "0x627e2Ee3dbDA546e168eaAFF25A2C5212E4A95a0",
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    UNI: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    UST: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
    YFI: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    AAVE: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    renBTC: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
    TUSD: "0x0000000000085d4780B73119b644AE5ecd22b376",
    MKR: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    CEL: "0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d",
    HEX: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
    SNX: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    GRT: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
    "1INCH": "0x111111111117dC0aa78b770fA6A738034120C302",
    REN: "0x408e41876cCCDC0F92210600ef50372656052a38",
    COIN: "0xE61fDAF474Fac07063f2234Fb9e60C1163Cfa850",
    KP3R: "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44",
    COMP: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
    KNC: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
    SUSHI: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    CREAM: "0x2ba592F78dB6436527729929AAf6c908497cB200",
    HEGIC: "0x584bC13c7D411c00c01A62e8019472dE68768430",
    SXP: "0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9",
    FLOW: "0xC6e64729931f60D2c8Bc70A27D66D9E0c28D1BF9",
    YFII: "0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83",
    LUA: "0xB1f66997A5760428D3a87D68b90BfE0aE64121cC",
    SHIB: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
    MATIC: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    RUNE: "0x3155BA85D5F96b2d030a4966AF206230e46849cb",
    TONCOIN: "0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1",
    PEPE: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
  },
  contractProxies: {
    "0x9BE89D2a4cd102D8Fecc6BF9dA793be995C22541":
      "0x9F344834752cb3a8C54c3DdCd41Da4042b10D0b9",
    "0x68749665FF8D2d112Fa859AA293F07A622782F38":
      "0xd131ef0Fc4Ae1Af2e1CA3641a8E542731E3B36B4",
    "0x45804880De22913dAFE09f4980848ECE6EcbAf78":
      "0x74271F2282eD7eE35c166122A60c9830354be42a",
  },
});

Chain.set(ethereum); // def

const sepolia = Chain.add({
  id: 11155111,
  tok: "ETH",
  symbol: "sepolia",
  name: "Sepolia",
  defaultUrl: "https://sepolia.drpc.org/",
  scanUrl: "https://sepolia.etherscan.io/api",
  contracts: {
    WETH: "",
    SAVM: "0x77726BFbE61B6ad7463466fD521A3A4B89B0EFd8",
  },
  contractProxies: {},
});

const holesky = Chain.add({
  id: 17000,
  tok: "ETH",
  symbol: "holesky",
  name: "Ethereum Holesky Testnet",
  defaultUrl: "https://holesky.drpc.org	",
  scanUrl: "https://api-holesky.etherscan.io/api",
});

export { ethereum, sepolia, holesky };
