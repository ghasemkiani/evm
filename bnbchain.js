import {Chain} from "./chain.js";

const bnbchain = Chain.add({
	id: 56,
	tok: "BNB",
	symbol: "bsc",
	name: "BNB Smart Chain",
	defaultUrl: "https://rpc.ankr.com/bsc",
	scanUrl: "https://api.bscscan.com/api",
	contracts: {},
	contractProxies: {},
});

const bnbchainTestnet = Chain.add({
	id: 97,
	tok: "BNB",
	symbol: "bsc-testnet",
	name: "BNB Smart Chain Testnet",
	defaultUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
	scanUrl: "https://testnet.bscscan.com/api",
});

export {bnbchain, bnbchainTestnet};
