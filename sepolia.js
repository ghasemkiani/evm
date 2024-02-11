import {Chain} from "./chain.js";

const sepolia = Chain.add({
	id: 11155111,
	tok: "ETH",
	symbol: "sepolia",
	name: "Sepolia",
	defaultUrl: "https://sepolia.drpc.org/",
	scanUrl: "https://sepolia.etherscan.io/api",
	contracts: {
		"WETH": "",
		"SAVM": "0x77726BFbE61B6ad7463466fD521A3A4B89B0EFd8",
	},
	contractProxies: {},
});

export {sepolia};
