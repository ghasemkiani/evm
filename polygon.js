import {Chain} from "./chain.js";

const polygon = Chain.add({
	id: 0x89,
	tok: "MATIC",
	symbol: "polygon",
	name: "Polygon",
	defaultUrl: "https://rpc.ankr.com/polygon",
	scanUrl: "https://api.polygonscan.com/api",
	contracts: {
		"WMATIC": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
		"USDC": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
		"WBTC": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
		"BTC": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
		"WETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		"ETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		"CRV": "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
		"WBNB": "0xeCDCB5B88F8e3C15f95c720C51c71c9E2080525d",
		"BNB": "0xeCDCB5B88F8e3C15f95c720C51c71c9E2080525d",
		"BNB_M": "0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F",
		"BUSD": "0x9fB83c0635De2E815fd1c21b3a292277540C2e8d",
		"DAI": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
		"INST": "0xf50D05A1402d0adAfA880D36050736f9f6ee7dee",
		"USDT": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
		"LINK": "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
		"LUNA": "0x24834BBEc7E39ef42f4a75EAF8E5B6486d3F0e57",
		"LUNA_W": "0x9cd6746665D9557e1B9a775819625711d0693439",
		"AVAX": "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b",
		"SOL": "0x7DfF46370e9eA5f0Bad3C4E29711aD50062EA7A4",
		"MANA": "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4",
		"UNI": "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
		"BLOK": "0x229b1b6C23ff8953D663C4cBB519717e323a0a84",
		"MONG": "0x99EfA49134Cfb953a93Ff621db9A478a08Cb0F51",
		"HEX": "0x23D29D30e35C5e8D321e1dc9A8a61BFD846D4C5C",
		"IMX": "0x60bB3D364B765C497C8cE50AE0Ae3f0882c5bD05",
		"SEED": "0x371b97c779E8C5197426215225dE0eEac7dD13AF",
		"IGG": "0xe6FC6C7CB6d2c31b359A49A33eF08aB87F4dE7CE",
		"LUSD": "0x23001f892c0C82b79303EDC9B9033cD190BB21c7",
		"DG": "0xef938b6da8576a896f6E0321ef80996F4890f9c4",
		"xDG": "0xc6480Da81151B2277761024599E8Db2Ad4C388C8",
		"wBAN": "0xe20B9e246db5a0d21BF9209E4858Bc9A3ff7A034",
		"GTF": "0x8cB96E95C714E0996e6D299F617F518D965E352E",
		"BzB": "0x462D8d82C2B2D2DDabf7f8a93928De09d47A5807",
		"VALX": "0x9d47b3FAA5fF227D2BD404F572eF0ab0C8409161",
		"ETH2x-FLI-P": "0x3Ad707dA309f3845cd602059901E39C4dcd66473",
		"222": "0xDE6908D8573a81A3b5B52D893C2a7c7F522ca8F2",
		"GHST": "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7",
	},
	contractProxies: {
		"0xc2132D05D31c914a87C6611C10748AEb04B58e8F": "0x7FFB3d637014488b63fb9858E279385685AFc1e2",
		"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": "0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226",
		"0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6": "0x7FFB3d637014488b63fb9858E279385685AFc1e2",
	},
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
