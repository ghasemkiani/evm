import {Chain} from "./chain.js";

const avalanche = Chain.add({
	id: 43114,
	tok: "AVAX",
	symbol: "avax",
	name: "Avalanche",
	defaultUrl: "https://rpc.ankr.com/avalanche",
	scanUrl: "https://api.snowtrace.io/api",
});

const avalancheTestnet = Chain.add({
	id: 43113,
	tok: "AVAX",
	symbol: "avax-testnet",
	name: "Avalanche Testnet",
	defaultUrl: "https://api.avax-test.network/ext/bc/C/rpc",
	scanUrl: "https://testnet.snowtrace.io/api",
});

export {avalanche, avalancheTestnet};
