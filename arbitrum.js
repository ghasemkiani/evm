import {Chain} from "./chain.js";

const arbitrum = Chain.add({
	id: 42161,
	tok: "ETH",
	symbol: "arbitrum",
	name: "Arbitrum",
	defaultUrl: "https://rpc.ankr.com/arbitrum",
	scanUrl: "https://api.arbiscan.io/api",
});

export {arbitrum};
