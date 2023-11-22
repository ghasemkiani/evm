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
		"MATIC_": "0x0000000000000000000000000000000000001010",
		"stMATIC": "0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4",
		"USDC": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
		"BTC": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
		"WBTC": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
		"ETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		"WETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		"whETH": "0x11CD37bb86F65419713f30673A480EA33c826872",
		"CRV": "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
		"LDO": "0xC3C7d422809852031b44ab29EEC9F1EfF2A58756",
		"ATOM": "0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b",
		"SIM": "0x27E1b0Fc181F4dF76c2B8DF383E9f5aFC28D9553",
		"GNS": "0xE5417Af564e4bFDA1c483642db72007871397896",
		"RNDR": "0x61299774020dA444Af134c82fa83E3810b309991",
		"DUSD": "0xEC38621e72D86775a89C7422746de1f52bbA5320",
		"W$C": "0x77A6f2e9A9E44fd5D5C3F9bE9E52831fC1C3C0A0",
		"miMATIC": "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1",
		"1INCH": "0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f",
		"TRADE": "0x692AC1e363ae34b6B489148152b12e2785a3d8d6",
		"mXEN": "0x2AB0e9e4eE70FFf1fB9D67031E44F6410170d00e",
		"RNDR": "0x61299774020dA444Af134c82fa83E3810b309991",
		"SNX": "0x50B728D8D964fd00C2d0AAD81718b71311feF68a",
		"CPLE": "0x87fcfBD3Eae94524D5Ef0c42D01f3DFC96142451",
		"AGIX": "0x190Eb8a183D22a4bdf278c6791b152228857c033",
		"BNB": "0xeCDCB5B88F8e3C15f95c720C51c71c9E2080525d",
		"WBNB": "0xeCDCB5B88F8e3C15f95c720C51c71c9E2080525d",
		"BNB_M": "0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F",
		"BUSD": "0x9fB83c0635De2E815fd1c21b3a292277540C2e8d",
		"DAI": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
		"AAVE": "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
		"INST": "0xf50D05A1402d0adAfA880D36050736f9f6ee7dee",
		"USDT": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
		"LINK": "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
		"JPYC": "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB",
		"whSOL": "0xd93f7E271cB87c23AaA73edC008A79646d1F9912",
		"LUNA": "0x24834BBEc7E39ef42f4a75EAF8E5B6486d3F0e57",
		"whLUNA": "0x9cd6746665D9557e1B9a775819625711d0693439",
		"AVAX": "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b",
		"SOL": "0x7DfF46370e9eA5f0Bad3C4E29711aD50062EA7A4",
		"MANA": "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4",
		"SAND": "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683",
		"UNI": "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
		"PROPEL": "0xe0Ce60AF0850bF54072635e66E79Df17082A1109",
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
		"SUIBG": "0xF53343233359E700e83Ba797f3b9D0d7dfd27138",
	},
	contractProxies: {
		"0xc2132D05D31c914a87C6611C10748AEb04B58e8F": "0x7FFB3d637014488b63fb9858E279385685AFc1e2",
		"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": "0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226",
		"0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6": "0x7FFB3d637014488b63fb9858E279385685AFc1e2",
		"0xeCDCB5B88F8e3C15f95c720C51c71c9E2080525d": "0xACa654Bdf148d1a5d490f5d1a44B84b4773B934c",
		"0x172370d5Cd63279eFa6d502DAB29171933a610AF": "0x98125B30e2C3081A7f4625801ca249eCDFc59EA2",
		"0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": "0x490e379C9cFF64944bE82b849F8FD5972C7999A7",
		"0xD6DF932A45C0f255f85145f286eA0b292B21C90B": "0xad3B0017de2065CBeFF6655Fa7A83b42B9e4a3ce",
		"0xC3C7d422809852031b44ab29EEC9F1EfF2A58756": "0x5801cC76c81d66FF6B329d7f9A22EC7E611854c0",
		"0x61299774020dA444Af134c82fa83E3810b309991": "0x8a24F711C45642922C7fE7d93b67cBa870C97506",
		"0x50B728D8D964fd00C2d0AAD81718b71311feF68a": "0xFFcbc57f4c7051c19d4F9713c726f572cB5A0aB2",
		"0x190Eb8a183D22a4bdf278c6791b152228857c033": "0xA00673B4C06535Fd6a16Bd428e871F9b91fCfCb6",
		"0xd93f7E271cB87c23AaA73edC008A79646d1F9912": "0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE",
		"0x692AC1e363ae34b6B489148152b12e2785a3d8d6": "0x9241b66cFF59C7B424397B5630b3efC67481771E",
		"0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f": "0x7e720FD8f2cEf67D4d8A9931F2796dbaee1Bc46f",
		// "0x11CD37bb86F65419713f30673A480EA33c826872": "0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE",
		"0x11CD37bb86F65419713f30673A480EA33c826872": "0xE5417Af564e4bFDA1c483642db72007871397896", // ! arbitrary
		"0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4": "0x7FFB3d637014488b63fb9858E279385685AFc1e2",
		"0x61299774020dA444Af134c82fa83E3810b309991": "0x8a24F711C45642922C7fE7d93b67cBa870C97506",
		"0xEC38621e72D86775a89C7422746de1f52bbA5320": "0x0Fb82DB5676330644ACD26a21FD00c749715066d",
		"0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b": "0x7DE47cD556793863b789259Bd378C66f7DCFAfea",
		"0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB": "0xf2fAb05F26Dc8da5A3F24D015FB043DB7a8751Cf",
		"0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4": "0xaD5519b7Da3bf018eBdC97D6bad8E5Caf6D3AfF2",
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
