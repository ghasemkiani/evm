import {Chain} from "./chain.js";

const celo = Chain.add({
	id: 42220,
	tok: "CELO",
	symbol: "celo",
	name: "Celo",
	defaultUrl: "https://rpc.ankr.com/celo",
	scanUrl: "https://api.celoscan.com/api",
	contracts: {
		"CELO": "0x471EcE3750Da237f93B8E339c536989b8978a438",
		"cUSD": "0x765DE816845861e75A25fCA122bb6898B8B1282a",
		"WETH": "0x122013fd7dF1C6F636a5bb8f03108E876548b455",
		"ETH": "0x122013fd7dF1C6F636a5bb8f03108E876548b455",
	},
	contractProxies: {
		"0x765DE816845861e75A25fCA122bb6898B8B1282a": "0x18E6BFDc909063F7445E410a5495264619495bCB",
		"0x471EcE3750Da237f93B8E339c536989b8978a438": "0x4DdeB8F7041aB3260c6ec5Afb6FEab0650F4ABB4",
	},
});

export {celo};
