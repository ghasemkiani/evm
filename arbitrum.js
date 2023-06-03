import {Chain} from "./chain.js";

const arbitrum = Chain.add({
	id: 42161,
	tok: "ETH",
	symbol: "arbitrum",
	name: "Arbitrum",
	defaultUrl: "https://rpc.ankr.com/arbitrum",
	scanUrl: "https://api.arbiscan.io/api",
	contracts: {
		"WETH": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
		"BTC": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
		"WBTC": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
		"MATIC": "0x561877b6b3DD7651313794e5F2894B2F18bE0766",
		"LINK": "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
		"BNB": "0x20865e63B111B2649ef829EC220536c82C58ad7B",
		"ARB": "0x912CE59144191C1204E64559FE8253a0e49E6548",
		"GETH": "0xdD69DB25F6D620A7baD3023c5d32761D353D3De9",
		"GNS": "0x18c11FD286C5EC11c3b683Caa813B77f5163A122",
		"USDC": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
		"USDT": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
		"PENDLE": "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8",
		"AGI": "0xFF191514A9baba76BfD19e3943a4d37E8ec9a111",
		"GMX": "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
		"STG": "0x6694340fc020c5E6B96567843da2df01b2CE1eb6",
		"RDNT": "0x3082CC23568eA640225c2467653dB90e9250AaA0",
		"AIDOGE": "0x09E18590E8f76b6Cf471b3cd75fE1A1a9D2B2c2b",
	},
	contractProxies: {
		"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1": "0x8b194bEae1d3e0788A1a35173978001ACDFba668",
		"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": "0x3f770Ac673856F105b586bb393d122721265aD46",
		"0x561877b6b3DD7651313794e5F2894B2F18bE0766": "0x3f770Ac673856F105b586bb393d122721265aD46",
		"0xf97f4df75117a78c1A5a0DBb814Af92458539FB4": "0x3f770Ac673856F105b586bb393d122721265aD46",
		"0x20865e63B111B2649ef829EC220536c82C58ad7B": "0x3f770Ac673856F105b586bb393d122721265aD46",
		"0x912CE59144191C1204E64559FE8253a0e49E6548": "0xC4ed0A9Ea70d5bCC69f748547650d32cC219D882",
		"0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": "0x1eFB3f88Bc88f03FD1804A5C53b7141bbEf5dED8",
		"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": "0xf31e1AE27e7cd057C1D6795a5a083E0453D39B50",
		"0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8": "0x3f770Ac673856F105b586bb393d122721265aD46",
		"0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443": "0xD781F2cdaf16eB422e99C4E455F071F0BB20cf1a", // UniswapV3Pool
	},
});

export {arbitrum};
