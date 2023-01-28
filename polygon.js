import {Chain} from "./chain.js";

const polygon = Chain.add({
	id: 0x89,
	tok: "MATIC",
	symbol: "polygon",
	name: "Polygon",
	defaultUrl: "https://rpc.ankr.com/polygon",
	scanUrl: "https://api.polygonscan.com/api",
});

const polygonTestnet = Chain.add({
	id: 0x13881,
	tok: "MATIC",
	symbol: "polygon-testnet",
	name: "Polygon Testnet",
	defaultUrl: "https://rpc-mumbai.maticvigil.com/",
	scanUrl: "https://mumbai.polygonscan.com/api",
});

export {polygon, polygonTestnet};
